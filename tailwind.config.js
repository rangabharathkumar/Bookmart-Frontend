/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Royal Tech Glow Palette - 2025 E-commerce
                // Primary: Electric Indigo (Brand, CTAs, Interactive Elements)
                primary: {
                    50: '#f0f0ff',
                    100: '#e5e5ff',
                    200: '#d0d0ff',
                    300: '#b3b3ff',
                    400: '#8a8aff',
                    500: '#5D5FEF', // Main Electric Indigo
                    600: '#4a4cd9',
                    700: '#3a3cb8',
                    800: '#2d2e94',
                    900: '#252678',
                    950: '#181947',
                },
                // Accent: Premium Gold (Highlights, Badges, CTAs)
                accent: {
                    50: '#fffbeb',
                    100: '#fff4c6',
                    200: '#ffe888',
                    300: '#ffd64a',
                    400: '#ffc520',
                    500: '#FFB800', // Main Premium Gold
                    600: '#e69500',
                    700: '#c27102',
                    800: '#9e5908',
                    900: '#7f4809',
                    950: '#472504',
                },
                // Neutral: Soft Cloud White (Backgrounds, Surfaces)
                neutral: {
                    50: '#F3F5FA', // Main Soft Cloud White
                    100: '#e8ebf3',
                    200: '#d6dbe9',
                    300: '#b8c1d9',
                    400: '#95a0c5',
                    500: '#7884b3',
                    600: '#646da3',
                    700: '#575e94',
                    800: '#4a4f7a',
                    900: '#3f4362',
                    950: '#282b3d',
                },
                // Additional semantic colors
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#3b82f6',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'glow': '0 0 30px rgba(93, 95, 239, 0.4)',
                'glow-accent': '0 0 30px rgba(255, 184, 0, 0.4)',
                'glass': '0 8px 32px 0 rgba(93, 95, 239, 0.1)',
                'lift': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'fade-blur-in': 'fade-blur-in 0.5s ease-out',
                'slide-up': 'slide-up 0.5s ease-out',
                'tilt': 'tilt 10s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(93, 95, 239, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(93, 95, 239, 0.8)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                'bounce-in': {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'fade-blur-in': {
                    '0%': { opacity: '0', filter: 'blur(10px)' },
                    '100%': { opacity: '1', filter: 'blur(0)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                tilt: {
                    '0%, 100%': { transform: 'rotate(-1deg)' },
                    '50%': { transform: 'rotate(1deg)' },
                },
            },
        },
    },
    plugins: [],
}
