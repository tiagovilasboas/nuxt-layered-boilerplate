<script setup lang="ts">
const { data, pending, error } = useCatalog()
const config = useRuntimeConfig()

const items = computed(() => data.value ?? [])
const errorMessage = computed(() => error.value?.message ?? null)
</script>

<template>
  <div class="page">
    <header class="hero">
      <PlatformBadge />
      <p class="eyebrow">{{ config.public.appName }}</p>
      <h1>Nuxt layered architecture</h1>
      <p>
        Dependency Rule inward:
        <code>pages → components → composables → repository → infra</code>.
        This page is the composition root. The Nitro BFF at
        <code>/api/catalog</code> never exposes private runtimeConfig.
      </p>
    </header>
    <CatalogList :items="items" :pending="pending" :error-message="errorMessage" />
    <footer class="foot">
      RAG corpus lives in <code>docs/</code> — start at <code>AGENTS.md</code> and
      <code>docs/INDEX.md</code>.
    </footer>
  </div>
</template>
