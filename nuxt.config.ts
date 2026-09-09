export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/eslint'],
  extends: ['./layers/platform'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: false,
  },
  runtimeConfig: {
    // Private: server/Nitro only. Set via NUXT_UPSTREAM_API_TOKEN.
    upstreamApiToken: '',
    // Private: optional real upstream. Empty → BFF serves seed data.
    upstreamCatalogUrl: '',
    public: {
      // Public: serialized to the client. Never put secrets here.
      appName: 'Nuxt Layered Guide',
    },
  },
  nitro: {
    routeRules: {
      '/api/**': {
        headers: {
          'cache-control': 'no-store',
        },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Nuxt Layered Guide',
      meta: [
        {
          name: 'description',
          content:
            'Staff-grade Nuxt layered architecture guide: Dependency Rule, repository port, Nitro BFF.',
        },
      ],
    },
  },
})
