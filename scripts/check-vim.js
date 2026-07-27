const { spawnSync } = require("child_process");

const variants = ["metis", "ganymede", "callisto", "europa"];
const modes = ["dark", "light"];

for (const variant of variants) {
	for (const mode of modes) {
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
				`set background=${mode}`,
				"-c",
				`colorscheme ${variant}`,
				"-c",
				"qa!",
			],
			{ stdio: "inherit" },
		);

		if (result.status !== 0) {
			process.exit(result.status || 1);
		}
	}
}
