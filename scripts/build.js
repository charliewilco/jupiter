const fs = require("fs");
const path = require("path");
const Jupiter = require("../jupiter");

const root = path.resolve(__dirname, "..");
const checkOnly = process.argv.includes("--check");
const generated = [];

const files = {
	codexDark: "codex/metis-dark.json",
	codexCallistoDark: "codex/callisto-dark.json",
	codexCallistoLight: "codex/callisto-light.json",
	codexEuropaDark: "codex/europa-dark.json",
	codexEuropaLight: "codex/europa-light.json",
	codexGanymedeDark: "codex/ganymede-dark.json",
	codexGanymedeLight: "codex/ganymede-light.json",
	codexLight: "codex/metis-light.json",
	definitions: "definitions/jupiter.json",
	docsDefinitions: "docs/definitions/jupiter.json",
	docsPrism: "docs/prismjs/jupiter.css",
	ghosttyCallistoDark: "ghostty/callisto-dark",
	ghosttyCallistoLight: "ghostty/callisto-light",
	ghosttyEuropaDark: "ghostty/europa-dark",
	ghosttyEuropaLight: "ghostty/europa-light",
	ghosttyGanymedeDark: "ghostty/ganymede-dark",
	ghosttyGanymedeLight: "ghostty/ganymede-light",
	itermCallistoDark: "iterm/Callisto Dark.itermcolors",
	itermCallistoLight: "iterm/Callisto Light.itermcolors",
	itermEuropaDark: "iterm/Europa Dark.itermcolors",
	itermEuropaLight: "iterm/Europa Light.itermcolors",
	itermGanymedeDark: "iterm/Ganymede Dark.itermcolors",
	itermGanymedeLight: "iterm/Ganymede Light.itermcolors",
	shikiDark: "shiki/metis-dark.json",
	shikiCallistoDark: "shiki/callisto-dark.json",
	shikiCallistoLight: "shiki/callisto-light.json",
	shikiEuropaDark: "shiki/europa-dark.json",
	shikiEuropaLight: "shiki/europa-light.json",
	shikiGanymedeDark: "shiki/ganymede-dark.json",
	shikiGanymedeLight: "shiki/ganymede-light.json",
	shikiLight: "shiki/metis-light.json",
	prism: "prismjs/jupiter.css",
	vimJupiter: "colors/jupiter.vim",
	vim: "colors/metis.vim",
	vimCallisto: "colors/callisto.vim",
	vimEuropa: "colors/europa.vim",
	vimGanymede: "colors/ganymede.vim",
	vimAirlineJupiter: "autoload/airline/themes/jupiter.vim",
	vimAirline: "autoload/airline/themes/metis.vim",
	vimAirlineCallisto: "autoload/airline/themes/callisto.vim",
	vimAirlineEuropa: "autoload/airline/themes/europa.vim",
	vimAirlineGanymede: "autoload/airline/themes/ganymede.vim",
	ghosttyDark: "ghostty/metis-dark",
	ghosttyLight: "ghostty/metis-light",
	itermDark: "iterm/Metis Dark.itermcolors",
	itermLight: "iterm/Metis Light.itermcolors",
	xcodeCallistoDark: "xcode/Callisto Dark.xccolortheme",
	xcodeCallistoLight: "xcode/Callisto Light.xccolortheme",
	xcodeEuropaDark: "xcode/Europa Dark.xccolortheme",
	xcodeEuropaLight: "xcode/Europa Light.xccolortheme",
	xcodeDark: "xcode/Metis Dark.xccolortheme",
	xcodeGanymedeDark: "xcode/Ganymede Dark.xccolortheme",
	xcodeGanymedeLight: "xcode/Ganymede Light.xccolortheme",
	xcodeLight: "xcode/Metis Light.xccolortheme",
	vscodeCallistoDark: "vscode/themes/callisto-dark-color-theme.json",
	vscodeCallistoLight: "vscode/themes/callisto-light-color-theme.json",
	vscodeEuropaDark: "vscode/themes/europa-dark-color-theme.json",
	vscodeEuropaLight: "vscode/themes/europa-light-color-theme.json",
	vscodeDark: "vscode/themes/metis-dark-color-theme.json",
	vscodeGanymedeDark: "vscode/themes/ganymede-dark-color-theme.json",
	vscodeGanymedeLight: "vscode/themes/ganymede-light-color-theme.json",
	vscodeLight: "vscode/themes/metis-light-color-theme.json",
	vscodePackage: "vscode/package.json",
	vscodeLicense: "vscode/LICENSE",
};

