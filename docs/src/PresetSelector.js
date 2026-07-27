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
		return ["appearance", "value"];
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

	attributeChangedCallback(name) {
		if (name === "appearance" && this.isConnected) {
			this.#render();
		}

		this.#sync();
	}

	get value() {
		return this.getAttribute("value") || "";
	}

	set value(value) {
		this.setAttribute("value", value);
	}

	get appearance() {
		return this.getAttribute("appearance") || "segmented";
	}

	#render() {
		const defs = Array.from(this.querySelectorAll("preset-def"));
		this.#root.replaceChildren(findTemplateElement("preset-selector-template").content.cloneNode(true));

		const wrapper = this.#root.querySelector("[data-preset-options]");

		if (!(wrapper instanceof HTMLElement)) {
			return;
		}

		wrapper.setAttribute("aria-label", this.getAttribute("aria-label") || "Preset");
		wrapper.setAttribute("role", this.appearance === "radio" ? "radiogroup" : "group");
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
			if (this.appearance === "radio") {
				button.setAttribute("role", "radio");
			}
			button.addEventListener("click", () => this.#select(def.presetId));
			button.addEventListener("keydown", (event) => this.#handleKeydown(event, def.presetId));
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

	/**
	 * @param {KeyboardEvent} event
	 * @param {string} currentValue
	 */
	#handleKeydown(event, currentValue) {
		if (this.appearance !== "radio") {
			return;
		}

		const values = Array.from(this.#buttons.keys());
		const currentIndex = values.indexOf(currentValue);
		const lastIndex = values.length - 1;
		let nextIndex = currentIndex;

		if (event.key === "ArrowRight" || event.key === "ArrowDown") {
			nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
		} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
			nextIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;
		} else if (event.key === "Home") {
			nextIndex = 0;
		} else if (event.key === "End") {
			nextIndex = lastIndex;
		} else {
			return;
		}

		event.preventDefault();
		const nextValue = values[nextIndex];
		const nextButton = this.#buttons.get(nextValue);
		this.#select(nextValue);
		nextButton?.focus();
	}

	#sync() {
		this.#buttons.forEach((button, value) => {
			const selected = value === this.value;

			if (this.appearance === "radio") {
				button.setAttribute("aria-checked", String(selected));
				button.removeAttribute("aria-pressed");
				button.tabIndex = selected ? 0 : -1;
			} else {
				button.setAttribute("aria-pressed", String(selected));
				button.removeAttribute("aria-checked");
				button.removeAttribute("tabindex");
			}
		});
	}
}

customElements.define("preset-def", PresetDef);
customElements.define("preset-selector", PresetSelector);
