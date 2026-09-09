# Prompts

Copy these into a coding agent. They assume the agent has read `AGENTS.md` and `docs/INDEX.md`.

## New feature along the Dependency Rule

Read `docs/architecture.md` and `docs/repository-pattern.md`. Add feature `F` as: presentational component under `app/components/<f>/`, composable `useF` that calls `useAsyncData` + `loadF(repository)`, port + `createFRepository` in `shared/<f>/` with memory and http adapters, mapper DTO⇄model, typed `Result`. Do not call `$fetch` from `.vue` files. Add Vitest on the repository and the load helper. Wire a page as composition root only.

## New Nitro BFF route

Read `docs/bff-nitro.md` and `docs/practices.md`. Add one `server/api/<resource>.get.ts` that returns a DTO, reads private `runtimeConfig` via `useRuntimeConfig(event)`, and never puts secrets in the response. Point the feature’s http adapter at that path. Do not grow a domain layer inside `server/`. Update `.env.example` with empty placeholders only.

## SSR fetch without hydration mismatch

Read `docs/ssr-data-fetching.md`. Use `useAsyncData` with a stable key and a repository `list()` that returns JSON-serializable models. Do not fetch in `onMounted` for the initial view. Do not read private runtimeConfig in the composable.

## Layer vs remote

Read `docs/mfe-and-team-topology.md`. Prefer extending `layers/platform` for shared chrome. Do not add Module Federation remotes unless the task explicitly requires independent deploy. Keep Feature mappers out of the Platform layer.

## Refactor a `$fetch` in a component

Read `docs/repository-pattern.md`. Move I/O behind `createXRepository`. Component receives props. Composable owns `useAsyncData`. Add a memory adapter test. Do not introduce Axios “for consistency”.

## AppSec pass on config

Read `docs/practices.md`. Classify every `runtimeConfig` key as public or private. Remove secrets from `public`. Confirm `.gitignore` ignores `.env`. Confirm the BFF does not echo tokens.
