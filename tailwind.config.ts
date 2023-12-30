import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#63593f",
        "primary-content": "#dbd5c6",
        "primary-dark": "#443d2b",
        "primary-light": "#827553",

        secondary: "#633f5b",
        "secondary-content": "#dbc6d6",
        "secondary-dark": "#442b3e",
        "secondary-light": "#825378",

        background: "#f2f1ee",
        "background-dark": "#1d1b16",
        foreground: "#fcfbfb",
        "foreground-dark": "#2c2921",
        border: "#e4e1db",
        "border-dark": "#494437",

        copy: "#2c2921",
        "copy-dark": "#fcfbfb",
        "copy-light": "#746c58",
        "copy-dark-light": "#dedbd3",
        "copy-lighter": "#9c937c",
        "copy-dark-lighter": "#b2ab99",

        success: "#3f633f",
        warning: "#63633f",
        error: "#633f3f",

        "success-content": "#c6dbc6",
        "warning-content": "#dbdbc6",
        "error-content": "#dbc6c6",
      },
    },
  },
  plugins: [],
} satisfies Config;
