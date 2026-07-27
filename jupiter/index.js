const metisPalette = {
	cyan: "#00A7CF",
	blue: "#3A84F6",
	indigo: "#777CFA",
	violet: "#9D69F2",
	magenta: "#D455A7",
	rose: "#E95778",
	red: "#DE4D47",
	orange: "#E16B35",
	amber: "#CC8D00",
	yellow: "#CDAE22",
	green: "#5FA953",
	mint: "#39AD8D",
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
			background: "#0C1218",
			backgroundElevated: "#131D26",
			backgroundMuted: "#1B2834",
			selection: "#24596F",
			foreground: "#E1EBF2",
			foregroundMuted: "#AFBBC4",
			foregroundSubtle: "#7A8B98",
			border: "#30424F",
			line: "#4A5D6E",
		},
		accents: Object.assign({}, metisPalette, {
			cyan: "#4ACDEB",
			blue: "#70A8FF",
			indigo: "#9B9FFF",
			violet: "#B987FF",
			magenta: "#EB70BE",
			rose: "#FF7795",
			red: "#FF665D",
			orange: "#FF8B4C",
			amber: "#F0AD2E",
			yellow: "#E7C951",
			green: "#7FC86B",
			mint: "#58D0A8",
		}),
	},
	light: {
		type: "light",
		colors: {
			backgroundShade: "#E3ECF2",
			background: "#F7FAFC",
			backgroundElevated: "#EDF4F8",
			backgroundMuted: "#DCE7EE",
			selection: "#B8DAE6",
			foreground: "#172631",
			foregroundMuted: "#4B6070",
			foregroundSubtle: "#718493",
			border: "#C5D4DE",
			line: "#9BACB9",
		},
		accents: Object.assign({}, metisPalette, {
			cyan: "#007E9F",
			blue: "#1A63C9",
			indigo: "#515ABD",
			violet: "#7446B0",
			magenta: "#A83B80",
			rose: "#BF385B",
			red: "#AE3431",
			orange: "#A84F22",
			amber: "#8F6800",
			yellow: "#776700",
			green: "#397735",
			mint: "#1C7E67",
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
	name: "Jupiter",
	slug: "jupiter",
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
	name: "Jupiter",
	slug: "jupiter",
	defaultVariant: "metis",
	definitions,
	themes: definitions.themes,
	modes: definitions.themes,
	variants: definitions.variants,
	metis,
	ganymede,
	dark,
	light,
});
