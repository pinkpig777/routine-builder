/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 45px -30px rgba(15, 23, 42, 0.45)',
      },
    },
  },
  plugins: [],
}
