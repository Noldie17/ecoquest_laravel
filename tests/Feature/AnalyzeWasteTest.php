<?php

namespace Tests\Feature;

use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AnalyzeWasteTest extends TestCase
{
    public function test_scanner_pages_are_served_through_inertia(): void
    {
        foreach (['/', '/scanner', '/history', '/about'] as $path) {
            $this->get($path)->assertOk()->assertInertia();
        }
    }

    public function test_analysis_rejects_unsupported_image_mime_types(): void
    {
        $this->postJson('/api/analyze', [
            'imageBase64' => base64_encode('image bytes'),
            'mimeType' => 'image/svg+xml',
        ])->assertUnprocessable()
            ->assertJsonStructure(['error']);
    }

    public function test_analysis_reports_missing_roboflow_configuration(): void
    {
        config([
            'services.roboflow.api_key' => null,
            'services.roboflow.api_url' => null,
        ]);

        $this->postJson('/api/analyze', [
            'imageBase64' => base64_encode('image bytes'),
            'mimeType' => 'image/jpeg',
        ])->assertStatus(503)
            ->assertJsonPath('error', 'Roboflow is not configured. Set ROBOFLOW_API_KEY, ROBOFLOW_API_URL in the project .env file.');
    }

    public function test_analysis_rejects_non_roboflow_endpoints(): void
    {
        config([
            'services.roboflow.api_key' => 'test-key',
            'services.roboflow.api_url' => 'https://example.com/infer',
        ]);

        $this->postJson('/api/analyze', [
            'imageBase64' => base64_encode('image bytes'),
            'mimeType' => 'image/jpeg',
        ])->assertStatus(503)
            ->assertJsonPath('error', 'ROBOFLOW_API_URL must be a valid HTTPS Roboflow endpoint.');
    }

    public function test_analysis_posts_to_the_configured_roboflow_endpoint(): void
    {
        $endpoint = 'https://serverless.roboflow.com/test-workspace/workflows/test-workflow';
        config([
            'services.roboflow.api_key' => 'test-key',
            'services.roboflow.api_url' => $endpoint,
            'services.cloudinary.cloud_name' => 'ecoquest-test',
            'services.cloudinary.api_key' => 'cloudinary-test-key',
            'services.cloudinary.api_secret' => 'cloudinary-test-secret',
        ]);
        Http::fake(function (ClientRequest $request) use ($endpoint) {
            if ($request->url() === 'https://api.cloudinary.com/v1_1/ecoquest-test/image/upload') {
                return Http::response([
                    'public_id' => 'ecoquest_test-image',
                    'secure_url' => 'https://res.cloudinary.com/ecoquest-test/image/upload/test-image.jpg',
                ], 200);
            }

            if ($request->url() === 'https://api.cloudinary.com/v1_1/ecoquest-test/image/destroy') {
                return Http::response(['result' => 'ok'], 200);
            }

            if ($request->url() === $endpoint) {
                return Http::response([
                    'outputs' => [
                        [
                            'scan_status' => 'waste',
                            'artifact_name' => 'Crushed Aluminum Can',
                            'waste_type' => 'Metal',
                            'material' => 'aluminum',
                            'analysis' => 'Identified Crushed Aluminum Can. Visual material: aluminum.',
                            'rarity_tier' => 'RARE',
                            'rarity_stars' => 3,
                            'xp_points' => 50,
                            'recipe_title' => 'Collection quest',
                            'recipe_steps' => [
                                'Rinse the can if needed.',
                                'Place it in a local metal recycling collection.',
                            ],
                            'transformed_into' => '',
                            'eco_knowledge' => 'Aluminum beverage cans are highly recyclable.',
                            'safety_warning' => 'Watch for sharp edges.',
                            'local_rules_note' => 'Check your local collection rules.',
                            'output_image' => 'data:image/png;base64,ignored-image-data',
                        ],
                    ],
                ], 200);
            }

            return Http::response([], 404);
        });

        $this->postJson('/api/analyze', [
            'imageBase64' => base64_encode('image bytes'),
            'mimeType' => 'image/jpeg',
        ])->assertOk()
            ->assertJsonPath('itemName', 'Crushed Aluminum Can')
            ->assertJsonPath('material', 'aluminum')
            ->assertJsonPath('wasteType', 'Metal')
            ->assertJsonPath('rarity', 'Rare')
            ->assertJsonPath('rarityStars', 3)
            ->assertJsonPath('description', 'Identified Crushed Aluminum Can. Visual material: aluminum.')
            ->assertJsonPath('upcycleRecipe', "Collection quest\nRinse the can if needed.\nPlace it in a local metal recycling collection.")
            ->assertJsonPath('xp', 50)
            ->assertJsonPath('ecoFact', 'Aluminum beverage cans are highly recyclable.')
            ->assertJsonPath('safetyWarning', 'Watch for sharp edges.')
            ->assertJsonPath('localRulesNote', 'Check your local collection rules.')
            ->assertJsonMissingPath('output_image');

        Http::assertSent(fn (ClientRequest $request): bool => $request->url() === $endpoint
            && $request->hasHeader('Authorization', 'Bearer test-key')
            && ! isset($request['api_key'])
            && $request['inputs']['image']['type'] === 'url'
            && $request['inputs']['image']['value'] === 'https://res.cloudinary.com/ecoquest-test/image/upload/test-image.jpg'
            && count($request['inputs']) === 1);
        Http::assertSent(fn (ClientRequest $request): bool => $request->url() === 'https://api.cloudinary.com/v1_1/ecoquest-test/image/destroy');
    }

    public function test_analysis_rejects_unstructured_workflow_output_instead_of_inventing_card_values(): void
    {
        $endpoint = 'https://serverless.roboflow.com/test-workspace/workflows/test-workflow';
        config([
            'services.roboflow.api_key' => 'test-key',
            'services.roboflow.api_url' => $endpoint,
            'services.cloudinary.cloud_name' => 'ecoquest-test',
            'services.cloudinary.api_key' => 'cloudinary-test-key',
            'services.cloudinary.api_secret' => 'cloudinary-test-secret',
        ]);
        Http::fake(function (ClientRequest $request) use ($endpoint) {
            if (str_ends_with($request->url(), '/image/upload')) {
                return Http::response([
                    'public_id' => 'ecoquest_test-image',
                    'secure_url' => 'https://res.cloudinary.com/ecoquest-test/image/upload/test-image.jpg',
                ], 200);
            }

            if (str_ends_with($request->url(), '/image/destroy')) {
                return Http::response(['result' => 'ok'], 200);
            }

            return $request->url() === $endpoint
                ? Http::response(['output' => 'A bottle made from plastic.'], 200)
                : Http::response([], 404);
        });

        $this->postJson('/api/analyze', [
            'imageBase64' => base64_encode('image bytes'),
            'mimeType' => 'image/jpeg',
        ])->assertStatus(502)
            ->assertJsonPath('error', 'Roboflow did not return all required fields. Missing: itemName, material, wasteType, rarity, rarityStars, description, xp, ecoFact, recipe_title/recipe_steps. Update the workflow to return the requested JSON fields.');
    }

    public function test_analysis_reports_missing_cloudinary_configuration(): void
    {
        config([
            'services.roboflow.api_key' => 'test-key',
            'services.roboflow.api_url' => 'https://serverless.roboflow.com/test-workspace/workflows/test-workflow',
            'services.cloudinary.cloud_name' => null,
            'services.cloudinary.api_key' => null,
            'services.cloudinary.api_secret' => null,
        ]);

        $this->postJson('/api/analyze', [
            'imageBase64' => base64_encode('image bytes'),
            'mimeType' => 'image/jpeg',
        ])->assertStatus(503)
            ->assertJsonPath(
                'error',
                'Image storage is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in the project .env file.',
            );
    }
}
