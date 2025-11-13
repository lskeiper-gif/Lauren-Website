/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ✨ Custom Fonts
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        parisienne: ['"Parisienne"', 'cursive'],
        allura: ['"Allura"', 'cursive'],
        vibes: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'], // fallback body font
      },

      // 🎨 Custom Colors (optional but pretty)
      colors: {
        'indigo-gradient-start': '#6366F1',
        'purple-gradient-end': '#8B5CF6',
      },

      // 🌈 Gradient Background
      backgroundImage: {
        'main-gradient': 'linear-gradient(to bottom right, #6366F1, #8B5CF6)',
      },

      // 🪄 Smooth Transitions
      transitionDuration: {
        400: '400ms',
        800: '800ms',
      },

      // 🕊️ Optional spacing & shadows for consistency
      boxShadow: {
        soft: '0 8px 20px rgba(0, 0, 0, 0.1)',
        glow: '0 0 20px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
};
