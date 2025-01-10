import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)", color: "#D1D5DB" }, // text-gray-300
          "100%": { opacity: "1", transform: "translateY(0px)", color: "#B91C1C" }, // text-red-700
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
      },
    },
  },
  fontFamily: {
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
    sigmar_one: ['"Sigmar One"', 'sans-serif']
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            primary: "#152330",
            secondary: "#a3a3a3",
            purple: "#0f172a",
            white: "#ffffff",
            splash_bg: "#2F6146",
          },
        },
      },
    }),
  ],
};
export default config;
