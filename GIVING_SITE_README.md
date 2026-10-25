# Dedicated Giving Site

The root route (`/`) now renders the online giving form directly, without the main website navigation or footer.

## Giving and payment flow
- `/` — default giving form.
- `/give-now/confirm/[id]` — existing transaction confirmation flow.
- `/give-now/receipt/[id]` — existing receipt page.
- `/give-now/mpesa-new` — existing giving form route retained for compatibility.

The form continues to use the existing payment data functions, validation, M-Pesa submission, and confirmation routing. Existing non-giving source routes have not been deleted, to avoid breaking shared components and integrations; they are simply not part of the root giving experience.

## Run locally
1. Install dependencies with `npm install`.
2. Configure the same environment variables and backend endpoint settings used by the original project.
3. Run `npm run dev` and open `http://localhost:3000`.
4. Run `npm run build` before deployment.
