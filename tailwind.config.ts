import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      "mini": ["sf-light"],
      "body": ["sf-medium"],
      "max": ["sf-bold"]
    },
    colors: {
      "background": "#10191F",
      "button": "#0391FF",
      "button-light": "#5BB7FF",
      "dark": "#242525",
      "dark-light": "#585F65",
      "text": "#FFFFFF"
    }
  },
  plugins: [],
};
export default config;
