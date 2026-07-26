const metisPalette = {
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

const ganymedePalette = {
	cyan: "#00B7ED",
	blue: "#00B7ED",
	yellow: "#FFBA00",
	green: "#F1D677",
	purple: "#F25A55",
	red: "#F25A55",
	orange: "#F25A55",
	pink: "#F5837F",
};

const metisModes = {
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
		accents: Object.assign({}, metisPalette, {
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
		accents: Object.assign({}, metisPalette, {
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

const ganymedeModes = {
	dark: {
		type: "dark",
		colors: {
			backgroundShade: "#022538",
			background: "#093750",
			backgroundElevated: "#0B4867",
			backgroundMuted: "#055682",
			selection: "#1C7DB1",
			foreground: "#DCEBF5",
			foregroundMuted: "#A2D9F5",
			foregroundSubtle: "#1C7DB1",
			border: "#1C7DB1",
			line: "#A2D9F5",
		},
		accents: ganymedePalette,
	},
	light: {
		type: "light",
		colors: {
			backgroundShade: "#D8EEF8",
			background: "#F4FBFE",
			backgroundElevated: "#E7F5FB",
			backgroundMuted: "#CFEAF6",
			selection: "#B4E5F6",
			foreground: "#093750",
			foregroundMuted: "#315B71",
			foregroundSubtle: "#557E92",
			border: "#AED2E3",
			line: "#79AFC9",
		},
		accents: {
			cyan: "#007EA3",
			blue: "#007EA3",
			yellow: "#9E7100",
			green: "#6F641B",
			purple: "#B53331",
			red: "#B53331",
			orange: "#B53331",
			pink: "#B6524F",
		},
	},
};

const metisRoleMap = {
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

const ganymedeRoleMap = {
	syntax: {
		constant: "cyan",
		identifier: "blue",
		statement: "yellow",
		type: "green",
		global: "purple",
		emphasis: "pink",
		special: "orange",
		string: "red",
		regexp: "pink",
		number: "yellow",
		operator: "cyan",
		tag: "blue",
		attribute: "yellow",
		deleted: "red",
		inserted: "green",
		changed: "orange",
	},
	ui: {
		userActionNeeded: "red",
		userCurrentState: "cyan",
	},
};

const variants = {
	metis: {
		name: "Metis",
		slug: "metis",
		palette: metisPalette,
		roles: metisRoleMap,
		modes: metisModes,
	},
	ganymede: {
		name: "Ganymede",
		slug: "ganymede",
		palette: ganymedePalette,
		roles: ganymedeRoleMap,
		modes: ganymedeModes,
	},
};

const makeTheme = (variantSlug, mode) => {
	const variant = variants[variantSlug];
	const source = variant.modes[mode];
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
			userActionNeeded: colors[variant.roles.ui.userActionNeeded],
			userCurrentState: colors[variant.roles.ui.userCurrentState],
		},
		grays,
	);

	const syntaxGroups = {
		constant: colors[variant.roles.syntax.constant],
		identifier: colors[variant.roles.syntax.identifier],
		statement: colors[variant.roles.syntax.statement],
		type: colors[variant.roles.syntax.type],
		global: colors[variant.roles.syntax.global],
		emphasis: colors[variant.roles.syntax.emphasis],
		special: colors[variant.roles.syntax.special],
		string: colors[variant.roles.syntax.string],
		regexp: colors[variant.roles.syntax.regexp],
		number: colors[variant.roles.syntax.number],
		operator: colors[variant.roles.syntax.operator],
		tag: colors[variant.roles.syntax.tag],
		attribute: colors[variant.roles.syntax.attribute],
		trivial: source.colors.foregroundSubtle,
	};

	const versionControlGroups = {
		added: colors[variant.roles.syntax.inserted],
		modified: colors[variant.roles.syntax.changed],
		removed: colors[variant.roles.syntax.deleted],
		renamed: colors[variant.roles.syntax.identifier],
	};
	const accent = (...names) => colors[names.find((name) => colors[name])];

	const ansiGroups = {
		normal: {
			black: uiGroups.background,
			red: accent("red", "orange"),
			green: accent("green", "mint"),
			yellow: accent("amber", "yellow"),
			blue: accent("blue", "cyan"),
			magenta: accent("magenta", "pink", "purple"),
			cyan: accent("cyan", "blue"),
			white: uiGroups.foreground,
		},
		bright: {
			black: uiGroups.foregroundSubtle,
			red: accent("rose", "orange", "red"),
			green: accent("mint", "green"),
			yellow: accent("yellow", "amber"),
			blue: accent("indigo", "blue"),
			magenta: accent("violet", "pink", "purple", "magenta"),
			cyan: accent("cyan", "blue"),
			white: mode === "dark" ? "#F5FAFD" : "#FFFFFF",
		},
	};

	return {
		name: `${variant.name} ${mode.replace(/^./, (letter) => letter.toUpperCase())}`,
		slug: `${variant.slug}-${mode}`,
		variant: variant.slug,
		type: source.type,
		colors,
		grays,
		uiGroups,
		syntaxGroups,
		versionControlGroups,
		ansiGroups,
	};
};

const makeVariantDefinitions = (variantSlug) => {
	const variant = variants[variantSlug];
	const themes = {
		dark: makeTheme(variantSlug, "dark"),
		light: makeTheme(variantSlug, "light"),
	};

	return {
		name: variant.name,
		slug: variant.slug,
		palette: variant.palette,
		roles: variant.roles,
		themes,
	};
};

const metis = makeVariantDefinitions("metis");
const ganymede = makeVariantDefinitions("ganymede");
const dark = metis.themes.dark;
const light = metis.themes.light;

const definitions = {
	name: "Metis",
	slug: "metis",
	version: "3.0.0",
	palette: metis.palette,
	roles: metis.roles,
	variants: {
		metis,
		ganymede,
	},
	themes: metis.themes,
};

module.exports = Object.assign({}, dark, {
	name: "Metis",
	slug: "metis",
	definitions,
	themes: definitions.themes,
	modes: definitions.themes,
	variants: definitions.variants,
	metis,
	ganymede,
	dark,
	light,
});
