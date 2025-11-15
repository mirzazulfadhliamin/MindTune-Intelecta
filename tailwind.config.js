/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2F80ED",
          light: "#60A5FA", 
          dark: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#FB923C",
          light: "#FED7AA",
        },
        background: {
          DEFAULT: "#E3F2FD",
          white: "#FBFBFB",
          green: "#B9F8CF",
        },
        text: {
          white: "#FFFFFF",
          gray: "#374151",
          black: "#1F2937",
          silver: "#ACB5BB",
        },
        success: "#00A63E",
      },
      boxShadow: {
        'full-blur': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundColor: {
        'background': '#E3F2FD',
      }
    },
  },
  plugins: [],
}