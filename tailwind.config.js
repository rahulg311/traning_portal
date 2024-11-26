// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '4px',   // For vertical scrollbar
            height: '4px',  // For horizontal scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#6b7280', // Adjust the color as needed
            borderRadius: '9999px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1', // Adjust the track color as needed
          },
        },
      });
    },
  ],
}
