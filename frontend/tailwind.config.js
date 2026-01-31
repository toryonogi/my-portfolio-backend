/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // frontend直下のhtml
    './src/**/*.{html,js}', // srcフォルダの中
    './assets/**/*.js', // assets内のjsでクラスを使う場合
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
