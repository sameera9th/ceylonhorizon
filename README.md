# Ceylon Horizon

Ceylon Horizon is the launch website for a premium private villa and homestay brand in Sri Lanka. The repository contains the public React/Vite website and a separate Sanity Studio for content management.

## Structure

```text
code/
  web/       React and Vite public website
  sanity/    Sanity Studio CMS
.github/
  workflows/deploy.yml
```

## Run the website

```bash
cd code/web
npm install
cp .env.example .env
npm run dev
```

The website works without Sanity configuration by using content from `src/content/fallbackContent.js`.

## Run Sanity Studio

Create or select a Sanity project, then add its public project ID to `code/sanity/.env`.

```bash
cd code/sanity
npm install
cp .env.example .env
npm run dev
```

The Studio can be deployed separately with `npm run deploy`. It is not deployed to the website's AWS infrastructure.

## Build the website

```bash
cd code/web
npm run build
```

The production output is written to `code/web/dist/`.

## Environment variables

Public website (`code/web/.env`):

```text
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-06-13
```

Sanity Studio (`code/sanity/.env`):

```text
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
```

These values identify a public read-only Sanity dataset. Do not add a Sanity write token to the frontend. Real `.env` files must not be committed.

## Sanity CORS

Add these origins in the Sanity project settings without credentials:

- `http://localhost:5173`
- `https://ceylonhorizon.com`
- `https://www.ceylonhorizon.com`

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. GitHub Actions builds from `code/web`, authenticates to AWS through the existing OIDC role, syncs `code/web/dist/` to the existing private S3 bucket, and invalidates the existing CloudFront distribution.

The workflow does not create or modify AWS infrastructure and does not deploy Sanity Studio.

## Launch placeholders

Before launch, replace the placeholder phone number and WhatsApp URL, add the final property location/map, upload real villa photography and captions in Sanity, and review the fallback copy and contact details.
