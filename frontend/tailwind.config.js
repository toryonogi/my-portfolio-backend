/** @type {import('tailwindcss').Config} */
export default {
  // 1. 探索範囲に index.html を追加し、srcの中も広く指定する
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
