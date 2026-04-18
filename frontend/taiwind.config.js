/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        notion: {
          white: '#ffffff',
          warmWhite: '#f6f5f4',
          black: 'rgba(0, 0, 0, 0.95)',
          warmDark: '#31302e',
          gray500: '#615d59',
          gray300: '#a39e98',
          blue: '#0075de',
          blueActive: '#005bab',
          border: 'rgba(0, 0, 0, 0.1)',
        }
      },
      letterSpacing: {
        notionTight: '-2.125px', // Cho H1 (64px)
        notionSub: '-0.625px',  // Cho Subheading (26px)
        notionCard: '-0.25px',  // Cho Card Title (22px)
      },
      boxShadow: {
        notion: 'rgba(0,0,0,0.04) 0px 4px 18px, rgba(0,0,0,0.027) 0px 2.025px 7.84688px, rgba(0,0,0,0.02) 0px 0.8px 2.925px, rgba(0,0,0,0.01) 0px 0.175px 1.04062px',
      }
    },
  },
  plugins: [],
}