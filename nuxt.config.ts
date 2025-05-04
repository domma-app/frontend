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
});
