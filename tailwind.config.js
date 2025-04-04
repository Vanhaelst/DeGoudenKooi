/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /(bg)-(primary|secondary|lightGray|darkGray)-(500)/,
    },
    {
      pattern: /(columns)-([123])/,
      variants: ["md", "lg"],
    },
    {
      pattern: /(bg)-(white)/,
      variants: ["hover"],
    },
  ],
  theme: {
    extend: {
      animation: {
        scale: "scale 1.5s ease-in-out 7",
      },
      keyframes: {
        scale: {
          "0%, 100%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1)" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        lightGray: {
          500: "#F7F6F2",
        },
        darkGray: {
          500: "#dad5c3",
        },
        primary: {
          500: "#CBA442",
          700: "#827451",
        },
        secondary: {
          500: "#453408",
          700: "#453408",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
