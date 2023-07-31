/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
			serif: ["Old Standard TT", "serif"],
			sans: ["Manrope Variable", "sans-serif"]
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
