// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
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
});
