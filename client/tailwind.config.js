/** @type {import('tailwindcss').Config} */
export default  {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3EBAD0",
        primaryhover: "#33A9BC",
        secondary: "#FBDE71",
        background: "#F7F7F7",
        text: {
          black: "#101010",
          white: "#FFFFFF",
        },
        support1: "#F7F7F7",
        support2: "#E2E2E2",
        support3: "#939393",
        support4: "#D0D0D0",
        support5: "#2C2C2C",
        support6: "#1F1F1F",
        night: {
          default: "#1F1F1F",
          hover: "#0D0D0DF",
        },
        success: '#10B981',
        fail: '#EF4444',

      },
      fontFamily: {
        sans: ['Albert Sans', 'sans-serif'], // 👈 Default body font
      },
    },
  },
  plugins: [],
}