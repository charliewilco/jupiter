import "./ColorStage.js";
import "./OutputIcon.js";
import "./PresetSelector.js";
import "./SyntaxHighlighter.js";
import { loadDefinitions } from "./definitions.js";

const toKebab = (value) => value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const getInitialVariant = (definitions) => {
	const variant = localStorage.getItem("jupiter-preview-variant");

	return variant && definitions.variants[variant] ? variant : "metis";
};

const getInitialMode = (definitions) => {
	const mode = localStorage.getItem("jupiter-preview-mode");

	return mode && definitions.themes[mode] ? mode : "dark";
};

const setThemeVars = (theme) => {
	const root = document.documentElement;
	const groups = [
		["ui", theme.uiGroups],
		["syntax", theme.syntaxGroups],
		["version", theme.versionControlGroups],
		["color", theme.colors],
		["ansi", theme.ansiGroups.normal],
	];

	groups.forEach(([prefix, values]) => {
		Object.entries(values).forEach(([key, value]) => {
			root.style.setProperty(`--${prefix}-${toKebab(key)}`, value);
		});
	});
};

const syncOutputIcons = (mode) => {
	document.querySelectorAll("output-icon").forEach((icon) => {
		icon.setAttribute("mode", mode);
	});
};

const syncVariantSelector = (selector, variant) => {
	const input = selector.querySelector(`input[value="${CSS.escape(variant)}"]`);

	if (input instanceof HTMLInputElement) {
		input.checked = true;
	}
};

const setPreview = (definitions, variant, mode) => {
	const theme = definitions.variants[variant].themes[mode];
	const familySelector = document.querySelector("[data-family-selector]");
	const modeSelector = document.querySelector("[data-mode-selector]");
	const colorStage = document.querySelector("color-stage");

	document.documentElement.dataset.variant = variant;
	document.documentElement.dataset.mode = mode;
	document.documentElement.dataset.theme = theme.slug;
	localStorage.setItem("jupiter-preview-variant", variant);
	localStorage.setItem("jupiter-preview-mode", mode);
	setThemeVars(theme);
	syncOutputIcons(mode);

	if (familySelector) {
		syncVariantSelector(familySelector, variant);
	}

	if (modeSelector) {
		modeSelector.setAttribute("value", mode);
	}

	if (colorStage) {
		colorStage.setAttribute("variant", variant);
		colorStage.setAttribute("mode", mode);
	}
};

const start = async () => {
	const definitions = await loadDefinitions();

	document.querySelector("[data-family-selector]")?.addEventListener("change", (event) => {
		if (event.target instanceof HTMLInputElement && event.target.value in definitions.variants) {
			setPreview(definitions, event.target.value, document.documentElement.dataset.mode || "dark");
		}
	});

	document.querySelector("[data-mode-selector]")?.addEventListener("preset-change", (event) => {
		if (event instanceof CustomEvent && typeof event.detail.value === "string") {
			setPreview(definitions, document.documentElement.dataset.variant || "metis", event.detail.value);
		}
	});

	setPreview(definitions, getInitialVariant(definitions), getInitialMode(definitions));
};

start();
