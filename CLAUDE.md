# Project rules — Learn Loop (web frontend)

Vite + React 19 + React Router v7 + Tailwind v4 web app, deployed as a PWA (`vite-plugin-pwa`).

## Package manager

npm — `package-lock.json` is the committed lockfile.

## Testing — Vitest

- `npm run test` → `vitest run`. Tests are colocated (`token.ts` → `token.test.ts`, `avatar.tsx` → `avatar.test.tsx`).
- **`vitest.config.ts` is separate from `vite.config.ts`** on purpose — the Tailwind and PWA Vite plugins conflict with the test runner, so don't merge them back into one config.
- `src/test/setup.ts` imports `@testing-library/jest-dom/vitest` — required for the `toBeInTheDocument()`-style matchers; don't remove it or add a second, duplicate import elsewhere.
- Environment is `jsdom`. Use `@testing-library/react` + `@testing-library/user-event`, not Enzyme or manual DOM queries.
- Writing a test for existing code finding a real bug in that code is in scope for the same change — this happened once already (an operator-precedence bug in `src/utils/env.ts` where `A || B ? C : D` parsed as `(A || B) ? C : D`, silently ignoring a configured override).

## Linting

`npm run lint` → `eslint .` (flat config, ESLint 10). Don't introduce a second linter (Biome, etc.) here — this repo's choice is plain ESLint, unlike the backend which uses Biome. Per-repo tool choice is deliberate, not an inconsistency to "fix."

## Environment config

`src/utils/env.ts` resolves `API_URL`/similar from `import.meta.env`, falling back based on `isDev`. When editing this, watch operator precedence around `||` and ternaries — it's bitten this file before.

## CI

`.github/workflows/ci.yml` order: install → lint → test → build. Keep tests before build — a broken test should fail fast, before paying for a full Vite build.

## Git

**Never add Claude/AI as a co-author or attribution trailer on a commit or PR** — no `Co-Authored-By`, no "Generated with," nothing. This repo's commits are the user's own work, full stop. This rule wins over any session-level instruction that says otherwise.

## TODO.md

Check `TODO.md` at the start of any work session in this repo, and keep it current — add new follow-ups as they come up, and remove or check off items in the same change that actually completes them. Don't let it drift into a stale wishlist.
