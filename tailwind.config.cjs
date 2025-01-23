/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			interactive: {
				base: "var(--interactive-base)",
				"base-hover": "var(--interactive-base-hover)",
				accent: "var(--interactive-accent)",
				"accent-hover": "var(--interactive-accent-hover)",
			},
			titlebar: {
				background: "var(--titlebar-background)",
				"background-focused": "var(--titlebar-background-focused)",
				"quit-background": "var(--titlebar-quit-background)",
				"quit-background-focused": "var(--titlebar-quit-background-focused)",
				"icon-color": "var(--titlebar-icon-color)",
				"icon-color-focused": "var(--titlebar-icon-color-focused)",
				"icon-weight": "var(--titlebar-icon-weight)",
			},
			base: {
				0: "var(--base-00)",
				5: "var(--base-05)",
				10: "var(--base-10)",
				15: "var(--base-15)",
				20: "var(--base-20)",
				25: "var(--base-25)",
				30: "var(--base-30)",
				35: "var(--base-35)",
				40: "var(--base-40)",
				45: "var(--base-45)",
				50: "var(--base-50)",
				60: "var(--base-60)",
				70: "var(--base-70)",
				80: "var(--base-80)",
				90: "var(--base-90)",
				100: "var(--base-100)",
			},
			warning: {
				1000: "var(--warning-1000)",
				900: "var(--warning-900)",
				800: "var(--warning-800)",
				700: "var(--warning-700)",
				600: "var(--warning-600)",
				500: "var(--warning-500)",
				400: "var(--warning-400)",
			},
			destructive: {
				1000: "var(--destructive-1000)",
				900: "var(--destructive-900)",
				800: "var(--destructive-800)",
				700: "var(--destructive-700)",
				600: "var(--destructive-600)",
				500: "var(--destructive-500)",
				400: "var(--destructive-400)",
			},
			success: {
				1000: "var(--success-1000)",
				900: "var(--success-900)",
				800: "var(--success-800)",
				700: "var(--success-700)",
				600: "var(--success-600)",
				500: "var(--success-500)",
				400: "var(--success-400)",
			},
			text: {},
			link: {
				color: "var(--link-color)",
				"color-hover": "var(--link-color-hover)",
				"external-color": "var(--link-external-color)",
				"external-color-hover": "var(--link-external-color-hover)",
			},
			tag: {
				color: "var(--tag-color)",
				"color-hover": "var(--tag-color-hover)",
				background: "var(--tag-background)",
				"background-hover": "var(--tag-background-hover)",
				"border-width": "var(--tag-border-width)",
				"border-color": "var(--tag-border-color)",
				"border-hover": "var(--tag-border-hover)",
			},
		},

		borderRadius: {
			"radius-sm": "var(--radius-sm)",
			"radius-md": "var(--radius-md)",
			"radius-lg": "var(--radius-lg)",
			"radius-xl": "var(--radius-xl)",
			"radius-full": "var(--radius-full)",
		},
		boxShadow: {
			"input-shadow-1": "var(--input-shadow-1)",
			"input-shadow-2": "var(--input-shadow-2)",
			"shadow-smooth": "var(--shadow-smooth)",
			"shadow-deep": "var(--shadow-deep)",
		},
		fontSize: {
			"fs-xs": "var(--font-xs)",
			"fs-sm": "var(--font-sm)",
			"fs-md": "var(--font-md)",
			"fs-lg": "var(--font-lg)",
			"fs-xl": "var(--font-xl)",
			"fs-2xl": "var(--font-2xl)",
			"fs-3xl": "var(--font-3xl)",
			"fs-4xl": "var(--font-4xl)",
			"fs-5xl": "var(--font-5xl)",
			"fs-6xl": "var(--font-6xl)",
		},
		fontFamily: {
			"family-primary": "var(--font-primary)",
			"family-secondary": "var(--font-secondary)",
			"family-tertiary": "var(--font-tertiary)",
		},
		fontWeight: {
			"weight-xl": "var(--font-weight-xl)",
			"weight-lg": "var(--font-weight-lg)",
			"weight-md": "var(--font-weight-md)",
			"weight-sm": "var(--font-weight-sm)",
		},
		zIndex: {
			"layer-background": "var(--layer-background)",
			"layer-sidebar": "var(--layer-sidebar)",
			"layer-header": "var(--layer-header)",
			"layer-popup": "var(--layer-popup)",
			"layer-content": "var(--layer-content)",
			"layer-modal": "var(--layer-modal)",
			"layer-notification": "var(--layer-notification)",
			"layer-menu": "var(--layer-menu)",
			"layer-tooltip": "var(--layer-tooltip)",
			"layer-dragging": "var(--layer-dragging)",
			"layer-splash": "var(--layer-splash)",
			"layer-native": "var(--layer-native)",
			"layer-titlebar": "var(--layer-titlebar)",
			"layer-titlebar-buttons": "var(--layer-titlebar-buttons)",
		},
		extend: {
			colors: {
				primary: "var(--background-primary)",
				"primary-alt": "var(--background-primary-alt)",
				secondary: "var(--background-secondary)",
				"secondary-alt": "var(--background-secondary-alt)",
				"modifier-primary-form-field": "var(--background-modifier-primary-form-field)",
				"modifier-secondary-form-field": "var(--background-modifier-secondary-form-field)",
				"modifier-border-width": "var(--background-modifier-border-width)",
				"modifier-border-color": "var(--background-modifier-border-color)",
				"modifier-border-hover": "var(--background-modifier-border-hover)",
				"modifier-border-focus": "var(--background-modifier-border-focus)",
				"modifier-box-shadow": "var(--background-modifier-box-shadow)",
				"modifier-error": "var(--background-modifier-error)",
				"modifier-error-hover": "var(--background-modifier-error-hover)",
				"modifier-success": "var(--background-modifier-success)",
			},
			backgroundImage: {
				"modifier-gradient-1": "var(--background-modifier-gradient-1)",
			},
			screens: {
				"media-min-w-300": "300px",
				"media-min-w-350": "350px",
				"media-min-w-400": "400px",
				"media-min-w-450": "450px",
				"media-min-w-500": "500px",
				"media-min-w-550": "550px",
				"media-min-w-600": "600px",
				"media-min-h-500": { raw: "(min-height: 500px)" },
				"media-min-h-550": { raw: "(min-height: 550px)" },
				"media-min-h-600": { raw: "(min-height: 600px)" },
				"media-min-h-650": { raw: "(min-height: 650px)" },
				"media-min-h-700": { raw: "(min-height: 700px)" },
				"media-min-h-750": { raw: "(min-height: 750px)" },
				"media-min-h-800": { raw: "(min-height: 800px)" },
				"media-min-h-850": { raw: "(min-height: 850px)" },
				"media-min-h-900": { raw: "(min-height: 900px)" },
				"media-min-h-950": { raw: "(min-height: 950px)" },
				"media-min-h-1000": { raw: "(min-height: 1000px)" },
			},
			textColor: {
				normal: "var(--text-normal)",
				muted: "var(--text-muted)",
				faint: "var(--text-faint)",
				"on-accent": "var(--text-on-accent)",
				"on-accent-inverted": "var(--text-on-accent-inverted)",
				error: "var(--text-error)",
				warning: "var(--text-warning)",
				success: "var(--text-success)",
				accent: "var(--text-accent)",
				"accent-hover": "var(--text-accent-hover)",
				"form-placeholder": "var(--text-form-placeholder)",
			},
			fill: {
				normal: "var(--text-normal)",
				muted: "var(--text-muted)",
				faint: "var(--text-faint)",
				"on-accent": "var(--text-on-accent)",
				"on-accent-inverted": "var(--text-on-accent-inverted)",
				error: "var(--text-error)",
				warning: "var(--text-warning)",
				success: "var(--text-success)",
				accent: "var(--text-accent)",
				"accent-hover": "var(--text-accent-hover)",
				"form-placeholder": "var(--text-form-placeholder)",
			},
			border: {
				"border-width": "var(--border-width)",
			},
			width: {
				"icon-size-sm": "var(--icon-size-sm)",
				"icon-size-md": "var(--icon-size-md)",
				"icon-size-lg": "var(--icon-size-lg)",
			},
			height: {
				"icon-size-sm": "var(--icon-size-sm)",
				"icon-size-md": "var(--icon-size-md)",
				"icon-size-lg": "var(--icon-size-lg)",
			},
		},
	},
	plugins: [
		plugin(function ({ addBase }) {
			addBase({
				":root": {
					"--rgb-none": "rgb(0, 0, 0)",
					"--rgb-full": "rgb(255, 255, 255)",

					//base
					"--base-00": "rgb(0, 0, 0)",
					"--base-05": "rgb(14, 14, 14)",
					"--base-10": "rgb(19, 19, 19)",
					"--base-15": "rgb(22, 22, 22)",
					"--base-20": "rgb(25, 25, 25)",
					"--base-25": "rgb(31, 31, 31)",
					"--base-30": "rgb(37, 37, 37)",
					"--base-35": "rgb(51, 51, 51)",
					"--base-40": "rgb(61, 61, 61)",
					"--base-45": "rgb(72, 72, 72)",
					"--base-50": "rgb(82, 82, 82)",
					"--base-60": "rgb(99, 99, 99)",
					"--base-70": "rgb(179, 179, 179)",
					"--base-80": "rgb(191, 191, 191)",
					"--base-90": "rgb(204, 204, 204)",
					"--base-100": "rgb(218, 218, 218)",

					"--warning-1000": "hsl(33, 100%, 10%)",
					"--warning-900": "hsl(35, 100%, 15%)",
					"--warning-800": "hsl(37, 100%, 27%)",
					"--warning-700": "hsl(38.9, 100%, 39.9%)",
					"--warning-600": "hsl(38.9, 100%, 55%)",
					"--warning-500": "hsl(38.9, 100%, 62%)",
					"--warning-400": "hsl(39, 100%, 72%)",

					"--destructive-1000": "hsl(7, 80%, 10%)",
					"--destructive-900": "hsl(8, 75%, 15%)",
					"--destructive-800": "hsl(8, 70%, 20%)",
					"--destructive-700": "hsl(9, 65%, 30%)",
					"--destructive-600": "hsl(10, 60%, 40%)",
					"--destructive-500": "hsl(10, 60%, 51%)",
					"--destructive-400": "hsl(10, 70%, 60%)",

					"--success-1000": "hsl(141, 20%, 5%)",
					"--success-900": "hsl(141, 25%, 10%)",
					"--success-800": "hsl(141, 30%, 20%)",
					"--success-700": "hsl(141, 35%, 30%)",
					"--success-600": "hsl(141, 40%, 40%)",
					"--success-500": "hsl(141, 45%, 52%)",
					"--success-400": "hsl(141, 50%, 60%)",

					"color-scheme": "dark",
					"--accent-h": "259",
					"--accent-s": "51%",
					"--accent-l": "45%",

					"--color-accent-hsl": "var(--accent-h), var(--accent-s), var(--accent-l)",
					"--color-accent": "hsl(var(--color-accent-hsl))",
					"--color-accent-1":
						"hsl(calc(var(--accent-h) - 3), calc(var(--accent-s) * 1.07), calc(var(--accent-l) * 1.14))",
					"--color-accent-2":
						"hsl(calc(var(--accent-h) - 5), calc(var(--accent-s) * 1.20), calc(var(--accent-l) * 1.25))",

					"--interactive-base": "var(--base-25)",
					"--interactive-base-hover": "var(--base-30)",
					"--interactive-accent-hsl": "var(--color-accent-hsl)",
					"--interactive-accent": "var(--color-accent-1)",
					"--interactive-accent-hover": "var(--color-accent-2)",

					"--border-width": "1px",

					"--background-primary": "var(--base-00)",
					"--background-primary-alt": "var(--base-10)",
					"--background-secondary": "var(--base-15)",
					"--background-secondary-alt": "var(--base-20)",
					"--background-modifier-gradient-1":
						"linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,0))",
					"--background-modifier-primary-form-field": "var(--base-10)",
					"--background-modifier-secondary-form-field": "var(--base-25)",
					"--background-modifier-border-width": "var(--border-width)",
					"--background-modifier-border-color": "var(--base-30)",
					"--background-modifier-border-hover": "var(--base-35)",
					"--background-modifier-border-focus": "var(--base-40)",
					"--background-modifier-box-shadow": "rgba(0, 0, 0, 0.254)",
					"--background-modifier-error-hsl": "var(--destructive-500)",
					"--background-modifier-error": "var(--background-modifier-error-hsl)",
					"--background-modifier-error-hover": "var(--destructive-400)", // might change to 500 idk.
					"--background-modifier-success-hsl": "var(--success-500)",
					"--background-modifier-success": "var(--background-modifier-success-hsl)",

					"--text-normal": "var(--base-90)",
					"--text-muted": "var(--base-60)",
					"--text-faint": "var(--base-40)",
					"--text-on-accent": "var(--rgb-full)",
					"--text-on-accent-inverted": "var(--rgb-none)",
					"--text-error": "var(--destructive-500)",
					"--text-warning": "var(--warning-600)",
					"--text-success": "var(--success-600)",
					"--text-accent": "var(--color-accent-1)",
					"--text-accent-hover": "var(--color-accent-2)",
					"--text-form-placeholder": "var(--text-faint)",

					"--link-color": "var(--text-accent)",
					"--link-color-hover": "var(--text-accent-hover)",
					"--link-external-color": "var(--text-accent)",
					"--link-external-color-hover": "var(--text-accent-hover)",

					"--line-height-base": "1.5",
					"--line-height-tight": "1.27",

					"--modal-overlay-background": "var(--background-primary)",
					"--modal-background": "var(--background-primary-alt)",
					"--modal-border-width": "var(--border-width)",
					"--modal-border-color": "var(--base-30)",
					// "--modal-mobile-sidebar-width": "280px",

					"--tag-color": "var(--text-accent)",
					"--tag-color-hover": "var(--text-accent-hover)",
					"--tag-background": "hsla(var(--interactive-accent-hsl), 0.1)",
					"--tag-background-hover": "hsla(var(--interactive-accent-hsl), 0.2)",
					"--tag-border-width": "var(--border-width)",
					"--tag-border-color": "var(--text-accent)",
					"--tag-border-hover": "var(--text-accent-hover)",

					"--titlebar-background": "var(--base-35)",
					"--titlebar-background-focused": "var(--base-60)",
					"--titlebar-quit-background": "var(--destructive-600)",
					"--titlebar-quit-background-focused": "var(--destructive-600)",
					"--titlebar-icon-color": "var(--text-normal)",

					// fontfamilies
					"--font-primary": '"Satoshi-Variable", sans-serif',
					"--font-secondary": '"Roboto", sans-serif',
					"--font-tertiary": '"Nunito Sans", sans-serif',

					// fontweight
					"--font-weight-sm": "400",
					"--font-weight-md": "500",
					"--font-weight-lg": "600",
					"--font-weight-xl": "700",

					// fontsize
					"--font-xs": "12px",
					"--font-sm": "13px",
					"--font-md": "15px",
					"--font-lg": "17px",
					"--font-xl": "21px",
					"--font-2xl": "26px",
					"--font-3xl": "36px",
					"--font-4xl": "46px",
					"--font-5xl": "54px",
					"--font-6xl": "62px",

					//radius
					"--radius-sm": "3px",
					"--radius-md": "7px",
					"--radius-lg": "11px",
					"--radius-xl": "15px",
					"--radius-full": "6.66rem",

					//zindex
					"--layer-background": "1",
					"--layer-sidebar": "10",
					"--layer-header": "20",
					"--layer-popup": "30",
					"--layer-content": "40",
					"--layer-modal": "50",
					"--layer-notification": "60",
					"--layer-menu": "65",
					"--layer-tooltip": "70",
					"--layer-dragging": "80",
					"--layer-splash": "85",
					"--layer-native": "90",
					"--layer-titlebar": "95",
					"--layer-titlebar-buttons": "100",

					"--input-shadow-1":
						"inset 0 0.4px 0.5px 0.4px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.16), 0 1px 1.6px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.22), 0 0 0 0 transparent",
					"--input-shadow-2":
						"inset 0 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.09), 0 2px 4px 0 rgba(0, 0, 0, .15), 0 1px 1.5px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .2), 0 0 0 0 transparent",
					"--shadow-smooth":
						"0 0.5px 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.2)",
					"--shadow-deep":
						"0 2px 6px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.3)",

					// icon
					"--icon-size-sm": "15px",
					"--icon-size-md": "24px",
					"--icon-size-lg": "28px",
				},
			});
		}),
	],
};
