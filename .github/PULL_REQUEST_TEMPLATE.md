## Summary

<!-- What changed and why. Link issues if any. -->

## Type

- [ ] Docs / RAG corpus
- [ ] Bug fix
- [ ] Feature (proof app / port / BFF)
- [ ] Chore (tooling, CI)

## Dependency Rule

- [ ] Pages stay composition-only
- [ ] Components do not `$fetch` or import adapters
- [ ] Composables call the repository port; adapters do not import Vue UI
- [ ] Nitro BFF stays thin (DTO + private runtimeConfig only)
- [ ] No new layers outside `app/`, `shared/`, `server/`, `layers/`

## Checks

- [ ] `npm run lint`
- [ ] `npm run type-check`
- [ ] `npm test`
- [ ] `npm run build`

## Notes

<!-- Screenshots, follow-ups, out-of-scope items. -->
