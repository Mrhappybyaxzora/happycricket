import type { Config } from "tailwind-config"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "ping-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "loading-bar": {
          "0%": { width: "0%", opacity: "0.7" },
          "50%": { opacity: "1" },
          "100%": { width: "100%", opacity: "0.7" },
        },
        "dot-animation": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "blob": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ping-slow": "ping-slow 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "bounce-subtle": "bounce-subtle 1.5s ease-in-out infinite",
        "fade-in": "fade-in 0.8s ease-in forwards",
        "spin-reverse": "spin-reverse 1.5s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "loading-bar": "loading-bar 3s ease-in-out infinite",
        "dot1": "dot-animation 1s ease-in-out 0.1s infinite",
        "dot2": "dot-animation 1s ease-in-out 0.2s infinite",
        "dot3": "dot-animation 1s ease-in-out 0.3s infinite",
        "blob": "blob 7s infinite",
        "slide-up-1": "slide-up 0.4s ease-out 0.1s forwards",
        "slide-up-2": "slide-up 0.4s ease-out 0.15s forwards",
        "slide-up-3": "slide-up 0.4s ease-out 0.2s forwards",
        "slide-up-4": "slide-up 0.4s ease-out 0.25s forwards",
        "slide-up-5": "slide-up 0.4s ease-out 0.3s forwards",
        "slide-up-6": "slide-up 0.4s ease-out 0.35s forwards",
        "slide-up-7": "slide-up 0.4s ease-out 0.4s forwards",
        "slide-up-8": "slide-up 0.4s ease-out 0.45s forwards",
        "slide-up-9": "slide-up 0.4s ease-out 0.5s forwards",
        "slide-up-10": "slide-up 0.4s ease-out 0.55s forwards",
        "slide-up-11": "slide-up 0.4s ease-out 0.6s forwards",
        "slide-up-12": "slide-up 0.4s ease-out 0.65s forwards",
        "slide-up-13": "slide-up 0.4s ease-out 0.7s forwards",
        "slide-up-14": "slide-up 0.4s ease-out 0.75s forwards",
        "slide-up-15": "slide-up 0.4s ease-out 0.8s forwards",
        "slide-up-16": "slide-up 0.4s ease-out 0.85s forwards",
        "slide-up-17": "slide-up 0.4s ease-out 0.9s forwards",
        "slide-up-18": "slide-up 0.4s ease-out 0.95s forwards",
        "slide-up-19": "slide-up 0.4s ease-out 1s forwards",
        "slide-up-20": "slide-up 0.4s ease-out 1.05s forwards",
      },
      transitionDelay: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

