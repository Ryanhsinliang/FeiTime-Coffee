/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        wenkai: ['"LXGW WenKai TC"', 'sans-serif'], // font-wenkai
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'], // font-sans
        shizuru: ['"Shizuru"'], // font-shizuru
        cactus: ['"Cactus Classical Serif"', 'serif'], // font-cactus
        notoserif: ['"Noto Serif TC"', 'serif'], // font-notoserif
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'ecg-pulse': {
          '0%': { strokeDashoffset: '400' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
        'ecg-pulse': 'ecg-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
