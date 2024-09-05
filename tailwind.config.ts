import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('/images/background.svg')",
        "feature1": "url('/images/nft-swap.svg')",
        "feature2": "url('/images/nft-imgs.svg')",
        "swap-hero": "url('/images/swap-background.svg')"
      }
    },
    fontFamily: {
      "sf-light": ["sf-light"],
      "sf-medium": ["sf-medium", ...defaultTheme.fontFamily.sans],
      "sf-bold": ["sf-bold"]
    },
    colors: {
      "background": "#10191F",
      "background-cover": "rgba(6, 7, 10, 0.5)",
      "button": "#0391FF",
      "button-light": "#5BB7FF",
      "night": "#242525",
      "night-light": "#585F65",
      "text": "#FFFFFF",
      "transparent": "transparent",
      "div-grad-start": "#0099FF",
      "div-grad-end": "#F8FBFD"
    }
  },
  plugins: []
};
export default config;
