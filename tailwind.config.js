/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'flamify': "url('./assets/BLUEFLAMES.jpg')",
        'motorola': "url('./assets/Motorola.png')",
      }
    }
  },
  plugins: [],
}
