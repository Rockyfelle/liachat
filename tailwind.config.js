module.exports = {
	important: true,
	content: [
		"./resources/**/*.blade.php",
		"./resources/**/*.js",
		"./resources/**/*.vue",
	],
	theme: {
		extend: {
			colors: {
				"cprimary": "#343F3E",
				"csecondary": "#94B0DA",
				"caccent": "#31E981",
				gray: {
					950: "#090D14",
					850: "#1A222E",
					750: "#273445",
					650: "#444D59",
				}
			}
		},
	},
	plugins: [],
}