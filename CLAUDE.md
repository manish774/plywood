# Plywood Shop — Project Brief

A full-stack app for a plywood shop:
- Public website where customers browse plywood categories/items and submit a contact/query form to the shop owner.
- Admin panel where the shop owner adds/edits/deletes categories and items (which then appear on the public site).
- All website content (categories/items) comes from the backend REST API — no hardcoded data in the frontend.

## Repo layout
- `backend/` — Node.js + Express + Mongoose REST API
- `frontend/` — React (Vite) app with `react-router-dom`, containing both the public site and an `/admin` section

## Tech decisions (already made, don't re-litigate)
- Backend: Node.js, Express, Mongoose (MongoDB Atlas)
- DB connection string lives in `backend/.env` as `MONGODB_URI` (already created — do not hardcode it in source, do not commit `.env`, it's git-ignored)
- Auth: single shop-owner admin (no multi-user system needed). Login via `POST /api/admin/login` checking against `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `backend/.env`, returns a JWT (`JWT_SECRET` in `.env`). Protect all write endpoints (POST/PUT/DELETE on categories/items, and GET on contact inquiries) with a Bearer JWT middleware.
- Frontend: React + Vite, JavaScript (not TypeScript), `framer-motion` for animation, `axios` (or fetch) for API calls, `react-router-dom` for routing.

## Baseline API contract (backend owns finalizing this, must message frontend teammate with the confirmed version once implemented)

Base URL: `http://localhost:5000/api`

- `GET /categories` — public, list all categories
- `GET /categories/:id` — public
- `POST /categories` — admin (JWT), body: `{ name, description, image }`
- `PUT /categories/:id` — admin (JWT)
- `DELETE /categories/:id` — admin (JWT)
- `GET /items?category=:categoryId` — public, list items, optional category filter
- `GET /items/:id` — public
- `POST /items` — admin (JWT), body: `{ name, description, price, category, images: [], specifications: { thickness, size, grade, brand } }`
- `PUT /items/:id` — admin (JWT)
- `DELETE /items/:id` — admin (JWT)
- `POST /contact` — public, body: `{ name, email, phone, message }` — stores a customer inquiry
- `GET /contact` — admin (JWT), list all inquiries
- `POST /admin/login` — public, body: `{ email, password }` — returns `{ token }`

## Coordination
- Backend teammate builds and runs the API first, then sends a message to the frontend teammate with the final confirmed API details (base URL, any endpoint changes, exact request/response JSON shapes, and how to send the JWT).
- Frontend teammate can scaffold UI/pages/animations against mock data while waiting, then wire up real API calls once the message arrives.
- Each teammate owns its own directory (`backend/` or `frontend/`) — no cross-editing the other's files.
