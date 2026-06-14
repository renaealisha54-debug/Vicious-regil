import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Space Grotesk', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: '#14171F',
        foreground: '#E0E0F0',
        card: {
          DEFAULT: '#1C1F2B',
          foreground: '#E0E0F0',
        },
        popover: {
          DEFAULT: '#1C1F2B',
          foreground: '#E0E0F0',
        },
        primary: {
          DEFAULT: '#5E81F3',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#1C1F2B',
          foreground: '#94D4F1',
        },
        muted: {
          DEFAULT: '#252936',
          foreground: '#8E92A4',
        },
        accent: {
          DEFAULT: '#94D4F1',
          foreground: '#14171F',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: '#2A2E3D',
        input: '#2A2E3D',
        ring: '#5E81F3',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
