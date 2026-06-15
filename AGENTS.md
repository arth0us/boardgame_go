# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React demo exported from a Figma project. Application code lives in `src/app`. Route-level screens are in `src/app/components`, shared state is in `src/app/contexts`, and demo constants are in `src/app/constants`. Reusable UI primitives live under `src/app/components/ui`. Global styles are in `src/styles`, with Vite entry files at `index.html` and `src/main.tsx`. Design/reference notes are in `guidelines/`; generated build output goes to `dist/` and should not be edited by hand.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server, usually at `http://localhost:5173`.
- `npm run build`: create a production build in `dist/` and catch TypeScript/Vite compilation issues.

There is currently no `npm test` or lint script configured. Use `npm run build` as the minimum verification before handing off changes.

## Coding Style & Naming Conventions

Use TypeScript React components with named exports for app components, contexts, and helpers. Keep component filenames in PascalCase, such as `ExplorePage.tsx`, and context files named after their provider, such as `EventsContext.tsx`. Prefer existing Tailwind-style utility classes and local component patterns over introducing new styling systems. Keep stateful demo data in contexts or constants rather than scattering arrays inside unrelated components.

## Testing Guidelines

No automated test framework is configured yet. For UI changes, run `npm run build` and manually smoke test the affected route in the browser. When practical, verify core flows on the mobile-sized app viewport: open `/explore`, `/create`, `/profile`, and confirm interactions such as creating events, opening details, and updating preferences.

## Commit & Pull Request Guidelines

Git tooling may not be available in every local environment, and this repository does not expose a visible commit convention in the current workspace. Use concise, imperative commit messages when committing, for example `feat: add activity detail sheet` or `fix: pin quick preference panel`. Pull requests should include a short summary, affected routes/components, verification steps, and screenshots or screen recordings for visual UI changes.

## Agent-Specific Instructions

Do not edit `dist/`, `node_modules/`, or generated logs. Keep changes scoped to `src/` unless updating documentation or project configuration. Before completing frontend work, confirm the dev server still serves the app and run `npm run build`.
