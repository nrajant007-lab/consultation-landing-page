import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#253088", dark: "#1B2468", soft: "#EEF0FB" },
        ink: "#1A1D33",
        muted: "#5B607A",
      },
      boxShadow: { soft: "0 10px 40px -12px rgba(37,48,136,0.25)" },
    },
  },
  plugins: [],
};
export default config;
