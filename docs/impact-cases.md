# Impact cases

Anonymized, generic leverage stories. Metrics are **illustrative**, not from a named employer or product. No firm IP.

## 1. Page-level fetch → repository + `useAsyncData`

**Before.** Three pages each called `$fetch` in `onMounted`. SSR HTML was empty; the client waterfall added ~800 ms TTI on mid-tier mobile. Hydration warnings appeared whenever the API lagged. Tokens for a “server-only” environment leaked into a composable that ran on the client.

**After.** One catalog port, http adapter, Nitro BFF, `useAsyncData('catalog')`. First paint includes data. Client skips the refetch. Private token stays in `runtimeConfig` on the server.

**Leverage (illustrative).** ~40% fewer client HTTP calls on first load; zero token-in-payload findings on the next review; one mapper to change when the DTO gained a field.

## 2. Shared Axios instance in components → Port–Adapter

**Before.** A global HTTP client imported by 20+ components. Swapping the mock for tests required `vi.mock` on the module. A staging URL change touched UI files. Onboarding took a full day to learn “where fetch lives”.

**After.** `createXRepository({ kind })`. Tests inject memory. Staging injects http with a different `request`. Components are unaware.

**Leverage (illustrative).** Test runtime for the feature module dropped from ~12 s (jsdom + mock gymnastics) to ~1 s (node + memory). Review time on API changes stayed in `mapper.ts` + BFF, not in Vue.

## 3. Copy-paste remotes → one layer + stream-aligned teams

**Before.** Five “micro-frontends” that were duplicated Nuxt apps, each with its own eslint, tokens, and a slightly different fetch wrapper. A Platform badge required five PRs. Host routing broke when remotes drifted Vue minor versions.

**After.** One `layers/platform` for chrome and conventions. Feature work stays in-app behind the Dependency Rule. Runtime Federation deferred until a team actually needed an independent deploy train.

**Leverage (illustrative).** Design-token change: 1 PR instead of 5. Mean time to first feature PR for a new engineer: ~half a day with `AGENTS.md` + `docs/INDEX.md` vs ~two days of tribal fetch lore.

These numbers are teaching aids. Replace them with your own telemetry when you fork the pattern.
