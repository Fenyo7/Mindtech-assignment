// tailwind.config.js

module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
  },
  darkMode: 'media', // Change to 'media' if you were using 'false'
  theme: {
    extend: {
      // Add any theme extensions here
    },
  },
  variants: {
    extend: {
      // Add any variant extensions here
    },
  },
  plugins: [
    // Add any plugins here
  ],
};