const tokenScopes = [
	{
		name: "Comment",
		scope: ["comment", "punctuation.definition.comment"],
		role: "trivial",
		fontStyle: "italic",
	},
	{
		name: "String",
		scope: ["string", "constant.other.symbol", "constant.other.key"],
		role: "string",
	},
	{
		name: "Number",
		scope: ["constant.numeric", "constant.language.boolean", "constant.language.null"],
		role: "number",
	},
	{
		name: "Keyword",
		scope: ["keyword", "storage.type", "storage.modifier"],
		role: "statement",
	},
	{
		name: "Operator",
		scope: ["keyword.operator", "punctuation.separator", "punctuation.accessor"],
		role: "operator",
	},
	{
		name: "Function",
		scope: ["entity.name.function", "support.function", "variable.function"],
		role: "identifier",
	},
	{
		name: "Type",
		scope: ["entity.name.type", "entity.name.class", "support.type", "support.class", "storage.type.cs"],
		role: "type",
	},
	{
		name: "Variable",
		scope: ["variable", "support.variable", "meta.definition.variable"],
		role: "identifier",
	},
	{
		name: "Property",
		scope: ["variable.other.property", "support.type.property-name", "meta.object-literal.key"],
		role: "constant",
	},
	{
		name: "Tag",
		scope: ["entity.name.tag", "punctuation.definition.tag"],
		role: "tag",
	},
	{
		name: "Attribute",
		scope: ["entity.other.attribute-name"],
		role: "attribute",
	},
	{
		name: "Regular Expression",
		scope: ["string.regexp", "constant.character.escape"],
		role: "regexp",
	},
	{
		name: "Markup Heading",
		scope: ["markup.heading", "entity.name.section"],
		role: "special",
		fontStyle: "bold",
	},
	{
		name: "Markup Link",
		scope: ["markup.underline.link", "string.other.link"],
		role: "constant",
	},
	{
		name: "Markup Bold",
		scope: ["markup.bold"],
		role: "emphasis",
		fontStyle: "bold",
	},
	{
		name: "Markup Italic",
		scope: ["markup.italic"],
		role: "emphasis",
		fontStyle: "italic",
	},
	{
		name: "Inserted",
		scope: ["markup.inserted", "diff.header.to-file"],
		versionRole: "added",
	},
	{
		name: "Deleted",
		scope: ["markup.deleted", "diff.header.from-file"],
		versionRole: "removed",
	},
	{
		name: "Changed",
		scope: ["markup.changed"],
		versionRole: "modified",
	},
];

const vimGroups = [
	["Normal", "ui.foreground", "ui.background"],
	["Comment", "syntax.trivial", "", "italic"],
	["Constant", "syntax.constant"],
	["String", "syntax.string"],
	["Character", "syntax.string"],
	["Number", "syntax.number"],
	["Boolean", "syntax.number"],
	["Float", "syntax.number"],
	["Identifier", "syntax.identifier"],
	["Function", "syntax.identifier"],
	["Statement", "syntax.statement"],
	["Conditional", "syntax.statement"],
	["Repeat", "syntax.statement"],
	["Label", "syntax.statement"],
	["Operator", "syntax.operator"],
	["Keyword", "syntax.statement"],
	["Exception", "ui.userActionNeeded"],
	["PreProc", "syntax.global"],
	["Include", "syntax.global"],
	["Define", "syntax.global"],
	["Macro", "syntax.global"],
	["PreCondit", "syntax.global"],
	["Type", "syntax.type"],
	["StorageClass", "syntax.type"],
	["Structure", "syntax.type"],
	["Typedef", "syntax.type"],
	["Special", "syntax.special"],
	["SpecialChar", "syntax.regexp"],
	["Tag", "syntax.tag"],
	["Delimiter", "syntax.operator"],
	["SpecialComment", "syntax.trivial"],
	["Debug", "ui.userActionNeeded"],
	["Underlined", "syntax.emphasis", "", "underline"],
	["Ignore", "syntax.trivial"],
	["Error", "ui.userActionNeeded"],
	["Todo", "ui.background", "ui.userCurrentState", "bold"],
	["Cursor", "ui.background", "ui.foreground"],
	["CursorLine", "", "ui.backgroundMuted"],
	["CursorLineNr", "ui.userCurrentState", "ui.backgroundMuted", "bold"],
	["LineNr", "ui.foregroundSubtle"],
	["SignColumn", "ui.foregroundSubtle", "ui.background"],
	["ColorColumn", "", "ui.backgroundMuted"],
	["VertSplit", "ui.border", "ui.background"],
	["StatusLine", "ui.foreground", "ui.backgroundMuted"],
	["StatusLineNC", "ui.foregroundSubtle", "ui.backgroundMuted"],
	["Pmenu", "ui.foreground", "ui.backgroundElevated"],
	["PmenuSel", "ui.background", "ui.userCurrentState"],
	["PmenuSbar", "", "ui.backgroundMuted"],
	["PmenuThumb", "", "ui.line"],
	["Visual", "", "ui.selection"],
	["VisualNOS", "", "ui.selection"],
	["Search", "ui.background", "syntax.number"],
	["IncSearch", "ui.background", "ui.userCurrentState"],
	["MatchParen", "ui.userCurrentState", "ui.backgroundMuted", "bold"],
	["ErrorMsg", "ui.userActionNeeded"],
	["WarningMsg", "version.modified"],
	["MoreMsg", "ui.userCurrentState"],
	["Question", "ui.userCurrentState"],
	["Directory", "syntax.constant"],
	["Folded", "ui.foregroundMuted", "ui.backgroundMuted"],
	["FoldColumn", "ui.foregroundSubtle", "ui.background"],
	["DiffAdd", "ui.background", "version.added"],
	["DiffChange", "ui.background", "version.modified"],
	["DiffDelete", "version.removed", "ui.background"],
	["DiffText", "ui.background", "version.modified", "bold"],
	["SpellBad", "ui.userActionNeeded", "", "undercurl"],
	["SpellCap", "version.modified", "", "undercurl"],
	["SpellRare", "syntax.emphasis", "", "undercurl"],
	["SpellLocal", "ui.userCurrentState", "", "undercurl"],
	["NonText", "ui.foregroundSubtle"],
	["EndOfBuffer", "ui.foregroundSubtle"],
	["SpecialKey", "syntax.special"],
	["Title", "syntax.special", "", "bold"],
];

