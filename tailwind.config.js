/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
			serif: ["Old Standard TT", "serif"],
			sans: ["Chivo Variable", "sans-serif"],
			sansAlt: ["Bungee Hairline", "sans-serif"],
			// display: ["Bungee Shade", "sans-serif"],
			display: ["Bungee Outline", "sans-serif"],
			displayAlt: ["Bungee Hairline", "sans-serif"],
			// sans: ["Manrope Variable", "sans-serif"]
			// sans: ["Barlow", "sans-serif"]
			// sans: ["sans-serif"]
		},
		extend: {}
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: ["dracula"]
	}
};
