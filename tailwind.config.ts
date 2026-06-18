import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "var(--noir)",
        "noir-2": "var(--noir-2)",
        pearl: "var(--pearl)",
        bulb: "var(--bulb)",
        champagne: "var(--champagne)",
        orchid: "var(--orchid)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
