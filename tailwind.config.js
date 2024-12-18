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
      pattern: /(bg)-(white)/,
      variants: ["hover"],
    },
  ],
  theme: {
    extend: {
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
