/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        lockPulse: {
          '0%, 100%': { transform: 'translateX(-50%) scale(1)' },
          '50%': { transform: 'translateX(-50%) scale(1.05)' },
        },
        glow: {
          '0%': { transform: 'scale(1)', opacity: '0.3' },
          '100%': { transform: 'scale(1.1)', opacity: '0.5' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        lockPulse: 'lockPulse 1.6s ease-in-out infinite',
        glow: 'glow 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
