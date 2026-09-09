# MFE and team topology

Micro-frontends are an organizational tool. This repo demonstrates the **smallest** Nuxt-native slice: one **layer**, not a fleet of remotes.

## What ships in the proof

`nuxt.config.ts` has `extends: ['./layers/platform']`. The layer (`layers/platform`) provides `PlatformBadge` — a Host-visible contract owned by a Platform stream. Feature UI (catalog) stays in the app. That is enough to teach the seam.

This is **not** ten Module Federation remotes. Federation is an option when independent deploy + runtime composition is a real constraint. Layers compose at **build** time and share one Nitro unless you split apps.

## Two composition styles

| Style | Use when | Cost |
| --- | --- | --- |
| **Nuxt Layer** (`extends`) | Shared UI kit, runtimeConfig conventions, eslint defaults; one deployable | Simple; versioning is git/npm of the layer |
| **Host / remote (Federation)** | Separate deploy trains, different teams shipping UI into a shell at runtime | Extra contract: shared deps, routing, auth, failure isolation |

Sketch for a future host/remote (docs only — not implemented):

- **Host** owns the shell, routing, `runtimeConfig` public/private split, layout.
- **Remote** owns a feature route and exposes a contract (page or island). It still uses the same Dependency Rule internally.
- Host must not import the remote’s repository adapters. Share **types** (port + model), not implementations, if they live in different builds.

## Stream-aligned teams (example)

Inspired by Team Topologies — names are generic.

| Stream | Owns | Interaction |
| --- | --- | --- |
| **Host** | App shell, `app/pages`, routing, public runtimeConfig, deploy of the composed UI | Collaborates with Feature; consumes Platform |
| **Feature** | `shared/catalog`, composable, presentational list, tests for the port | X-as-a-service from Platform (layer, CI, BFF conventions) |
| **Platform** | `layers/platform`, Nitro/BFF defaults, private config contract, CI | Enabling + X-as-a-service; does not write feature stories |

A Platform team that implements catalog list items has become a Feature team. A Feature team that forks `runtimeConfig` keys without Host review will leak secrets or break hydration.

## Do / don’t

**Do** start with a layer. Promote to runtime remotes only when independent deploy is proven.

**Don’t** share a Pinia store across remotes as a domain bus. **Don’t** put Feature DTO mappers inside the Platform layer.

See [architecture.md](architecture.md) and [practices.md](practices.md).
