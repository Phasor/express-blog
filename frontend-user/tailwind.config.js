/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            robotoFlex: "'Roboto Flex', sans-serif",
            arvo: "'Arvo', serif",
            robotoMono: "'Roboto Mono', monospace",
        }
      },
    },
    plugins: [],
  }