const prismTokens = [
	["comment", "trivial"],
	["prolog", "trivial"],
	["doctype", "trivial"],
	["cdata", "trivial"],
	["punctuation", "operator"],
	["property", "constant"],
	["tag", "tag"],
	["boolean", "number"],
	["number", "number"],
	["constant", "constant"],
	["symbol", "constant"],
	["deleted", "deleted"],
	["selector", "tag"],
	["attr-name", "attribute"],
	["string", "string"],
	["char", "string"],
	["builtin", "type"],
	["inserted", "inserted"],
	["operator", "operator"],
	["entity", "constant"],
	["url", "constant"],
	["atrule", "global"],
	["attr-value", "string"],
	["keyword", "statement"],
	["function", "identifier"],
	["class-name", "type"],
	["regex", "regexp"],
	["important", "emphasis"],
	["variable", "identifier"],
];

function writeFile(relativePath, contents) {
	const fullPath = path.join(root, relativePath);
	const normalized = contents.endsWith("\n") ? contents : `${contents}\n`;
	generated.push(relativePath);

	if (checkOnly) {
		const existing = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : null;
		if (existing !== normalized) {
			throw new Error(`${relativePath} is out of date. Run npm run build.`);
		}
		return;
	}

	fs.mkdirSync(path.dirname(fullPath), { recursive: true });
	fs.writeFileSync(fullPath, normalized);
}

function asJson(value) {
	return JSON.stringify(value, null, 2);
}

function hexToRgb(hex) {
	const clean = hex.replace("#", "");
	return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
}

function hexToXcode(hex) {
	return hexToRgb(hex)
		.map((value) => (value / 255).toFixed(6))
		.concat("1")
		.join(" ");
}

