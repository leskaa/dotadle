/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-spash": "url('/src/assets/DotaHeroesBackground.webp')",
      },
    },
  },
  plugins: [],
};
