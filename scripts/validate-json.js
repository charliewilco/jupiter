const fs = require("fs");

const files = [
  "definitions/metis.json",
  "shiki/metis-dark.json",
  "shiki/metis-light.json",
  "vscode/package.json",
  "vscode/themes/metis-dark-color-theme.json",
  "vscode/themes/metis-light-color-theme.json"
];

for (const file of files) {
  JSON.parse(fs.readFileSync(file, "utf8"));
}
