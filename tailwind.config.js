/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {},
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1677ff",
        body: "#2b2b2b",
        description: "#5c5c5c",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
