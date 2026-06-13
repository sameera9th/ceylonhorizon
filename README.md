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

The Studio development server uses the `/admin` base path and is normally available at `http://localhost:3333/admin`.

## Build the website

```bash
cd code/web
npm run build
```

The production output is written to `code/web/dist/`.

## Build the combined site

Install dependencies in both apps, then build the public website and the self-hosted Studio into one output directory:

```bash
cd code/web
npm ci

cd ../sanity
npm ci

cd ../web
npm run build:combined
```

The combined output contains the public site at `code/web/dist/index.html` and Sanity Studio at `code/web/dist/admin/index.html`. Studio assets remain under the `/admin` URL prefix.

Test that output locally with:

```bash
cd code/web
npm run preview
```

Open `http://localhost:4173` for the public website and `http://localhost:4173/admin` for Studio. The preview configuration also sends extensionless nested Studio routes to `/admin/index.html`.

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

Add these origins in the Sanity project settings:

- `http://localhost:3333` with credentials (Studio development server)
- `http://localhost:4173` with credentials (combined production-build preview)
- `https://ceylonhorizon.com` with credentials (public site and self-hosted Studio)
- `http://localhost:5173` without credentials (public website development server)
- `https://www.ceylonhorizon.com` without credentials (public website alias)

The production Studio registration for `https://ceylonhorizon.com/admin` uses application ID `b3j3st9x7dys307d2d3huvdy`, configured as `deployment.appId` in `code/sanity/sanity.cli.js`. For local combined-build testing, use Sanity's **Add development host** option for `http://localhost:4173` if prompted.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. GitHub Actions builds `code/web`, builds Sanity Studio for `/admin`, copies the Studio output into `code/web/dist/admin`, authenticates to AWS through the existing OIDC role, syncs the combined `code/web/dist/` to the existing `ceylonhorizon-site-prod` S3 bucket, and invalidates CloudFront distribution `E3EDTRT1OVZO8A`.

The public website is served at `https://ceylonhorizon.com`, and the self-hosted Studio is served at `https://ceylonhorizon.com/admin`. Sanity continues to host the content dataset and APIs. No write token or other Sanity secret is included in either frontend build.

## CloudFront routing for `/admin`

The existing distribution-wide `403`/`404` fallback to `/index.html` returns the public SPA for missing Studio routes. Associate a CloudFront Function with the existing behavior's **Viewer request** event so `/admin` and extensionless `/admin/*` routes resolve to the Studio entry point while asset requests remain unchanged:

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var isAdminRoute = uri === '/admin' || uri === '/admin/';
  var isNestedAdminRoute = uri.indexOf('/admin/') === 0;
  var lastSegment = uri.split('/').pop();

  if (isAdminRoute || (isNestedAdminRoute && lastSegment.indexOf('.') === -1)) {
    request.uri = '/admin/index.html';
  }

  return request;
}
```

Publish and associate the function manually, then invalidate `/*`. No new S3 bucket, CloudFront distribution, certificate, IAM role, or DNS record is required. A separate `/admin/*` behavior is optional; the viewer-request function is the smallest change for the current single-origin setup.

## Launch placeholders

Before launch, replace the placeholder phone number and WhatsApp URL, add the final property location/map, upload real villa photography and captions in Sanity, and review the fallback copy and contact details.
