// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './store/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF', // Clean White for Skincare
        accent: {
          DEFAULT: '#C5A059', // Luxury Gold/Brass
          light: '#D4AF37',
          dark: '#996515',
          burgundy: '#5A2A3C', // Keeping your original burgundy as a secondary
        },
        gray: {
          50: '#F9F9F9',
          100: '#F2F2F2',
          900: '#1A1A1A',
        }
      },
      fontFamily: {
        // Ensure these match your layout.tsx font variables
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'ultra': '0.4em',
      }
    },
  },
  plugins: [],
}
export default config


