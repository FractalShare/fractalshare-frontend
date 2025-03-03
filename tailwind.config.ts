import type { Config } from "tailwindcss";
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:   'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
      },
      keyframes: {
        'spin-slow': {
          '0%':   { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'swing': {
          '0%':   { transform: 'rotateZ(0deg)' },
          '50%':  { transform: 'rotateZ(-7deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 1s linear infinite',
        'swing': 'swing 1s ease-in-out infinite',
      },
    },
  },
plugins: [scrollbarHide],
} satisfies Config;
