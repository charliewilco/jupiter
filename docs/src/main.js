import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-go";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-rust";
import "../../prismjs/metis.css";
import definitions from "../../definitions/metis.json";
import "./ColorStage.js";
import "./PresetSelector.js";

const toKebab = (value) => value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const getInitialVariant = () => {
	const variant = localStorage.getItem("metis-preview-variant");

	return variant && definitions.variants[variant] ? variant : "metis";
};

const getInitialMode = () => {
	const mode = localStorage.getItem("metis-preview-mode");

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

const cacheIconSources = () => {
	document.querySelectorAll("[data-icon-target]").forEach((picture) => {
		picture.querySelectorAll("[data-icon-mode]").forEach((source) => {
			picture.dataset[`${source.dataset.iconMode}Icon`] = source.srcset;
		});
	});
};

const updateIcons = () => {
	const mode = document.documentElement.dataset.mode || "dark";

	document.querySelectorAll("[data-icon-target]").forEach((picture) => {
		const src = picture.dataset[`${mode}Icon`];

		if (!src) {
			return;
		}

		picture.querySelectorAll("source").forEach((source) => {
			source.srcset = src;
		});

		const image = picture.querySelector("img");

		if (image) {
			image.src = src;
		}
	});
};

const setPreview = (variant, mode) => {
	const theme = definitions.variants[variant].themes[mode];
	const familySelector = document.querySelector("[data-family-selector]");
	const modeSelector = document.querySelector("[data-mode-selector]");
	const colorStage = document.querySelector("color-stage");

	document.documentElement.dataset.variant = variant;
	document.documentElement.dataset.mode = mode;
	document.documentElement.dataset.theme = theme.slug;
	localStorage.setItem("metis-preview-variant", variant);
	localStorage.setItem("metis-preview-mode", mode);
	setThemeVars(theme);
	updateIcons();

	if (familySelector) {
		familySelector.setAttribute("value", variant);
	}

	if (modeSelector) {
		modeSelector.setAttribute("value", mode);
	}

	if (colorStage) {
		colorStage.setAttribute("variant", variant);
		colorStage.setAttribute("mode", mode);
	}
};

cacheIconSources();
Prism.highlightAll();

document.querySelector("[data-family-selector]")?.addEventListener("preset-change", (event) => {
	if (event instanceof CustomEvent && typeof event.detail.value === "string") {
		setPreview(event.detail.value, document.documentElement.dataset.mode || "dark");
	}
});

document.querySelector("[data-mode-selector]")?.addEventListener("preset-change", (event) => {
	if (event instanceof CustomEvent && typeof event.detail.value === "string") {
		setPreview(document.documentElement.dataset.variant || "metis", event.detail.value);
	}
});

setPreview(getInitialVariant(), getInitialMode());
