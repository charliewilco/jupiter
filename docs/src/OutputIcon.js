// @ts-check

import { findTemplateElement } from "./dom.js";

const iconSources = {
	"./assets/icons/light/iterm2.png": new URL("../assets/icons/light/iterm2.png", import.meta.url).toString(),
	"./assets/icons/dark/iterm2.png": new URL("../assets/icons/dark/iterm2.png", import.meta.url).toString(),
	"./assets/icons/light/ghostty.png": new URL("../assets/icons/light/ghostty.png", import.meta.url).toString(),
	"./assets/icons/dark/ghostty.png": new URL("../assets/icons/dark/ghostty.png", import.meta.url).toString(),
	"./assets/icons/light/codex.png": new URL("../assets/icons/light/codex.png", import.meta.url).toString(),
	"./assets/icons/dark/codex.png": new URL("../assets/icons/dark/codex.png", import.meta.url).toString(),
	"./assets/icons/light/vim.png": new URL("../assets/icons/light/vim.png", import.meta.url).toString(),
	"./assets/icons/dark/vim.png": new URL("../assets/icons/dark/vim.png", import.meta.url).toString(),
	"./assets/icons/light/xcode.png": new URL("../assets/icons/light/xcode.png", import.meta.url).toString(),
	"./assets/icons/dark/xcode.png": new URL("../assets/icons/dark/xcode.png", import.meta.url).toString(),
	"./assets/icons/light/vscode.png": new URL("../assets/icons/light/vscode.png", import.meta.url).toString(),
	"./assets/icons/dark/vscode.png": new URL("../assets/icons/dark/vscode.png", import.meta.url).toString(),
};

class OutputIcon extends HTMLElement {
	static get observedAttributes() {
		return ["light", "dark", "default", "mode"];
	}

	/** @type {ShadowRoot} */
	#root;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.#render();
		this.#sync();
	}

	attributeChangedCallback() {
		this.#sync();
	}

	#render() {
		this.#root.replaceChildren(findTemplateElement("output-icon-template").content.cloneNode(true));
	}

	#sync() {
		const lightSource = this.#root.querySelector('[data-icon-source="light"]');
		const darkSource = this.#root.querySelector('[data-icon-source="dark"]');
		const image = this.#root.querySelector("img");

		if (!(lightSource instanceof HTMLSourceElement) || !(darkSource instanceof HTMLSourceElement) || !image) {
			return;
		}

		const mode = this.getAttribute("mode");
		const light = this.#source(this.getAttribute("light") || "");
		const dark = this.#source(this.getAttribute("dark") || "");
		const fallback = this.getAttribute("default") || dark || light;
		const source = mode ? this.#source(this.getAttribute(mode) || fallback) : this.#source(fallback);

		if (mode) {
			lightSource.srcset = source;
			darkSource.srcset = source;
		} else {
			lightSource.srcset = light;
			darkSource.srcset = dark;
		}

		image.src = source;
	}

	/**
	 * @param {string} source
	 */
	#source(source) {
		return iconSources[source] || source;
	}
}

customElements.define("output-icon", OutputIcon);
