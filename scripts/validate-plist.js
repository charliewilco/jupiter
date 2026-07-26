const { spawnSync } = require("child_process");

const source = `
import plistlib

for file in [
    "iterm/Metis Dark.itermcolors",
    "iterm/Metis Light.itermcolors",
    "xcode/Metis Dark.xccolortheme",
    "xcode/Metis Light.xccolortheme",
]:
    with open(file, "rb") as handle:
        plistlib.load(handle)
`;

const result = spawnSync("python3", ["-c", source], { stdio: "inherit" });

if (result.status !== 0) {
	process.exit(result.status || 1);
}
