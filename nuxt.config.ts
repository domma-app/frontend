// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  tailwindcss: {
    // Options
  },
  // app: {
  //   baseURL: '/frontend/',
  // },
  // inlineSSRStyles: false,
  nitro: {
    preset: "netlify",
    prerender: {
      crawlLinks: true,
      failOnError: false, // Prevents GitHub Action from failing on a single route error
    },
  },
  runtimeConfig: {
    // apiSecret: "", // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Domma",
      short_name: "Domma",
      description: "Dompet Mahasiswa",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      orientation: "portrait",
      scope: "/",
      icons: [
        {
          src: "icons/icon_64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/icon_144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon_192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon_512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "icons/icon_512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
      screenshots: [
        {
          src: "icons/icon_512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      categories: ["productivity", "finance"],
      prefer_related_applications: false,
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
