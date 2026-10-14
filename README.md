# FoodMortem

Honest ratings and reviews of the food you actually eat. Browse products by
brand and category, rate them out of 10, write positive/moderate/negative
reviews, and keep a bucket list of things to try.

## Stack

| Layer      | Choice                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict)      |
| Data       | MongoDB via the official `mongodb` driver, typed collections            |
| Mutations  | Server Actions validated with zod 4; `useActionState` / `useOptimistic` |
| Auth       | bcrypt-hashed passwords, HS256 JWT (`jose`) in an `httpOnly` cookie    |
| Styling    | Plain CSS with custom properties, native nesting and dark mode         |
| Quality    | ESLint 9 (flat config), Vitest, GitHub Actions CI                      |

There is no client-side state library and no REST API: pages are Server
Components that read from the data layer directly, and every write goes
through a Server Action.

## Getting started

Requirements: Node.js 20.9+ and a MongoDB database (Atlas, or local, for
example `docker run -d -p 27017:27017 mongo:8`).

```bash
npm install
cp .env.example .env.local   # then set MONGODB_URI and SESSION_SECRET
npm run db:seed              # creates indexes and loads seed/catalog.json
npm run dev                  # http://localhost:3000
```

### Scripts

| Script                        | What it does                                                    |
| ----------------------------- | --------------------------------------------------------------- |
| `npm run dev` / `build` / `start` | Next.js dev server, production build, production server      |
| `npm run check`               | Typecheck + lint + unit tests (what CI runs before building)    |
| `npm run db:indexes`          | Creates/updates MongoDB indexes (idempotent)                    |
| `npm run db:seed`             | Seeds the catalog; `-- --reset` replaces an existing catalog    |
| `npm run db:migrate-legacy`   | Migrates a v1 database (dry run; add `-- --apply` to write)     |

## Project layout

```
src/
  app/                 Routes (Server Components); one folder per URL
  components/          UI; files with "use client" are the only client JS
  lib/
    actions.ts         All Server Actions (the only way data changes)
    auth/              Session (JWT cookie) and password hashing
    data/              Server-only data access; returns plain view models
    db/                Mongo client + document types
    domain.ts          Pure logic (rating maths, safe redirects), unit tested
    validation.ts      zod schemas shared by actions and tests
scripts/               Seed, index and legacy-migration CLIs
seed/catalog.json      Starter catalog (from the v1 json-server data)
legacy/                The v1 Pages Router app, kept for reference only
```

## Design notes

- **Authorization is server-side.** Every action derives the user from the
  verified session cookie; user ids from the client are never trusted. Users
  can only delete their own reviews.
- **Ratings and reviews have their own collections.** A unique
  `(productId, userId)` index allows one rating per user per product. Products
  keep denormalised `averageRating`, `ratingCount` and `reviewCounts`, which
  are recomputed from the source collections after each write, so concurrent
  writes converge on the right value.
- **Filters are URL search params**, applied in the database. They work
  without JavaScript and can be shared as links.
- **Builds don't need a database.** Pages render on demand; secrets are
  validated on first use, not at build time.

## Migrating from v1

v1 stored ratings and reviews inside product documents and snapshots inside
user bucket lists. To upgrade an existing database:

1. **Rotate credentials.** v1 committed a MongoDB password and the JWT secret
   in `.env.example`, and shipped the JWT secret to browsers. Change the
   database user's password and treat the old secret as public. Existing v1
   sessions are not accepted by v2, so everyone signs in again.
2. Back up the database.
3. `npm run db:migrate-legacy` (dry run), then
   `npm run db:migrate-legacy -- --apply`.
4. Optionally drop the unused `toprateds` collection.

Existing passwords keep working: v1 bcrypt hashes are moved to `passwordHash`.
