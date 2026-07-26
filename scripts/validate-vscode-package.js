const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const cwd = path.join(process.cwd(), "vscode");
const packagePath = path.join(cwd, "metis-vscode-theme-3.0.0.vsix");

try {
	const result = spawnSync("npm", ["exec", "--yes", "--", "@vscode/vsce", "package", "--no-dependencies"], {
		cwd,
		stdio: "inherit",
	});

	if (result.status !== 0) {
		process.exit(result.status || 1);
	}
} finally {
	if (fs.existsSync(packagePath)) {
		fs.unlinkSync(packagePath);
	}
}
