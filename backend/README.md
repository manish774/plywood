# Plywood Shop — Backend API

Node.js + Express + Mongoose REST API for the Plywood Shop app.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in real values (MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD)
```

## Running

```bash
npm run dev    # nodemon, auto-restarts on file changes
npm start      # plain node, for production
```

The server reads `PORT` from `.env` (defaults to `5000` if unset) and connects to MongoDB using `MONGODB_URI` before it starts listening. If it can't connect to Mongo, it logs the error and exits instead of serving requests against a dead DB.

> **Local dev note (macOS):** port `5000` is often occupied by macOS's own AirPlay Receiver / ControlCenter process. If `npm run dev` fails with `EADDRINUSE` on port 5000, either turn off AirPlay Receiver (System Settings → General → AirDrop & Handoff) or set `PORT=5050` (or similar) in your local `.env`.

## Environment variables (`.env`)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string. Never commit the real value. |
| `PORT` | Port the API listens on (default `5000`). |
| `JWT_SECRET` | Secret used to sign/verify admin JWTs. |
| `ADMIN_EMAIL` | Single shop-owner admin email for login. |
| `ADMIN_PASSWORD` | Single shop-owner admin password for login. |

There is no admin user table — auth is a single hardcoded shop-owner account checked directly against these env vars.

## Auth model

- `POST /api/admin/login` checks the submitted `email`/`password` against `ADMIN_EMAIL`/`ADMIN_PASSWORD` and, if they match, returns a JWT signed with `JWT_SECRET` (7 day expiry).
- Protected endpoints require header: `Authorization: Bearer <token>`.
- Missing/malformed header → `401 { "error": "Missing or malformed Authorization header. Expected: Bearer <token>" }`.
- Invalid/expired token → `401 { "error": "Invalid or expired token" }`.

Protected (write) endpoints: all of `POST/PUT/DELETE` on `/api/categories` and `/api/items`, plus `GET /api/contact`.
Public endpoints: `GET` on `/api/categories` and `/api/items` (incl. `/:id`), `POST /api/contact`, `POST /api/admin/login`.

## Error shape

Every error response is JSON: `{ "error": "<message>" }`, with one of these status codes:
- `400` — validation error / bad input / malformed id
- `401` — missing, malformed, or invalid/expired auth token; bad login credentials
- `404` — resource not found
- `500` — unexpected server error

## Data models

**Category**
```
{
  _id, name (string, required), description (string), image (string, URL),
  createdAt, updatedAt
}
```

**Item**
```
{
  _id, name (string, required), description (string), price (number, required, >= 0),
  category (ObjectId ref Category — populated in responses), images (string[]),
  specifications: { thickness, size, grade, brand } (all strings),
  createdAt, updatedAt
}
```

**Contact** (customer inquiry)
```
{
  _id, name (string, required), email (string, required, validated),
  phone (string), message (string, required), createdAt
}
```

## Endpoints

Base URL: `http://localhost:5000/api` (or whatever `PORT` you set)

### Categories

| Method | Path | Auth | Body | Success response |
|---|---|---|---|---|
| GET | `/categories` | public | — | `200` array of Category |
| GET | `/categories/:id` | public | — | `200` Category, or `404` |
| POST | `/categories` | Bearer JWT | `{ name, description?, image? }` | `201` created Category |
| PUT | `/categories/:id` | Bearer JWT | any subset of `{ name, description, image }` | `200` updated Category, or `404` |
| DELETE | `/categories/:id` | Bearer JWT | — | `200 { message, id }`, or `404` |

### Items

| Method | Path | Auth | Body | Success response |
|---|---|---|---|---|
| GET | `/items?category=:categoryId` | public | — | `200` array of Item (category field populated); `category` query param optional |
| GET | `/items/:id` | public | — | `200` Item (category populated), or `404` |
| POST | `/items` | Bearer JWT | `{ name, description?, price, category, images?: [], specifications?: { thickness, size, grade, brand } }` | `201` created Item (category populated) |
| PUT | `/items/:id` | Bearer JWT | any subset of the POST body fields | `200` updated Item, or `404` |
| DELETE | `/items/:id` | Bearer JWT | — | `200 { message, id }`, or `404` |

`category` must be a valid, existing Category `_id` — both on create and on the `?category=` filter (an invalid ObjectId format returns `400`, a well-formed but non-existent category id simply returns an empty items array for GET, or `400` for POST/PUT referencing it).

### Contact / Inquiries

| Method | Path | Auth | Body | Success response |
|---|---|---|---|---|
| POST | `/contact` | public | `{ name, email, phone?, message }` | `201` created Contact |
| GET | `/contact` | Bearer JWT | — | `200` array of Contact, newest first |

### Admin

| Method | Path | Auth | Body | Success response |
|---|---|---|---|---|
| POST | `/admin/login` | public | `{ email, password }` | `200 { token }`, or `401` on bad credentials |

### Misc

| Method | Path | Auth | Response |
|---|---|---|---|
| GET | `/api/health` | public | `200 { status: "ok" }` — liveness check |

## Manual smoke test (what was run before declaring this done)

```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/categories
curl -X POST http://localhost:5000/api/admin/login -H "Content-Type: application/json" \
  -d '{"email":"<ADMIN_EMAIL>","password":"<ADMIN_PASSWORD>"}'
# then use the returned token as: -H "Authorization: Bearer <token>"
```

Full create/read/update/delete cycles for categories and items, plus the public/admin contact split and 400/401/404 error paths, were verified against a live MongoDB Atlas connection during development.

## Deployment (Render, free tier)

A `render.yaml` blueprint lives at the repo root and points at this directory (`rootDir: backend`).

1. Push the repo to GitHub (Render deploys from a Git remote).
2. In the Render dashboard: **New > Blueprint**, pick this repo. Render reads `render.yaml` and creates the `plywood-backend` web service (build: `npm install && npm run build`, start: `npm start`).
3. On the service's **Environment** tab, fill in the values `render.yaml` leaves blank (`sync: false`): `MONGODB_URI`, `JWT_SECRET`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, `OTP_EXPIRY_MINUTES` — same values as your local `.env`. Don't set `PORT`; Render injects its own and the server already reads `process.env.PORT`.
4. Deploy. Render gives you a `https://plywood-backend.onrender.com`-style URL — use that as the frontend's API base URL.

Free-tier caveat: the service spins down after 15 minutes of no traffic, so the first request after idle takes 30-50s to wake it back up. Fine for a small shop site; not for anything needing instant response every time.
