<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AnalyzeWasteController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'imageBase64' => ['required', 'string', 'max:7000000'],
            'mimeType' => ['required', 'in:image/jpeg,image/png,image/webp,image/gif'],
            'useOCR' => ['sometimes', 'boolean'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        $imageBase64 = $request->string('imageBase64')->toString();
        $imageBytes = base64_decode($imageBase64, true);

        if ($imageBytes === false || $imageBytes === '') {
            return response()->json(['error' => 'The uploaded image is not valid base64 data.'], 422);
        }

        if (strlen($imageBytes) > 5 * 1024 * 1024) {
            return response()->json(['error' => 'Images must be 5 MB or smaller.'], 413);
        }

        $apiKey = config('services.roboflow.api_key');
        $url = config('services.roboflow.api_url');
        $missing = collect([
            'ROBOFLOW_API_KEY' => $apiKey,
            'ROBOFLOW_API_URL' => $url,
        ])->filter(fn ($value) => blank($value))->keys()->all();

        if ($missing !== []) {
            return response()->json([
                'error' => 'Roboflow is not configured. Set '.implode(', ', $missing).' in the project .env file.',
            ], 503);
        }

        if (! filter_var($url, FILTER_VALIDATE_URL)
            || parse_url($url, PHP_URL_SCHEME) !== 'https'
            || ! is_string(parse_url($url, PHP_URL_HOST))
            || ! preg_match('/(^|\.)roboflow\.com$/i', parse_url($url, PHP_URL_HOST))) {
            return response()->json([
                'error' => 'ROBOFLOW_API_URL must be a valid HTTPS Roboflow endpoint.',
            ], 503);
        }

        $cloudName = config('services.cloudinary.cloud_name');
        $cloudinaryApiKey = config('services.cloudinary.api_key');
        $cloudinaryApiSecret = config('services.cloudinary.api_secret');
        $missingCloudinary = collect([
            'CLOUDINARY_CLOUD_NAME' => $cloudName,
            'CLOUDINARY_API_KEY' => $cloudinaryApiKey,
            'CLOUDINARY_API_SECRET' => $cloudinaryApiSecret,
        ])->filter(fn ($value) => blank($value))->keys()->all();

        if ($missingCloudinary !== []) {
            return response()->json([
                'error' => 'Image storage is not configured. Set '.implode(', ', $missingCloudinary).' in the project .env file.',
            ], 503);
        }

        if (! preg_match('/^[a-z0-9-]+$/i', $cloudName)) {
            return response()->json(['error' => 'CLOUDINARY_CLOUD_NAME is invalid.'], 503);
        }

        $ocrText = null;
        if ($request->boolean('useOCR')) {
            $ocrText = $this->extractText($imageBytes, $request->string('mimeType')->toString());
        }

        $imageUpload = $this->uploadImageToCloudinary(
            $imageBytes,
            $request->string('mimeType')->toString(),
            $cloudName,
            $cloudinaryApiKey,
            $cloudinaryApiSecret,
        );

        if ($imageUpload === null) {
            return response()->json(['error' => 'Could not temporarily upload the image for Roboflow. Please try again.'], 502);
        }

        try {
            try {
                $response = Http::withToken($apiKey)->timeout(90)->post($url, [
                    'inputs' => [
                        'image' => [
                            'type' => 'url',
                            'value' => $imageUpload['url'],
                        ],
                    ],
                ]);
            } catch (ConnectionException $exception) {
                Log::error('Roboflow workflow connection failed.', ['message' => $exception->getMessage()]);

                return response()->json(['error' => 'Could not connect to Roboflow. Please try again.'], 502);
            }

            if (! $response->successful()) {
                Log::error('Roboflow workflow request failed.', ['status' => $response->status()]);

                return response()->json([
                    'error' => 'Roboflow workflow request failed ('.$response->status().'). Check the workflow settings and API key.',
                ], 502);
            }

            $analysis = $this->normalizeRoboflowResponse($response->json());
            if (isset($analysis['missing'])) {
                Log::error('Roboflow workflow response is missing required JSON fields.', [
                    'missing' => $analysis['missing'],
                ]);

                return response()->json([
                    'error' => 'Roboflow did not return all required fields. Missing: '.implode(', ', $analysis['missing']).'. Update the workflow to return the requested JSON fields.',
                ], 502);
            }

            return response()->json([
                'itemName' => $analysis['itemName'],
                'material' => $analysis['material'],
                'wasteType' => $analysis['wasteType'],
                'rarity' => $analysis['rarity'],
                'rarityStars' => $analysis['rarityStars'],
                'description' => $analysis['description'],
                'upcycleRecipe' => $analysis['upcycleRecipe'],
                'xp' => $analysis['xp'],
                'ecoFact' => $analysis['ecoFact'],
                'safetyWarning' => $analysis['safetyWarning'],
                'localRulesNote' => $analysis['localRulesNote'],
                'extractedText' => $ocrText,
                'ocrData' => $ocrText !== null ? ['text' => $ocrText] : null,
            ]);
        } finally {
            $this->deleteCloudinaryImage($imageUpload['public_id'], $cloudName, $cloudinaryApiKey, $cloudinaryApiSecret);
        }
    }

    private function extractText(string $imageBytes, string $mimeType): ?string
    {
        $apiKey = config('services.imagga.key');
        $apiSecret = config('services.imagga.secret');

        if (blank($apiKey) || blank($apiSecret)) {
            return null;
        }

        try {
            $response = Http::withBasicAuth($apiKey, $apiSecret)
                ->attach('image', $imageBytes, 'upload.'.match ($mimeType) {
                    'image/png' => 'png',
                    'image/webp' => 'webp',
                    'image/gif' => 'gif',
                    default => 'jpg',
                }, ['Content-Type' => $mimeType])
                ->timeout(30)
                ->post('https://api.imagga.com/v2/text');
        } catch (ConnectionException $exception) {
            Log::warning('Optional OCR connection failed.', ['message' => $exception->getMessage()]);

            return null;
        }

        if (! $response->successful()) {
            Log::warning('Optional OCR request failed.', ['status' => $response->status()]);

            return null;
        }

        $text = $response->json('result.text');

        if (is_string($text)) {
            return $text;
        }

        if (is_array($text)) {
            $result = $text['english'] ?? $text['raw'] ?? null;

            return is_string($result) ? $result : null;
        }

        return null;
    }

    private function uploadImageToCloudinary(
        string $imageBytes,
        string $mimeType,
        string $cloudName,
        string $apiKey,
        string $apiSecret,
    ): ?array {
        $timestamp = time();
        $publicId = 'ecoquest_'.str_replace('-', '', (string) str()->uuid());
        $parameters = [
            'public_id' => $publicId,
            'timestamp' => $timestamp,
        ];

        try {
            $response = Http::attach('file', $imageBytes, 'upload.'.match ($mimeType) {
                'image/png' => 'png',
                'image/webp' => 'webp',
                'image/gif' => 'gif',
                default => 'jpg',
            }, ['Content-Type' => $mimeType])
                ->timeout(30)
                ->post("https://api.cloudinary.com/v1_1/{$cloudName}/image/upload", [
                    ...$parameters,
                    'api_key' => $apiKey,
                    'signature' => $this->cloudinarySignature($parameters, $apiSecret),
                ]);
        } catch (ConnectionException $exception) {
            Log::error('Cloudinary image upload connection failed.', ['message' => $exception->getMessage()]);

            return null;
        }

        $imageUrl = $response->json('secure_url');
        $uploadedPublicId = $response->json('public_id');

        if (! $response->successful() || ! is_string($imageUrl) || ! is_string($uploadedPublicId)) {
            Log::error('Cloudinary image upload failed.', ['status' => $response->status()]);

            return null;
        }

        return [
            'url' => $imageUrl,
            'public_id' => $uploadedPublicId,
        ];
    }

    private function deleteCloudinaryImage(string $publicId, string $cloudName, string $apiKey, string $apiSecret): void
    {
        $parameters = [
            'public_id' => $publicId,
            'timestamp' => time(),
        ];

        try {
            $response = Http::timeout(15)->post("https://api.cloudinary.com/v1_1/{$cloudName}/image/destroy", [
                ...$parameters,
                'api_key' => $apiKey,
                'signature' => $this->cloudinarySignature($parameters, $apiSecret),
            ]);
        } catch (ConnectionException $exception) {
            Log::warning('Temporary Cloudinary image cleanup connection failed.', ['message' => $exception->getMessage()]);

            return;
        }

        if (! $response->successful() || $response->json('result') !== 'ok') {
            Log::warning('Temporary Cloudinary image cleanup failed.', ['status' => $response->status()]);
        }
    }

    private function cloudinarySignature(array $parameters, string $apiSecret): string
    {
        ksort($parameters);
        $signatureBase = collect($parameters)
            ->map(fn ($value, $key) => "{$key}={$value}")
            ->implode('&');

        return sha1($signatureBase.$apiSecret);
    }

    private function normalizeRoboflowResponse(mixed $response): array
    {
        $fields = [
            'itemName' => ['artifactname', 'itemname', 'detecteditem', 'objectname'],
            'material' => ['material'],
            'wasteType' => ['wastetype'],
            'rarity' => ['raritytier'],
            'rarityStars' => ['raritystars'],
            'description' => ['analysis'],
            'xp' => ['xppoints'],
            'ecoFact' => ['ecoknowledge'],
        ];
        $normalized = [];
        $missing = [];

        foreach ($fields as $field => $aliases) {
            $value = $this->findJsonField($response, $aliases);
            if ($value === null || (is_string($value) && trim($value) === '')) {
                $missing[] = $field;

                continue;
            }

            if ($field === 'xp') {
                if (! is_numeric($value) || (float) $value < 0) {
                    $missing[] = $field;

                    continue;
                }
                $normalized[$field] = (float) $value == (int) $value ? (int) $value : (float) $value;

                continue;
            }

            if ($field === 'rarityStars') {
                if (! is_numeric($value) || (int) $value != $value || (int) $value < 0 || (int) $value > 5) {
                    $missing[] = 'rarity_stars (must be an integer from 0 to 5)';

                    continue;
                }
                $normalized[$field] = (int) $value;

                continue;
            }

            if (! is_string($value) && ! is_numeric($value)) {
                $missing[] = $field;

                continue;
            }

            $normalized[$field] = trim((string) $value);
        }

        $recipeTitle = $this->findJsonField($response, ['recipetitle']);
        $recipeSteps = $this->findJsonField($response, ['recipesteps']);
        $recipeSteps = is_array($recipeSteps)
            ? array_values(array_filter($recipeSteps, fn ($step) => is_string($step) && trim($step) !== ''))
            : [];

        if (! is_string($recipeTitle) || trim($recipeTitle) === '' || $recipeSteps === []) {
            $missing[] = 'recipe_title/recipe_steps';
        } else {
            $normalized['upcycleRecipe'] = trim($recipeTitle)."\n".implode("\n", $recipeSteps);
        }

        $normalized['safetyWarning'] = $this->findJsonField($response, ['safetywarning']);
        $normalized['localRulesNote'] = $this->findJsonField($response, ['localrulesnote']);

        foreach (['safetyWarning', 'localRulesNote'] as $optionalField) {
            $value = $normalized[$optionalField];
            $normalized[$optionalField] = is_string($value) && trim($value) !== '' ? trim($value) : null;
        }

        if (isset($normalized['rarity'])) {
            $rarity = mb_convert_case(trim($normalized['rarity']), MB_CASE_TITLE, 'UTF-8');
            if (! in_array($rarity, ['Common', 'Rare', 'Epic', 'Legendary'], true)) {
                $missing[] = 'rarity (must be Common, Rare, Epic, or Legendary)';
            } else {
                $normalized['rarity'] = $rarity;
            }
        }

        return $missing === [] ? $normalized : ['missing' => $missing];
    }

    private function findJsonField(mixed $value, array $aliases): mixed
    {
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return $this->findJsonField($decoded, $aliases);
            }

            return null;
        }

        if (! is_array($value)) {
            return null;
        }

        foreach ($value as $key => $child) {
            $normalizedKey = preg_replace('/[^a-z0-9]/', '', mb_strtolower((string) $key));
            if (in_array($normalizedKey, $aliases, true)) {
                return $child;
            }
        }

        foreach ($value as $child) {
            if (! is_array($child) || ! is_string($child['name'] ?? null)) {
                continue;
            }

            $outputName = preg_replace('/[^a-z0-9]/', '', mb_strtolower($child['name']));
            $outputValue = $child['value'] ?? null;
            if (in_array($outputName, $aliases, true)) {
                return $outputValue;
            }
        }

        foreach ($value as $child) {
            $found = $this->findJsonField($child, $aliases);
            if ($found !== null) {
                return $found;
            }
        }

        return null;
    }
}
