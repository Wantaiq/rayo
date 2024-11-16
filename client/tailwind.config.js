/** @type {import('tailwindcss').Config} */
import form from '@tailwindcss/forms';
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [form],
};
