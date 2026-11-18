# INNOK website

Use Node 22. Run `npm install`, then `npm run dev`. For verification run `npm run lint`, `npm run typecheck`, `npm run build`, `npx playwright install chromium` and `npm test`.

## Catalogue publishing

Add only approved, orderable patterns to `lib/catalogue.ts`. Register each approved configuration and explicitly associate it with its supported patterns. Use INNOK colour codes and approved assets with neutral filenames in `public/materials`. Keep source documents and commercial records in private storage. Add customer documents to the Resources page only after approval. The homepage photography is an illustrative concept.

## Deployment

Set `SITE_URL` to the canonical HTTPS origin. Configure `RESEND_API_KEY` with a sending key and set `INQUIRY_FROM_EMAIL` to an address on the verified Resend domain. Both forms send to the inbox in `lib/brand.ts`. Configure an ingress rate limit for POST /api/inquiry before public launch. Submit a contact message and quote through the deployed site and confirm both reach the inbox.
