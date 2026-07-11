import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08080A",        // page black
        graphite: "#101013",   // section alt
        charcoal: "#17171B",   // card
        seam: "#26262C",       // hairline borders
        mist: "#9C9CA6",       // muted text
        paper: "#EFEFF2",      // primary text
        ember: "#FF8400",      // accent
        "ember-soft": "rgba(255,132,0,0.12)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        label: ["Manrope", "system-ui", "sans-serif"],
      },
      maxWidth: { wrap: "72rem" },
      letterSpacing: { caps: "0.18em" },
    },
  },
  plugins: [],
};
export default config;