function xmlEscape(value) {
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function getRole(theme, rolePath) {
	if (!rolePath) {
		return "NONE";
	}

	const parts = rolePath.split(".");
	if (parts[0] === "ui") {
		return theme.uiGroups[parts[1]];
	}

	if (parts[0] === "syntax") {
		return theme.syntaxGroups[parts[1]];
	}

	if (parts[0] === "version") {
		return theme.versionControlGroups[parts[1]];
	}

	return "NONE";
}

function tokenColors(theme) {
	return tokenScopes.map((token) => {
		const color = token.role ? theme.syntaxGroups[token.role] : theme.versionControlGroups[token.versionRole];

		return {
			name: token.name,
			scope: token.scope,
			settings: Object.assign(
				{
					foreground: color,
				},
				token.fontStyle ? { fontStyle: token.fontStyle } : {},
			),
		};
	});
}

function shikiTheme(theme) {
	return {
		name: theme.name,
		type: theme.type,
		colors: vscodeColors(theme),
		tokenColors: tokenColors(theme),
	};
}

function vscodeColors(theme) {
	const ui = theme.uiGroups;
	const version = theme.versionControlGroups;

	return {
		"activityBar.background": ui.backgroundShade,
		"activityBar.foreground": ui.foreground,
		"badge.background": ui.userCurrentState,
		"badge.foreground": ui.background,
		"button.background": ui.userCurrentState,
		"button.foreground": ui.background,
		"button.hoverBackground": theme.syntaxGroups.constant,
		"diffEditor.insertedTextBackground": `${version.added}33`,
		"diffEditor.removedTextBackground": `${version.removed}33`,
		"dropdown.background": ui.backgroundElevated,
		"dropdown.border": ui.border,
		"editor.background": ui.background,
		"editor.foreground": ui.foreground,
		"editor.findMatchBackground": `${theme.syntaxGroups.number}66`,
		"editor.findMatchHighlightBackground": `${theme.syntaxGroups.number}33`,
		"editor.lineHighlightBackground": ui.backgroundMuted,
		"editor.selectionBackground": ui.selection,
		"editor.selectionHighlightBackground": `${ui.selection}66`,
		"editorCursor.foreground": ui.userCurrentState,
		"editorGroup.border": ui.border,
		"editorGutter.addedBackground": version.added,
		"editorGutter.deletedBackground": version.removed,
		"editorGutter.modifiedBackground": version.modified,
		"editorLineNumber.activeForeground": ui.userCurrentState,
		"editorLineNumber.foreground": ui.foregroundSubtle,
		"input.background": ui.backgroundElevated,
		"input.border": ui.border,
		"input.foreground": ui.foreground,
		"list.activeSelectionBackground": ui.selection,
		"list.activeSelectionForeground": ui.foreground,
		"list.hoverBackground": ui.backgroundMuted,
		"panel.background": ui.background,
		"panel.border": ui.border,
		"peekView.border": ui.userCurrentState,
		"sideBar.background": ui.backgroundShade,
		"sideBar.foreground": ui.foregroundMuted,
		"sideBarSectionHeader.background": ui.backgroundMuted,
		"statusBar.background": ui.backgroundMuted,
		"statusBar.foreground": ui.foreground,
		"statusBar.noFolderBackground": ui.backgroundMuted,
		"tab.activeBackground": ui.background,
		"tab.activeForeground": ui.foreground,
		"tab.border": ui.border,
		"tab.inactiveBackground": ui.backgroundShade,
		"tab.inactiveForeground": ui.foregroundMuted,
		"terminal.ansiBlack": theme.ansiGroups.normal.black,
		"terminal.ansiBlue": theme.ansiGroups.normal.blue,
		"terminal.ansiBrightBlack": theme.ansiGroups.bright.black,
		"terminal.ansiBrightBlue": theme.ansiGroups.bright.blue,
		"terminal.ansiBrightCyan": theme.ansiGroups.bright.cyan,
		"terminal.ansiBrightGreen": theme.ansiGroups.bright.green,
		"terminal.ansiBrightMagenta": theme.ansiGroups.bright.magenta,
		"terminal.ansiBrightRed": theme.ansiGroups.bright.red,
		"terminal.ansiBrightWhite": theme.ansiGroups.bright.white,
		"terminal.ansiBrightYellow": theme.ansiGroups.bright.yellow,
		"terminal.ansiCyan": theme.ansiGroups.normal.cyan,
		"terminal.ansiGreen": theme.ansiGroups.normal.green,
		"terminal.ansiMagenta": theme.ansiGroups.normal.magenta,
		"terminal.ansiRed": theme.ansiGroups.normal.red,
		"terminal.ansiWhite": theme.ansiGroups.normal.white,
		"terminal.ansiYellow": theme.ansiGroups.normal.yellow,
		"titleBar.activeBackground": ui.backgroundShade,
		"titleBar.activeForeground": ui.foreground,
	};
}

function vscodeTheme(theme) {
	return Object.assign(shikiTheme(theme), {
		semanticHighlighting: true,
	});
}

function codexTheme(theme) {
	return Object.assign(vscodeTheme(theme), {
		displayName: theme.name,
		name: theme.slug,
	});
}

function prismTheme(theme) {
	const selector = `.${theme.slug}, [data-theme="${theme.slug}"]`;
	const childSelector = (child) => `.${theme.slug} ${child}, [data-theme="${theme.slug}"] ${child}`;
	const versionRoleByPrismRole = {
		deleted: "removed",
		inserted: "added",
		changed: "modified",
	};
	const syntaxRule = prismTokens
		.map(([token, role]) => {
			const color =
				theme.syntaxGroups[role] ||
				theme.versionControlGroups[role] ||
				theme.versionControlGroups[versionRoleByPrismRole[role]];

			return `${childSelector(`.token.${token}`)} { color: ${color}; }`;
		})
		.join("\n");

	return `${selector} {
  color: ${theme.uiGroups.foreground};
  background: ${theme.uiGroups.background};
  --jupiter-background: ${theme.uiGroups.background};
  --jupiter-foreground: ${theme.uiGroups.foreground};
  --jupiter-selection: ${theme.uiGroups.selection};
  --jupiter-border: ${theme.uiGroups.border};
  --metis-background: ${theme.uiGroups.background};
  --metis-foreground: ${theme.uiGroups.foreground};
  --metis-selection: ${theme.uiGroups.selection};
  --metis-border: ${theme.uiGroups.border};
}

${childSelector("code")},
${childSelector("pre")} {
  color: ${theme.uiGroups.foreground};
  background: ${theme.uiGroups.background};
  text-shadow: none;
}

${childSelector("pre::selection")},
${childSelector("code::selection")},
${childSelector(".token::selection")} {
  background: ${theme.uiGroups.selection};
}

${syntaxRule}

${childSelector(".token.bold")},
${childSelector(".token.important")} {
  font-weight: 700;
}

${childSelector(".token.italic")} {
  font-style: italic;
}`;
}

function ghosttyTheme(theme) {
	const ansi = theme.ansiGroups;
	const ui = theme.uiGroups;

	return [
		`background = ${ui.background}`,
		`foreground = ${ui.foreground}`,
		`cursor-color = ${ui.userCurrentState}`,
		`cursor-text = ${ui.background}`,
		`selection-background = ${ui.selection}`,
		`selection-foreground = ${ui.foreground}`,
		`palette = 0=${ansi.normal.black}`,
		`palette = 1=${ansi.normal.red}`,
		`palette = 2=${ansi.normal.green}`,
		`palette = 3=${ansi.normal.yellow}`,
		`palette = 4=${ansi.normal.blue}`,
		`palette = 5=${ansi.normal.magenta}`,
		`palette = 6=${ansi.normal.cyan}`,
		`palette = 7=${ansi.normal.white}`,
		`palette = 8=${ansi.bright.black}`,
		`palette = 9=${ansi.bright.red}`,
		`palette = 10=${ansi.bright.green}`,
		`palette = 11=${ansi.bright.yellow}`,
		`palette = 12=${ansi.bright.blue}`,
		`palette = 13=${ansi.bright.magenta}`,
		`palette = 14=${ansi.bright.cyan}`,
		`palette = 15=${ansi.bright.white}`,
	].join("\n");
}

function plistColor(hex) {
	const [red, green, blue] = hexToRgb(hex).map((value) => value / 255);

	return `<dict>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Red Component</key>
  <real>${red}</real>
  <key>Green Component</key>
  <real>${green}</real>
  <key>Blue Component</key>
  <real>${blue}</real>
</dict>`;
}

function itermTheme(theme) {
	const ansi = theme.ansiGroups;
	const ui = theme.uiGroups;
	const entries = [
		["Ansi 0 Color", ansi.normal.black],
		["Ansi 1 Color", ansi.normal.red],
		["Ansi 2 Color", ansi.normal.green],
		["Ansi 3 Color", ansi.normal.yellow],
		["Ansi 4 Color", ansi.normal.blue],
		["Ansi 5 Color", ansi.normal.magenta],
		["Ansi 6 Color", ansi.normal.cyan],
		["Ansi 7 Color", ansi.normal.white],
		["Ansi 8 Color", ansi.bright.black],
		["Ansi 9 Color", ansi.bright.red],
		["Ansi 10 Color", ansi.bright.green],
		["Ansi 11 Color", ansi.bright.yellow],
		["Ansi 12 Color", ansi.bright.blue],
		["Ansi 13 Color", ansi.bright.magenta],
		["Ansi 14 Color", ansi.bright.cyan],
		["Ansi 15 Color", ansi.bright.white],
		["Background Color", ui.background],
		["Badge Color", ui.userActionNeeded],
		["Bold Color", ansi.bright.white],
		["Cursor Color", ui.userCurrentState],
		["Cursor Guide Color", ui.selection],
		["Cursor Text Color", ui.background],
		["Foreground Color", ui.foreground],
		["Link Color", ansi.normal.blue],
		["Selected Text Color", ui.foreground],
		["Selection Color", ui.selection],
	];

	return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${entries.map(([key, color]) => `  <key>${xmlEscape(key)}</key>\n  ${plistColor(color)}`).join("\n")}
</dict>
</plist>`;
}

function xcodeTheme(theme) {
	const syntax = theme.syntaxGroups;
	const ui = theme.uiGroups;
	const version = theme.versionControlGroups;
	const syntaxEntries = {
		"xcode.syntax.attribute": syntax.attribute,
		"xcode.syntax.character": syntax.string,
		"xcode.syntax.comment": syntax.trivial,
		"xcode.syntax.comment.doc": syntax.trivial,
		"xcode.syntax.comment.mark": syntax.special,
		"xcode.syntax.identifier.class": syntax.type,
		"xcode.syntax.identifier.constant": syntax.constant,
		"xcode.syntax.identifier.function": syntax.identifier,
		"xcode.syntax.identifier.macro": syntax.global,
		"xcode.syntax.identifier.type": syntax.type,
		"xcode.syntax.identifier.variable": syntax.identifier,
		"xcode.syntax.keyword": syntax.statement,
		"xcode.syntax.number": syntax.number,
		"xcode.syntax.plain": ui.foreground,
		"xcode.syntax.preprocessor": syntax.global,
		"xcode.syntax.string": syntax.string,
		"xcode.syntax.url": syntax.constant,
	};

	return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>DVTConsoleDebuggerInputTextColor</key>
  <string>${hexToXcode(syntax.identifier)}</string>
  <key>DVTConsoleDebuggerOutputTextColor</key>
  <string>${hexToXcode(ui.foreground)}</string>
  <key>DVTConsoleDebuggerPromptTextColor</key>
  <string>${hexToXcode(ui.userCurrentState)}</string>
  <key>DVTConsoleExectuableInputTextColor</key>
  <string>${hexToXcode(syntax.statement)}</string>
  <key>DVTConsoleExectuableOutputTextColor</key>
  <string>${hexToXcode(ui.foregroundMuted)}</string>
  <key>DVTConsoleTextBackgroundColor</key>
  <string>${hexToXcode(ui.background)}</string>
  <key>DVTConsoleTextInsertionPointColor</key>
  <string>${hexToXcode(ui.userCurrentState)}</string>
  <key>DVTConsoleTextSelectionColor</key>
  <string>${hexToXcode(ui.selection)}</string>
  <key>DVTSourceTextBackground</key>
  <string>${hexToXcode(ui.background)}</string>
  <key>DVTSourceTextBlockDimBackgroundColor</key>
  <string>${hexToXcode(ui.backgroundMuted)}</string>
  <key>DVTSourceTextCurrentLineHighlightColor</key>
  <string>${hexToXcode(ui.backgroundMuted)}</string>
  <key>DVTSourceTextInsertionPointColor</key>
  <string>${hexToXcode(ui.userCurrentState)}</string>
  <key>DVTSourceTextInvisiblesColor</key>
  <string>${hexToXcode(ui.foregroundSubtle)}</string>
  <key>DVTSourceTextSelectionColor</key>
  <string>${hexToXcode(ui.selection)}</string>
  <key>DVTSourceTextSyntaxColors</key>
  <dict>
${Object.keys(syntaxEntries)
	.sort()
	.map((key) => `    <key>${key}</key>\n    <string>${hexToXcode(syntaxEntries[key])}</string>`)
	.join("\n")}
    <key>xcode.syntax.diff.added</key>
    <string>${hexToXcode(version.added)}</string>
    <key>xcode.syntax.diff.changed</key>
    <string>${hexToXcode(version.modified)}</string>
    <key>xcode.syntax.diff.deleted</key>
    <string>${hexToXcode(version.removed)}</string>
  </dict>
</dict>
</plist>`;
}

function vimHighlightLine(group, fgPath, bgPath, style, theme) {
	return `call s:h("${group}", "${getRole(theme, fgPath)}", "${getRole(theme, bgPath)}", "${style || "NONE"}")`;
}

function vimThemeBlock(theme) {
	const ansi = theme.ansiGroups;
	const lines = [
		`let g:terminal_color_0 = "${ansi.normal.black}"`,
		`let g:terminal_color_1 = "${ansi.normal.red}"`,
		`let g:terminal_color_2 = "${ansi.normal.green}"`,
		`let g:terminal_color_3 = "${ansi.normal.yellow}"`,
		`let g:terminal_color_4 = "${ansi.normal.blue}"`,
		`let g:terminal_color_5 = "${ansi.normal.magenta}"`,
		`let g:terminal_color_6 = "${ansi.normal.cyan}"`,
		`let g:terminal_color_7 = "${ansi.normal.white}"`,
		`let g:terminal_color_8 = "${ansi.bright.black}"`,
		`let g:terminal_color_9 = "${ansi.bright.red}"`,
		`let g:terminal_color_10 = "${ansi.bright.green}"`,
		`let g:terminal_color_11 = "${ansi.bright.yellow}"`,
		`let g:terminal_color_12 = "${ansi.bright.blue}"`,
		`let g:terminal_color_13 = "${ansi.bright.magenta}"`,
		`let g:terminal_color_14 = "${ansi.bright.cyan}"`,
		`let g:terminal_color_15 = "${ansi.bright.white}"`,
	];

	return lines
		.concat(vimGroups.map(([group, fg, bg, style]) => vimHighlightLine(group, fg, bg, style, theme)))
		.join("\n");
}

function vimTheme(variant) {
	return `" WARNING: Do not edit this file directly. It is generated by scripts/build.js.

if exists("syntax_on")
  syntax reset
endif

set fillchars=
highlight clear
let g:colors_name = "${variant.slug}"

function! s:h(group, fg, bg, style) abort
  let l:fg = empty(a:fg) ? "NONE" : a:fg
  let l:bg = empty(a:bg) ? "NONE" : a:bg
  let l:style = empty(a:style) ? "NONE" : a:style
  execute "highlight " . a:group . " guifg=" . l:fg . " guibg=" . l:bg . " gui=" . l:style . " cterm=NONE term=NONE"
endfunction

if &background ==# "light"
${vimThemeBlock(variant.themes.light)}
else
${vimThemeBlock(variant.themes.dark)}
endif`;
}

function vimJupiterTheme(variants) {
	const cases = variants
		.map(
			(variant, index) => `${index === 0 ? "if" : "elseif"} s:variant ==# "${variant.slug}"
  colorscheme ${variant.slug}`,
		)
		.join("\n");

	return `" WARNING: Do not edit this file directly. It is generated by scripts/build.js.

let s:variant = get(g:, "jupiter_variant", "metis")

if s:variant ==# "" || s:variant ==# "jupiter"
  let s:variant = "metis"
endif

${cases}
else
  echoerr "Jupiter variant must be one of: metis, ganymede, callisto, europa"
endif`;
}

function airlineBlock(theme, variant, themeName = variant.slug) {
	const ui = theme.uiGroups;
	const colors = theme.colors;
	const visual = colors.magenta || colors.pink || theme.syntaxGroups.emphasis;

	return `let s:modified = {
  \\ 'airline_c': [ "${ui.userActionNeeded}" , "" , "" , "" , "" ]
  \\ }

let s:N1 = [ "${ui.background}" , "${ui.userCurrentState}" , "" , "" ]
let s:N2 = [ "${ui.foreground}" , "${ui.backgroundMuted}" , "" , "" ]
let s:N3 = [ "${ui.foregroundMuted}" , "${ui.backgroundElevated}" , "" , "" ]
let g:airline#themes#${themeName}#palette.normal = airline#themes#generate_color_map(s:N1, s:N2, s:N3)
let g:airline#themes#${themeName}#palette.normal_modified = s:modified

let s:I1 = [ "${ui.background}" , "${colors.green}" , "" , "" ]
let g:airline#themes#${themeName}#palette.insert = airline#themes#generate_color_map(s:I1, s:N2, s:N3)
let g:airline#themes#${themeName}#palette.insert_modified = s:modified

let s:V1 = [ "${ui.background}" , "${visual}" , "" , "" ]
let g:airline#themes#${themeName}#palette.visual = airline#themes#generate_color_map(s:V1, s:N2, s:N3)
let g:airline#themes#${themeName}#palette.visual_modified = s:modified

let s:R1 = [ "${ui.background}" , "${ui.userActionNeeded}" , "" , "" ]
let g:airline#themes#${themeName}#palette.replace = airline#themes#generate_color_map(s:R1, s:N2, s:N3)
let g:airline#themes#${themeName}#palette.replace_modified = s:modified

let s:IN1 = [ "${ui.foregroundSubtle}" , "${ui.backgroundMuted}" , "" , "" ]
let g:airline#themes#${themeName}#palette.inactive = airline#themes#generate_color_map(s:IN1, s:IN1, s:IN1)
let g:airline#themes#${themeName}#palette.inactive_modified = s:modified

let s:AirlineError = [ "${ui.background}" , "${ui.userActionNeeded}" , "" , "" ]
let s:AirlineWarning = [ "${ui.background}" , "${theme.versionControlGroups.modified}" , "" , "" ]
let g:airline#themes#${themeName}#palette.accents = {'red': [ "${ui.userActionNeeded}" , "" , "" , "" ]}

for s:mode in ['normal', 'insert', 'visual', 'replace']
  let g:airline#themes#${themeName}#palette[s:mode].airline_error = s:AirlineError
  let g:airline#themes#${themeName}#palette[s:mode].airline_warning = s:AirlineWarning
endfor

let s:tabfill = airline#themes#get_highlight2(['Normal', 'bg'], ['Normal', 'bg'])
let g:airline#themes#${themeName}#palette.tabline = {
  \\ 'airline_tab': s:N2,
  \\ 'airline_tabsel': s:N1,
  \\ 'airline_tabtype': [ "${ui.background}" , "${colors.green}" , "" , "" ],
  \\ 'airline_tabfill': s:tabfill,
  \\ 'airline_tabhid': s:IN1
  \\ }`;
}

function vimAirlineTheme(variant) {
	return `" WARNING: Do not edit this file directly. It is generated by scripts/build.js.

let g:airline#themes#${variant.slug}#palette = {}

if &background ==# "light"
${airlineBlock(variant.themes.light, variant)}
else
${airlineBlock(variant.themes.dark, variant)}
endif`;
}

function vimJupiterAirlineTheme(variants) {
	const cases = variants
		.map(
			(variant, index) => `${index === 0 ? "if" : "elseif"} s:variant ==# "${variant.slug}"
  if &background ==# "light"
${airlineBlock(variant.themes.light, variant, "jupiter")
	.split("\n")
	.map((line) => `  ${line}`)
	.join("\n")}
  else
${airlineBlock(variant.themes.dark, variant, "jupiter")
	.split("\n")
	.map((line) => `  ${line}`)
	.join("\n")}
  endif`,
		)
		.join("\n");

	return `" WARNING: Do not edit this file directly. It is generated by scripts/build.js.

let g:airline#themes#jupiter#palette = {}
let s:variant = get(g:, "jupiter_variant", "metis")

if s:variant ==# "" || s:variant ==# "jupiter"
  let s:variant = "metis"
endif

${cases}
else
  echoerr "Jupiter airline variant must be one of: metis, ganymede, callisto, europa"
endif`;
}

function vscodePackage() {
	const themes = [Jupiter.metis, Jupiter.ganymede, Jupiter.callisto, Jupiter.europa].flatMap((variant) => [
		{
			label: `${variant.name} Dark`,
			uiTheme: "vs-dark",
			path: `./themes/${variant.slug}-dark-color-theme.json`,
		},
		{
			label: `${variant.name} Light`,
			uiTheme: "vs",
			path: `./themes/${variant.slug}-light-color-theme.json`,
		},
	]);

	return {
		name: "jupiter-vscode-theme",
		displayName: "Jupiter",
		publisher: "charliewilco",
		description: "Jupiter themes for VSCode.",
		version: "3.0.0",
		homepage: "https://charliewilco.github.io/jupiter/",
		license: "Unlicense",
		repository: {
			type: "git",
			url: "https://github.com/charliewilco/jupiter",
		},
		engines: {
			vscode: "^1.80.0",
		},
		categories: ["Themes"],
		files: ["LICENSE", "package.json", "themes/*.json"],
		contributes: {
			themes,
		},
	};
}

function build() {
	const dark = Jupiter.themes.dark;
	const light = Jupiter.themes.light;
	const ganymedeDark = Jupiter.ganymede.themes.dark;
	const ganymedeLight = Jupiter.ganymede.themes.light;
	const callistoDark = Jupiter.callisto.themes.dark;
	const callistoLight = Jupiter.callisto.themes.light;
	const europaDark = Jupiter.europa.themes.dark;
	const europaLight = Jupiter.europa.themes.light;

	writeFile(files.codexDark, asJson(codexTheme(dark)));
	writeFile(files.codexCallistoDark, asJson(codexTheme(callistoDark)));
	writeFile(files.codexCallistoLight, asJson(codexTheme(callistoLight)));
	writeFile(files.codexEuropaDark, asJson(codexTheme(europaDark)));
	writeFile(files.codexEuropaLight, asJson(codexTheme(europaLight)));
	writeFile(files.codexGanymedeDark, asJson(codexTheme(ganymedeDark)));
	writeFile(files.codexGanymedeLight, asJson(codexTheme(ganymedeLight)));
	writeFile(files.codexLight, asJson(codexTheme(light)));
	writeFile(files.definitions, asJson(Jupiter.definitions));
	writeFile(files.docsDefinitions, asJson(Jupiter.definitions));
	writeFile(files.shikiDark, asJson(shikiTheme(dark)));
	writeFile(files.shikiCallistoDark, asJson(shikiTheme(callistoDark)));
	writeFile(files.shikiCallistoLight, asJson(shikiTheme(callistoLight)));
	writeFile(files.shikiEuropaDark, asJson(shikiTheme(europaDark)));
	writeFile(files.shikiEuropaLight, asJson(shikiTheme(europaLight)));
	writeFile(files.shikiGanymedeDark, asJson(shikiTheme(ganymedeDark)));
	writeFile(files.shikiGanymedeLight, asJson(shikiTheme(ganymedeLight)));
	writeFile(files.shikiLight, asJson(shikiTheme(light)));
	writeFile(
		files.prism,
		[
			prismTheme(dark),
			prismTheme(light),
			prismTheme(ganymedeDark),
			prismTheme(ganymedeLight),
			prismTheme(callistoDark),
			prismTheme(callistoLight),
			prismTheme(europaDark),
			prismTheme(europaLight),
		].join("\n\n"),
	);
	writeFile(
		files.docsPrism,
		[
			prismTheme(dark),
			prismTheme(light),
			prismTheme(ganymedeDark),
			prismTheme(ganymedeLight),
			prismTheme(callistoDark),
			prismTheme(callistoLight),
			prismTheme(europaDark),
			prismTheme(europaLight),
		].join("\n\n"),
	);
	const vimVariants = [Jupiter.metis, Jupiter.ganymede, Jupiter.callisto, Jupiter.europa];

	writeFile(files.vimJupiter, vimJupiterTheme(vimVariants));
	writeFile(files.vim, vimTheme(Jupiter.metis));
	writeFile(files.vimCallisto, vimTheme(Jupiter.callisto));
	writeFile(files.vimEuropa, vimTheme(Jupiter.europa));
	writeFile(files.vimGanymede, vimTheme(Jupiter.ganymede));
	writeFile(files.vimAirlineJupiter, vimJupiterAirlineTheme(vimVariants));
	writeFile(files.vimAirline, vimAirlineTheme(Jupiter.metis));
	writeFile(files.vimAirlineCallisto, vimAirlineTheme(Jupiter.callisto));
	writeFile(files.vimAirlineEuropa, vimAirlineTheme(Jupiter.europa));
	writeFile(files.vimAirlineGanymede, vimAirlineTheme(Jupiter.ganymede));
	writeFile(files.ghosttyDark, ghosttyTheme(dark));
	writeFile(files.ghosttyCallistoDark, ghosttyTheme(callistoDark));
	writeFile(files.ghosttyCallistoLight, ghosttyTheme(callistoLight));
	writeFile(files.ghosttyEuropaDark, ghosttyTheme(europaDark));
	writeFile(files.ghosttyEuropaLight, ghosttyTheme(europaLight));
	writeFile(files.ghosttyGanymedeDark, ghosttyTheme(ganymedeDark));
	writeFile(files.ghosttyGanymedeLight, ghosttyTheme(ganymedeLight));
	writeFile(files.ghosttyLight, ghosttyTheme(light));
	writeFile(files.itermDark, itermTheme(dark));
	writeFile(files.itermCallistoDark, itermTheme(callistoDark));
	writeFile(files.itermCallistoLight, itermTheme(callistoLight));
	writeFile(files.itermEuropaDark, itermTheme(europaDark));
	writeFile(files.itermEuropaLight, itermTheme(europaLight));
	writeFile(files.itermGanymedeDark, itermTheme(ganymedeDark));
	writeFile(files.itermGanymedeLight, itermTheme(ganymedeLight));
	writeFile(files.itermLight, itermTheme(light));
	writeFile(files.xcodeDark, xcodeTheme(dark));
	writeFile(files.xcodeCallistoDark, xcodeTheme(callistoDark));
	writeFile(files.xcodeCallistoLight, xcodeTheme(callistoLight));
	writeFile(files.xcodeEuropaDark, xcodeTheme(europaDark));
	writeFile(files.xcodeEuropaLight, xcodeTheme(europaLight));
	writeFile(files.xcodeGanymedeDark, xcodeTheme(ganymedeDark));
	writeFile(files.xcodeGanymedeLight, xcodeTheme(ganymedeLight));
	writeFile(files.xcodeLight, xcodeTheme(light));
	writeFile(files.vscodeDark, asJson(vscodeTheme(dark)));
	writeFile(files.vscodeCallistoDark, asJson(vscodeTheme(callistoDark)));
	writeFile(files.vscodeCallistoLight, asJson(vscodeTheme(callistoLight)));
	writeFile(files.vscodeEuropaDark, asJson(vscodeTheme(europaDark)));
	writeFile(files.vscodeEuropaLight, asJson(vscodeTheme(europaLight)));
	writeFile(files.vscodeGanymedeDark, asJson(vscodeTheme(ganymedeDark)));
	writeFile(files.vscodeGanymedeLight, asJson(vscodeTheme(ganymedeLight)));
	writeFile(files.vscodeLight, asJson(vscodeTheme(light)));
	writeFile(files.vscodePackage, asJson(vscodePackage()));
	writeFile(files.vscodeLicense, fs.readFileSync(path.join(root, "LICENSE"), "utf8"));

	if (!checkOnly) {
		process.stdout.write(`Generated ${generated.length} Jupiter artifacts.\n`);
	}
}

build();
