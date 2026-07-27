const path = require("path");
const { spawnSync } = require("child_process");

const testFile = path.join(process.cwd(), "test/vim/jupiter.vim");
const testRuntimePath = path.join(process.cwd(), "test/vim");
const result = spawnSync(
	"vim",
	[
		"--clean",
		"-Nu",
		"NONE",
		"-n",
		"-es",
		"-c",
		`set runtimepath^=${process.cwd()}`,
		"-c",
		`set runtimepath^=${testRuntimePath}`,
		"-S",
		testFile,
	],
	{
		stdio: "inherit",
	},
);

if (result.status !== 0) {
	process.exit(result.status || 1);
}
