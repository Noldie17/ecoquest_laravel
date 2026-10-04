# EcoQuest

EcoQuest is a Laravel + React/Inertia application for scanning discarded materials, earning XP, and finding upcycling ideas. The existing React interface and Tailwind styling are retained; Laravel serves the pages and handles Roboflow requests.

## Requirements

- PHP 8.3 or newer with SQLite, cURL, Fileinfo, and Mbstring extensions
- Composer 2
- Node.js 20.19+ or 22.12+, and npm

## First-time setup

From the project directory, run:

```powershell
composer install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
php artisan key:generate
if (!(Test-Path database/database.sqlite)) { New-Item -ItemType File -Path database/database.sqlite | Out-Null }
php artisan migrate
npm install
```

If `.env` already exists, keep it and do not overwrite it from `.env.example`.

## Start the application

Run these in two terminals from the project directory:

```powershell
php artisan serve
```

```powershell
npm run dev
```

Open the URL printed by `php artisan serve` (normally http://127.0.0.1:8000). The Vite server supplies the React/Tailwind assets while developing.

For a production asset build, run `npm run build`. The application can then be served by Laravel using your normal PHP web server.

## Roboflow configuration

Put the Roboflow settings in the project-root `.env` file:

```dotenv
ROBOFLOW_API_KEY=your_private_api_key
ROBOFLOW_API_URL=https://your-roboflow-workflow-endpoint
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_private_cloudinary_api_secret
```

Copy the full HTTPS endpoint URL from your Roboflow workflow's API/deploy page. It already includes your workspace and workflow ID, so separate workspace/ID settings are unnecessary. Requests authenticate with a Bearer token; the API key stays on Laravel's server and must never be added to React code or committed.

The workflow accepts a public image URL. EcoQuest temporarily uploads each scan to Cloudinary, passes its secure image URL to Roboflow, then asks Cloudinary to delete the image after analysis. A cleanup failure is logged; uploaded Cloudinary images may remain until manually removed if deletion fails.

The card maps the workflow's `outputs[0]` JSON fields directly: `artifact_name`, `waste_type`, `material`, `analysis`, `rarity_tier`, `rarity_stars`, `xp_points`, `recipe_title`, `recipe_steps`, and `eco_knowledge`. `safety_warning` and `local_rules_note` are also displayed when provided. `output_image` is intentionally ignored by the card. The card does not derive scan results, rarity, XP, recipes, or eco facts locally; if a required field is missing, EcoQuest reports it instead of substituting hardcoded content.

Create a free Cloudinary account and copy the cloud name, API key, and API secret from its dashboard into the same root `.env` file. Never expose the API secret in React code or commit it. Optional label OCR uses `IMAGGA_API_KEY` and `IMAGGA_API_SECRET` there too.

## Existing features

- Home, scanner, history, and about pages
- Image upload and camera capture
- Roboflow workflow analysis and optional Imagga OCR
- Rarity, XP, ranks, upcycling recipes, and eco facts
- Local browser storage for XP and scan history

Scan history and XP remain in the browser's `localStorage`, so they are local to each browser/device. No account or database-backed user profile is required.
