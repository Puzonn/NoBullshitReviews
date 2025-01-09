import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        reviewbg: "var(--review-background)",
        reviewinfobg: "var(--review-info-background)",
        reviewinfobglight: "var(--review-background-light)"
      },
    },
  },
  plugins: [],
} satisfies Config;
