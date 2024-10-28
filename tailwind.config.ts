import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        herobg: "url('/hrobg.png')",
      },
      colors: {
        brand_primary: {
          50: "#040404",
          100: ""
        },
        
      },
    },
  },
  plugins: [],
};
export default config;
