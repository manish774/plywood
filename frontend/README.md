# Ridgeline Plywood Co. — Frontend

React + Vite frontend for the plywood shop app: a public catalog site plus an `/admin`
panel for managing categories and items. Plain JavaScript, `react-router-dom` for
routing, `framer-motion` for animation, `axios` for API calls.

## Requirements

- Node 18+ (developed against Node 20)
- The backend API running (see `../backend/README.md`)

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL if needed
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Environment variables (`.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API, e.g. `http://localhost:5000/api`. |
| `VITE_USE_MOCK` | `true` to browse the site against local mock data (no backend needed); `false` to hit the real API. |

> **Local dev note:** on this machine the backend runs on port `5050` instead of the
> documented default `5000`, because macOS's AirPlay Receiver holds port 5000. If you
> hit connection errors, check what port the backend actually printed on startup and
> update `VITE_API_BASE_URL` to match.

## Scripts

- `npm run dev` — start the Vite dev server with hot reload
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally

## Project structure

```
src/
  api/            axios client + one module per resource (categories, items, contact, auth)
  mock/           placeholder data used only when VITE_USE_MOCK=true — delete once
                  the backend is the sole source of truth and this flag is retired
  context/        AuthContext (JWT held in memory + localStorage)
  components/
    public/       navbar, footer, cards, loading/error/empty states
    admin/        protected route wrapper, sidebar, category/item forms, confirm modal
  layouts/        PublicLayout (navbar/footer shell), AdminLayout (sidebar shell)
  pages/
    public/       Home, Categories, CategoryDetail, ItemDetail, Contact, NotFound
    admin/        Login, Dashboard, ManageCategories, ManageItems, Inquiries
  styles/         tokens.css (design tokens), base.css, public.css, admin.css
```

## How data flows

- Every resource module in `src/api/` checks `VITE_USE_MOCK`. When `true` it reads/writes
  an in-memory copy of `src/mock/mockData.js`; when `false` it calls the real API through
  the shared `axios` instance in `src/api/client.js`, which injects
  `Authorization: Bearer <token>` on every request when an admin is logged in.
- The backend returns `item.category` **populated** (a full category object) on reads,
  but expects a plain category id string on writes. The mock layer mirrors this shape so
  switching the flag doesn't change what components receive.
- All backend errors are `{ error: "<message>" }`; `src/utils/errors.js` extracts that
  message for both real and mock error paths so forms show a specific message instead of
  a generic failure.

## Admin panel

- `/admin/login` — signs in against `POST /admin/login`, stores the JWT in
  `localStorage` (key `plywood_admin_token`) and in `AuthContext`.
- `/admin` (and everything under it) is wrapped in `ProtectedRoute`, which redirects to
  `/admin/login` if there's no token.
- Categories and items support create/edit/delete from the dashboard; items you add show
  up immediately on the public site because both read from the same API.
- `/admin/inquiries` lists contact form submissions (`GET /contact`, admin-only).

## Design notes

The visual identity leans into the subject: cards and dividers use a repeating-stripe
pattern (`.ply-stripe` in `base.css`) that reads as a plywood cross-section, paired with
a condensed industrial display face (Big Shoulders Display) over IBM Plex Sans/Mono, on
a warm birch-cream palette with chalk-line blue and tape-measure amber accents. Motion
(`src/components/motionVariants.js`) uses spring physics throughout — staggered reveals,
hover lift, tap feedback — rather than plain fades.
