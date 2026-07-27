const metisPalette = {
	cyan: "#00B2DF",
	blue: "#168BC1",
	indigo: "#557DBD",
	violet: "#746FBB",
	magenta: "#BF6573",
	rose: "#D96D66",
	red: "#D8524B",
	orange: "#D96F42",
	amber: "#C78C00",
	yellow: "#C7AB28",
	green: "#9FA95A",
	mint: "#46A991",
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

const callistoPalette = {
	cyan: "#00C7F2",
	blue: "#4C86F7",
	indigo: "#7168F2",
	violet: "#9C57E8",
	magenta: "#D94FC4",
	rose: "#F04D81",
	red: "#F24A55",
	orange: "#F06D2E",
	amber: "#D88E00",
	yellow: "#D5B72E",
	green: "#72B846",
	mint: "#21B993",
};

const europaPalette = {
	cyan: "#8ED8E8",
	blue: "#7FAFE4",
	indigo: "#8B93D9",
	violet: "#A58AD1",
	magenta: "#C982B3",
	rose: "#D77F8A",
	red: "#C95C4E",
	orange: "#C9783F",
	amber: "#B88F42",
	yellow: "#C7B66A",
	green: "#98B878",
	mint: "#78BFAE",
};

const metisModes = {
	dark: {
		type: "dark",
		colors: {
			backgroundShade: "#041D2B",
			background: "#082D42",
			backgroundElevated: "#0B3A54",
			backgroundMuted: "#104B68",
			selection: "#176F96",
			foreground: "#DCEBF5",
			foregroundMuted: "#9CCFE7",
			foregroundSubtle: "#6096B2",
			border: "#2E6D8A",
			line: "#80B8D2",
		},
		accents: Object.assign({}, metisPalette, {
			cyan: "#38C2E6",
			blue: "#2DA8D8",
			indigo: "#6A9BD8",
			violet: "#8C8CD7",
			magenta: "#DD747D",
			rose: "#F07D75",
			red: "#F25F57",
			orange: "#F47B4F",
			amber: "#F0A818",
			yellow: "#EFC852",
			green: "#C7C46B",
			mint: "#6BC7B5",
		}),
	},
	light: {
		type: "light",
		colors: {
			backgroundShade: "#DDEFF7",
			background: "#F7FCFE",
			backgroundElevated: "#ECF7FC",
			backgroundMuted: "#D5EDF7",
			selection: "#BAE8F6",
			foreground: "#0B2F44",
			foregroundMuted: "#335F74",
			foregroundSubtle: "#5C8396",
			border: "#B9D8E6",
			line: "#82B6CE",
		},
		accents: Object.assign({}, metisPalette, {
			cyan: "#007FA3",
			blue: "#0877A8",
			indigo: "#4A6FA5",
			violet: "#675FA3",
			magenta: "#A84D5E",
			rose: "#B85752",
			red: "#B73D38",
			orange: "#B75B31",
			amber: "#946E00",
			yellow: "#836F0A",
			green: "#74772E",
			mint: "#27826F",
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

const callistoModes = {
	dark: {
		type: "dark",
		colors: {
			backgroundShade: "#03060B",
			background: "#070B12",
			backgroundElevated: "#0D1320",
			backgroundMuted: "#151E2D",
			selection: "#263D66",
			foreground: "#E8EEF8",
			foregroundMuted: "#B0BED3",
			foregroundSubtle: "#667890",
			border: "#253349",
			line: "#566987",
		},
		accents: Object.assign({}, callistoPalette, {
			cyan: "#1BD7FF",
			blue: "#6A9BFF",
			indigo: "#8A7DFF",
			violet: "#B46AFF",
			magenta: "#F05ADB",
			rose: "#FF5D91",
			red: "#FF5662",
			orange: "#FF853B",
			amber: "#FFAD13",
			yellow: "#F6D950",
			green: "#8CDD57",
			mint: "#37D8AE",
		}),
	},
	light: {
		type: "light",
		colors: {
			backgroundShade: "#DCE4EF",
			background: "#F2F6FB",
			backgroundElevated: "#E8EEF7",
			backgroundMuted: "#D7E1ED",
			selection: "#B6C8E8",
			foreground: "#111B2A",
			foregroundMuted: "#40516A",
			foregroundSubtle: "#66748A",
			border: "#B5C1D1",
			line: "#7F90AA",
		},
		accents: Object.assign({}, callistoPalette, {
			cyan: "#007EA0",
			blue: "#285FC5",
			indigo: "#5149B7",
			violet: "#7636A8",
			magenta: "#A93494",
			rose: "#B93663",
			red: "#B9353F",
			orange: "#B85220",
			amber: "#8F6100",
			yellow: "#786500",
			green: "#4F7D25",
			mint: "#168065",
		}),
	},
};

const europaModes = {
	dark: {
		type: "dark",
		colors: {
			backgroundShade: "#071017",
			background: "#0D1A24",
			backgroundElevated: "#142532",
			backgroundMuted: "#203342",
			selection: "#34576B",
			foreground: "#E7EEF2",
			foregroundMuted: "#BAC9D0",
			foregroundSubtle: "#7F98A4",
			border: "#3B5360",
			line: "#7893A0",
		},
		accents: Object.assign({}, europaPalette, {
			cyan: "#A6E8F4",
			blue: "#93C7F5",
			indigo: "#A9ADF6",
			violet: "#C2A6F0",
			magenta: "#E79BD0",
			rose: "#F29BA4",
			red: "#E57965",
			orange: "#E69554",
			amber: "#D9B35F",
			yellow: "#E3D789",
			green: "#B7D694",
			mint: "#93DBC9",
		}),
	},
	light: {
		type: "light",
		colors: {
			backgroundShade: "#DDE9ED",
			background: "#F8FBFC",
			backgroundElevated: "#EEF5F7",
			backgroundMuted: "#DCE9ED",
			selection: "#C3DDE6",
			foreground: "#172B35",
			foregroundMuted: "#4D6571",
			foregroundSubtle: "#78909A",
			border: "#C0D0D6",
			line: "#8EA5AE",
		},
		accents: Object.assign({}, europaPalette, {
			cyan: "#4B8FA0",
			blue: "#4779B1",
			indigo: "#656CAD",
			violet: "#7B62A2",
			magenta: "#985F86",
			rose: "#A85E68",
			red: "#9E483E",
			orange: "#9F5C2D",
			amber: "#80652F",
			yellow: "#726A35",
			green: "#617A43",
			mint: "#4D8377",
		}),
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

const callistoRoleMap = {
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

const europaRoleMap = {
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
	callisto: {
		name: "Callisto",
		slug: "callisto",
		palette: callistoPalette,
		roles: callistoRoleMap,
		modes: callistoModes,
	},
	europa: {
		name: "Europa",
		slug: "europa",
		palette: europaPalette,
		roles: europaRoleMap,
		modes: europaModes,
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
const callisto = makeVariantDefinitions("callisto");
const europa = makeVariantDefinitions("europa");
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
		callisto,
		europa,
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
	callisto,
	europa,
	dark,
	light,
});
