/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/**/*.{js,vue,ts}", "./pages/**/*.vue", "./app.vue"],
  theme: {
    extend: {
      colors: {
        green: {
          500: "#42b883",
          600: "#3aa876",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
