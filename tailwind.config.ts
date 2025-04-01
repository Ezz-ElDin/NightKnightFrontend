
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
                story: {
                    // Updated Ghibli-inspired color palette
                    purple: '#6A75B3',     // Softer blue-purple (sky color)
                    lightPurple: '#D4DCFF', // Light sky blue
                    blue: '#74B5BE',       // Ghibli water blue
                    yellow: '#FEF2C8',     // Soft yellow (like Totoro's cream)
                    pink: '#F5CDC9',       // Soft pink (like cherry blossoms)
                    green: '#A3D3AA',      // Soft grass green (Ghibli meadows)
                    orange: '#F5A666',     // Warm sunset orange
                    peach: '#F8DBC9',      // Soft peach (natural tone)
                    brown: '#8A6642',      // Earth brown (forest tones)
                    teal: '#60A9B0',       // Teal (water elements)
                    seafoam: '#B2E0DC',    // Light teal (ocean foam)
                    forest: '#446644',     // Deep forest green
                },
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'wiggle': {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' }
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' }
                },
                'leaf-sway': {
                    '0%, 100%': { transform: 'rotate(-5deg) translateY(0)' },
                    '50%': { transform: 'rotate(5deg) translateY(-5px)' }
                },
                'dust-float': {
                    '0%': { transform: 'translateY(0) translateX(0)', opacity: '0.4' },
                    '50%': { transform: 'translateY(-15px) translateX(5px)', opacity: '0.7' },
                    '100%': { transform: 'translateY(-5px) translateX(10px)', opacity: '0.4' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'wiggle': 'wiggle 2s ease-in-out infinite',
                'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
                'leaf-sway': 'leaf-sway 8s ease-in-out infinite',
                'dust-float': 'dust-float 10s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
