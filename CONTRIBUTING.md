# Contributing

Thanks for improving this guide. Changes must stay retrieval-friendly (one topic per doc file, stable paths) and must respect the Dependency Rule. Do not grow the proof app into a framework.

Docs, CONTRIBUTING, and PR text are **English**.

## Prerequisites

- Node.js 22.19+ (`.nvmrc` is `22`; CI uses Node 22.x)
- npm 10+ (`package.json` engines)

```bash
git clone https://github.com/tiagovilasboas/nuxt-layered-boilerplate.git
cd nuxt-layered-boilerplate
cp .env.example .env
npm install --legacy-peer-deps
```

## Default branch

The repository default is **`main`**. Open pull requests against `main`.

## Architecture contract

Read [`AGENTS.md`](AGENTS.md) and [`docs/INDEX.md`](docs/INDEX.md) before changing `app/`, `shared/`, `server/`, or `layers/`.

- Direction: `pages` → `components` → `composables` → repository port → infra
- Pages compose only
- Components must not `$fetch` or import adapters
- Composables may call the port (inject the repository)
- Adapters must not import Vue components or pages
- One Nitro BFF route unless a new page needs a new shaped payload
- No secrets in git, docs examples, or `runtimeConfig.public`

The canonical proof is the catalog slice composed from `app/pages/index.vue`.

## Local checks

Run these before opening or updating a PR:

```bash
npm run lint
npm run type-check
npm test
npm run build
```

CI (`.github/workflows/ci.yml`) runs the same gates.

## Pull requests

1. Branch from the latest `main`.
2. Keep the diff scoped. Docs-only and proof-app rewrites do not belong in the same PR unless the contract moved.
3. Fill in the PR template.
4. Include Vitest coverage for repository/composable behavior changes.
5. Conventional Commits when practical (`feat:`, `fix:`, `docs:`, `chore:`).

### Suggested branch names

`docs/<topic>`, `fix/<topic>`, `feat/<topic>` — short and lowercase.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
