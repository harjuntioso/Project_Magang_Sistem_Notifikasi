 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 
          light: '#e0f2f7', 
          DEFAULT: '#0284c7', 
          dark: '#0c4a6e', 
        },
        secondary: { 
          light: '#ecfdf5',
          DEFAULT: '#10b981',
          dark: '#065f46',
        },
        accent: { 
          light: '#f3e8ff',
          DEFAULT: '#9333ea',
          dark: '#581c87',
        },
        muted: { 
          light: '#f3f4f6',
          DEFAULT: '#6b7280',
          dark: '#374151',
        },
        info: { 
          light: '#fffbeb',
          DEFAULT: '#f59e0b',
          dark: '#b45309',
        },
        
      },
    },
  },
  plugins: [],
}