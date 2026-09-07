import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces are glass now: translucent white over the ambient field,
        // expressed inline as white/<alpha>. Only the ground and the ink/text
        // ramp need named tokens.
        ink: "#08080A",   // page ground
        mist: "#9C9CA6",  // muted text
        paper: "#EFEFF2", // primary text
        ember: "#FF8400", // accent
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        label: ["var(--font-label)", "system-ui", "sans-serif"],
      },
      maxWidth: { wrap: "72rem" },
      letterSpacing: { caps: "0.18em" },
    },
  },
  plugins: [],
};
export default config;
