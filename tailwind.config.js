// TODO ceci gaspille completement le design de tous le site
// module.exports = {
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//     screens: {
//       sm: '640px',
//       md: '768px',
//       lg: '1024px',
//       xl: '1280px',
//
//     },
//   },
//   plugins: [],
// };

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'sm': '220px',
      'md': '768px',
      'lg': '1024px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
