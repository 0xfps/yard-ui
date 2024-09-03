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
      backgroundImage: {},
    },
    fontFamily: {
      "sf-light": ["sf-light"],
      "sf-medium": ["sf-medium", ...defaultTheme.fontFamily.sans],
      "sf-bold": ["sf-bold"]
    },
    colors: {
      "background": "#10191F",
      "button": "#0391FF",
      "button-light": "#5BB7FF",
      "night": "#242525",
      "night-light": "#585F65",
      "text": "#FFFFFF"
    }
  },
  plugins: []
};
export default config;
