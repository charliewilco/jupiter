const fs = require("fs");

const files = [
	"codex/ganymede-dark.json",
	"codex/ganymede-light.json",
	"codex/metis-dark.json",
	"codex/metis-light.json",
	"definitions/jupiter.json",
	"shiki/ganymede-dark.json",
	"shiki/ganymede-light.json",
	"shiki/metis-dark.json",
	"shiki/metis-light.json",
	"vscode/package.json",
	"vscode/themes/ganymede-dark-color-theme.json",
	"vscode/themes/ganymede-light-color-theme.json",
	"vscode/themes/metis-dark-color-theme.json",
	"vscode/themes/metis-light-color-theme.json",
];

for (const file of files) {
	JSON.parse(fs.readFileSync(file, "utf8"));
}
