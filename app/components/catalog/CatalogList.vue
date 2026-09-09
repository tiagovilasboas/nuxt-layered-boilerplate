<script setup lang="ts">
import type { CatalogItem } from '#shared/catalog'

defineProps<{
  items: CatalogItem[]
  pending: boolean
  errorMessage: string | null
}>()
</script>

<template>
  <section class="catalog" aria-labelledby="catalog-heading">
    <h2 id="catalog-heading">Catalog proof</h2>
    <p class="lede">
      Presentational list. Data arrives from the page via <code>useCatalog</code>, never from
      <code>fetch</code> inside this file.
    </p>
    <p v-if="pending" class="status" role="status">Loading catalog…</p>
    <p v-else-if="errorMessage" class="status status-error" role="alert">{{ errorMessage }}</p>
    <ul v-else class="catalog-list">
      <li v-for="item in items" :key="item.id" class="catalog-item">
        <span class="status-pill" :data-status="item.status">{{ item.status }}</span>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
