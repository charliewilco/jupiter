const palette = {
	cyan: "#00A6D6",
	blue: "#3D8BFF",
	indigo: "#7C83FF",
	violet: "#A774FF",
	magenta: "#D85FAF",
	rose: "#F05F84",
	red: "#E0524D",
	orange: "#E87743",
	amber: "#D99A00",
	yellow: "#D8B92E",
	green: "#62AD58",
	mint: "#3FB997",
};

const modes = {
	dark: {
		type: "dark",
		colors: {
			backgroundShade: "#070B10",
			background: "#0B1117",
			backgroundElevated: "#111A23",
			backgroundMuted: "#182531",
			selection: "#1F5367",
			foreground: "#DCE7EF",
			foregroundMuted: "#AAB8C3",
			foregroundSubtle: "#738492",
			border: "#2A3A47",
			line: "#415466",
		},
		accents: Object.assign({}, palette, {
			cyan: "#43C7E8",
			blue: "#69A7FF",
			indigo: "#9AA2FF",
			violet: "#BC8FFF",
			magenta: "#EF78C4",
			rose: "#FF7698",
			red: "#FF6B62",
			orange: "#FF9159",
			amber: "#F2B339",
			yellow: "#E7CF5B",
			green: "#82C66F",
			mint: "#5DD4AF",
		}),
	},
	light: {
		type: "light",
		colors: {
			backgroundShade: "#DCE8EF",
			background: "#F8FBFD",
			backgroundElevated: "#EEF5F8",
			backgroundMuted: "#DDE8EF",
			selection: "#B9DCE8",
			foreground: "#172530",
			foregroundMuted: "#4A5E6B",
			foregroundSubtle: "#708390",
			border: "#C7D5DE",
			line: "#9DAFBB",
		},
		accents: Object.assign({}, palette, {
			cyan: "#007FA8",
			blue: "#1B67D7",
			indigo: "#555FCE",
			violet: "#7A4BC2",
			magenta: "#AD3E86",
			rose: "#C83C62",
			red: "#B93532",
			orange: "#B85727",
			amber: "#9D7100",
			yellow: "#846F00",
			green: "#3F7F38",
			mint: "#1F876D",
		}),
	},
};

const roleMap = {
	syntax: {
		constant: "cyan",
		identifier: "blue",
		statement: "amber",
		type: "green",
		global: "violet",
		emphasis: "magenta",
		special: "orange",
		string: "mint",
		regexp: "rose",
		number: "yellow",
		operator: "indigo",
		tag: "blue",
		attribute: "cyan",
		deleted: "red",
		inserted: "green",
		changed: "amber",
	},
	ui: {
		userActionNeeded: "red",
		userCurrentState: "cyan",
	},
};

const makeTheme = (name, mode) => {
	const source = modes[mode];
	const colors = source.accents;
	const grays = {
		gray0: source.colors.backgroundShade,
		gray1: source.colors.background,
		gray2: source.colors.backgroundMuted,
		gray3: source.colors.line,
		gray4: source.colors.foregroundSubtle,
		gray5: source.colors.foregroundMuted,
		gray6: source.colors.foreground,
	};

	const uiGroups = Object.assign(
		{
			backgroundShade: source.colors.backgroundShade,
			background: source.colors.background,
			backgroundElevated: source.colors.backgroundElevated,
			backgroundMuted: source.colors.backgroundMuted,
			selection: source.colors.selection,
			foreground: source.colors.foreground,
			foregroundMuted: source.colors.foregroundMuted,
			foregroundSubtle: source.colors.foregroundSubtle,
			border: source.colors.border,
			line: source.colors.line,
			userActionNeeded: colors[roleMap.ui.userActionNeeded],
			userCurrentState: colors[roleMap.ui.userCurrentState],
		},
		grays,
	);

	const syntaxGroups = {
		constant: colors[roleMap.syntax.constant],
		identifier: colors[roleMap.syntax.identifier],
		statement: colors[roleMap.syntax.statement],
		type: colors[roleMap.syntax.type],
		global: colors[roleMap.syntax.global],
		emphasis: colors[roleMap.syntax.emphasis],
		special: colors[roleMap.syntax.special],
		string: colors[roleMap.syntax.string],
		regexp: colors[roleMap.syntax.regexp],
		number: colors[roleMap.syntax.number],
		operator: colors[roleMap.syntax.operator],
		tag: colors[roleMap.syntax.tag],
		attribute: colors[roleMap.syntax.attribute],
		trivial: source.colors.foregroundSubtle,
	};

	const versionControlGroups = {
		added: colors[roleMap.syntax.inserted],
		modified: colors[roleMap.syntax.changed],
		removed: colors[roleMap.syntax.deleted],
		renamed: colors[roleMap.syntax.identifier],
	};

	const ansiGroups = {
		normal: {
			black: uiGroups.background,
			red: colors.red,
			green: colors.green,
			yellow: colors.amber,
			blue: colors.blue,
			magenta: colors.magenta,
			cyan: colors.cyan,
			white: uiGroups.foreground,
		},
		bright: {
			black: uiGroups.foregroundSubtle,
			red: colors.rose,
			green: colors.mint,
			yellow: colors.yellow,
			blue: colors.indigo,
			magenta: colors.violet,
			cyan: colors.cyan,
			white: mode === "dark" ? "#F5FAFD" : "#FFFFFF",
		},
	};

	return {
		name,
		slug: name.toLowerCase().replace(/\s+/g, "-"),
		type: source.type,
		colors,
		grays,
		uiGroups,
		syntaxGroups,
		versionControlGroups,
		ansiGroups,
	};
};

const dark = makeTheme("Metis Dark", "dark");
const light = makeTheme("Metis Light", "light");

const definitions = {
	name: "Metis",
	slug: "metis",
	version: "3.0.0",
	palette,
	roles: roleMap,
	themes: {
		dark,
		light,
	},
};

module.exports = Object.assign({}, dark, {
	name: "Metis",
	slug: "metis",
	definitions,
	themes: definitions.themes,
	modes: definitions.themes,
	dark,
	light,
});
