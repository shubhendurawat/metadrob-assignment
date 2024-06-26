// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.js',
    './src/**/*.jsx',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
