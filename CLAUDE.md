# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

CodeConnect is a pnpm workspaces monorepo (`pnpm-workspace.yaml` → `apps/*`) with two independent apps:

- `apps/web` — React 19 + TypeScript SPA built with Vite (package name `web`)
- `apps/api` — NestJS backend (package name `api`), listens on `PORT` or 3000

The apps don't share code or packages yet. The UI design lives in Figma (link in `README.md`: "CodeConnect – Acervo").

There is a single git repository at the root. The apps must not have their own `.git`, but each one has its own `.gitignore`, alongside the root one.

## Commands

Run everything from the repo root using pnpm (not npm or yarn):

```bash
pnpm install              # installs all workspace deps
pnpm web:dev              # Vite dev server
pnpm web:build            # tsc -b && vite build
pnpm web:lint             # oxlint
pnpm web:test             # vitest run (jsdom + React Testing Library)
pnpm api:dev              # nest start --watch
pnpm api:build            # nest build -> apps/api/dist
pnpm api:start            # node dist/main (after build)
pnpm api:lint             # oxlint --type-aware
pnpm api:test             # vitest run (unit, *.spec.ts)
pnpm dev / pnpm build     # run dev/build across all apps
```

To run any other app script, use `pnpm web <script>` or `pnpm api <script>`, for example `pnpm api test:e2e` or `pnpm api format`.

To run a single web test: `pnpm web test src/components/atoms/Button/Button.test.tsx`.

To run a single API test, pass a file filter and/or `-t` with the test name through to vitest:

```bash
pnpm api test src/app.controller.spec.ts
pnpm api test -t "should return"
```

## Frontend conventions (`apps/web`)

- **Atomic Design** in `src/components`, with one folder per level: `atoms`, `molecules`, `organisms`, `templates`, `pages`.
  - Dependencies only go downward: a level may import from the levels below it, never from the same or a higher level. So `atoms` import from no other level, `molecules` only from `atoms`, `organisms` from `molecules` and `atoms`, `templates` from `organisms` and below, and `pages` from any level below.
  - If a component needs something from a higher level, it is at the wrong level: move it, or pass the content in via props or `children`.
- **Styling:** Tailwind CSS utility classes. Don't add per-component CSS files.
- **Tests:** every component has a co-located test next to it (e.g. `Button/Button.test.tsx`, or `Button.test.tsx` beside `Button.tsx`) using Vitest + React Testing Library.
  - Cover the essential usage: it renders, the main props and variants work, and key user interactions fire the expected callbacks. Query by role or label, as a user would.
  - Full coverage is not required; don't write tests just to raise a percentage.

## Backend conventions (`apps/api`)

- **Resources:** routes are plural nouns in kebab-case (`/users`, `/blog-posts`), never verbs (`/getUsers`).
- **Methods and status codes:**
  - `GET` reads: 200 on success, 404 when not found.
  - `POST` creates: 201 with the created resource, and a `Location` header if practical.
  - `PUT` replaces and `PATCH` updates partially: 200 with the resource.
  - `DELETE` removes: 204 with no body.
  - Errors: 400 for malformed input, 401 when unauthenticated, 403 when forbidden, 404 when missing, 409 on conflicts, 422 for validation failures, 500 for unexpected errors. Never return 200 with an error in the body.
- **Nested routes** only for real ownership, where the child cannot exist without the parent (`/users/:userId/posts`). Otherwise keep the resource at the top level and filter with query params. Don't nest more than one level deep.
- **Pagination:** list endpoints take `?page` (1-based) and `?limit`. Set a default and a maximum for `limit`, and return the pagination metadata (page, limit, total) in the response.
- **Response envelope:** every response, success or error, has the same shape:

  ```json
  {
    "statusCode": 200,
    "message": "OK",
    "data": {},
    "errors": []
  }
  ```

  - `statusCode` matches the HTTP status and `message` is a short human-readable text.
  - `data` holds the payload on success. For lists it holds the items plus the pagination metadata.
  - `errors` is an array of details (for example per-field validation errors) and is empty on success. `data` is omitted or `null` on errors.
  - Implement it once, with a global interceptor for success and a global exception filter for errors, instead of in each controller.

## Git conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org): `type(scope): description`, in lower case, imperative mood, with no trailing period.

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Scopes:** `web` (changes in `apps/web`), `api` (changes in `apps/api`), `root` (workspace-level files such as `package.json`, `pnpm-workspace.yaml`, `.gitignore`, `CLAUDE.md`). A change that touches several scopes should be split into one commit per scope.
- Breaking changes: add `!` after the scope (`feat(api)!: ...`) and a `BREAKING CHANGE:` footer.
- Examples: `feat(web): add button atom`, `fix(api): return 404 when user is missing`, `chore(root): add workspace shortcuts`.

## Architecture notes

- **Both apps are ESM** (`"type": "module"`). The API uses `module: nodenext`, so relative imports in `apps/api/src` need explicit `.js` extensions (e.g. `import { AppModule } from './app.module.js'`), and `main.ts` uses top-level `await`.
- **Tooling:** linting is oxlint in both apps (`.oxlintrc.json` in each; there is no ESLint). The API uses Prettier for formatting and Vitest instead of Jest. Unit tests are `*.spec.ts` (`vitest.config.ts`) and e2e tests are `test/*.e2e-spec.ts` (`vitest.config.e2e.ts`, using supertest). Vitest runs with `globals: true` and resolves tsconfig path aliases.
- **TypeScript versions differ:** web is on TS 7 (`tsc -b` with `tsconfig.app.json` and `tsconfig.node.json`), while the API is on TS 6.
- **Scaffolding:** generate new Nest modules, controllers and services with the Nest CLI from the API dir (`pnpm api exec nest g <schematic> <name>`) so the files follow the CLI conventions.
- **Telemetry:** `apps/api/AGENTS.md` describes NestJS Observe. It is not wired in yet; `ObserveModule` would be registered in `src/app.module.ts` via `npx @nestjs/observe link`.
