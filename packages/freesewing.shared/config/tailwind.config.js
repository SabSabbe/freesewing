// Handle themes
const themes = require('../themes')

module.exports = {
  content: [
    './pages/*.js',
    './pages/**/*.js',
    './components/*.js',
    './components/**/*.js',
    './page-templates/*.js',
    '../freesewing.shared/components/**/*.js',
  ],
  plugins: [require('daisyui'), require('tailwindcss/nesting')],
  daisyui: {
    styled: true,
    themes: [themes],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16'
      }
    }
  }
}
