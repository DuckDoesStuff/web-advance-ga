/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deepGreen': "#1F4529",
        'normalGreen': "#47663B",
        'lightGreen': "#E8ECD7",
        'normalSkin': "#EED3B1"
      }
    },
  },
  plugins: [],
}

