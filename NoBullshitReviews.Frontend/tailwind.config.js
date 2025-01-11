/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        reviewbg: "var(--review-background)",
        reviewinfobg: "var(--review-info-background)",
        reviewinfobglight: "var(--review-background-light)",
      },
    },
  },
  plugins: [],
};
