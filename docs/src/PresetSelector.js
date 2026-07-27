// @ts-check

import { findTemplateElement } from "./dom.js";

class PresetDef extends HTMLElement {
	get presetId() {
		return this.getAttribute("id") || "";
	}

	get label() {
		return (
			this.getAttribute("label") ||
			this.textContent.trim() ||
			this.presetId.replace(/^./, (letter) => letter.toUpperCase())
		);
	}
}

class PresetSelector extends HTMLElement {
	static get observedAttributes() {
		return ["value"];
	}

	/** @type {ShadowRoot} */
	#root;

	/** @type {Map<string, HTMLButtonElement>} */
	#buttons = new Map();

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

	get value() {
		return this.getAttribute("value") || "";
	}

	set value(value) {
		this.setAttribute("value", value);
	}

	#render() {
		const defs = Array.from(this.querySelectorAll("preset-def"));
		this.#root.replaceChildren(findTemplateElement("preset-selector-template").content.cloneNode(true));

		const wrapper = this.#root.querySelector("[data-preset-options]");

		if (!(wrapper instanceof HTMLElement)) {
			return;
		}

		wrapper.setAttribute("aria-label", this.getAttribute("aria-label") || "Preset");
		wrapper.style.setProperty("--preset-count", String(defs.length || 1));
		this.#buttons.clear();

		defs.forEach((def) => {
			if (!(def instanceof PresetDef) || !def.presetId) {
				return;
			}

			const button = document.createElement("button");
			button.type = "button";
			button.textContent = def.label;
			button.dataset.presetOption = def.presetId;
			button.addEventListener("click", () => this.#select(def.presetId));
			wrapper.append(button);
			this.#buttons.set(def.presetId, button);
		});
	}

	/**
	 * @param {string} value
	 */
	#select(value) {
		this.value = value;
		this.dispatchEvent(
			new CustomEvent("preset-change", {
				bubbles: true,
				detail: { value },
			}),
		);
	}

	#sync() {
		this.#buttons.forEach((button, value) => {
			button.setAttribute("aria-pressed", String(value === this.value));
		});
	}
}

customElements.define("preset-def", PresetDef);
customElements.define("preset-selector", PresetSelector);
