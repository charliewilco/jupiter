// @ts-check

import { loadDefinitions } from "./definitions.js";
import { findTemplateElement } from "./dom.js";

class ColorStage extends HTMLElement {
	static get observedAttributes() {
		return ["mode", "variant"];
	}

	/** @type {any} */
	#definitions = null;

	connectedCallback() {
		if (!this.hasAttribute("role")) {
			this.setAttribute("role", "group");
		}

		this.#load();
	}

	attributeChangedCallback() {
		if (!this.#definitions) {
			return;
		}

		this.#render();
		this.#sync();
	}

	get variant() {
		const variant = this.getAttribute("variant");
		const variants = this.#definitions?.variants || {};

		return variant && variants[variant] ? variant : "metis";
	}

	set variant(value) {
		this.setAttribute("variant", value);
	}

	get mode() {
		const mode = this.getAttribute("mode");
		const themes = this.#definitions?.variants[this.variant].themes || {};

		return mode && themes[mode] ? mode : "dark";
	}

	set mode(value) {
		this.setAttribute("mode", value);
	}

	async #load() {
		this.#definitions = await loadDefinitions();
		this.#render();
		this.#sync();
	}

	#render() {
		const template = findTemplateElement("color-stage-swatch-template");
		const fragment = document.createDocumentFragment();
		const variants = this.#definitions.variants;

		Object.keys(variants[this.variant].palette).forEach((name) => {
			const figure = template.content.firstElementChild?.cloneNode(true);

			if (!(figure instanceof HTMLElement)) {
				return;
			}

			const button = figure.querySelector(".color-orb");
			const label = figure.querySelector("[data-color-label]");
			const value = figure.querySelector("[data-color-name]");

			if (
				!(button instanceof HTMLButtonElement) ||
				!(label instanceof HTMLElement) ||
				!(value instanceof HTMLElement)
			) {
				return;
			}

			button.classList.add(`orb-${name}`);
			button.dataset.copyColor = name;
			button.addEventListener("click", () => this.#copy(name, button));

			label.textContent = this.#label(name);
			value.dataset.colorName = name;

			fragment.append(figure);
		});

		this.replaceChildren(fragment);
	}

	#sync() {
		const theme = this.#definitions.variants[this.variant].themes[this.mode];
		const colors = /** @type {Record<string, string>} */ (theme.colors);

		/** @type {NodeListOf<HTMLElement>} */
		const nodes = this.querySelectorAll("[data-color-name]");

		nodes.forEach((node) => {
			const name = node.dataset.colorName;

			if (!name || !colors[name]) {
				return;
			}

			const figure = /** @type {HTMLElement | null} */ (node.closest(".color-swatch"));
			const orb = /** @type {HTMLElement | null} */ (figure?.querySelector(".color-orb") || null);

			node.textContent = colors[name];
			figure?.style.setProperty("--swatch-color", colors[name]);
			orb?.style.setProperty("--orb-color", colors[name]);
		});
	}

	/**
	 * @param {string} name
	 * @param {HTMLButtonElement} button
	 */
	async #copy(name, button) {
		const colors = /** @type {Record<string, string>} */ (
			this.#definitions.variants[this.variant].themes[this.mode].colors
		);
		const color = colors[name];

		try {
			await navigator.clipboard?.writeText(color);
			button.dataset.copied = "true";
			window.setTimeout(() => {
				delete button.dataset.copied;
			}, 900);
		} catch {
			button.dataset.copied = "false";
		}
	}

	/**
	 * @param {string} name
	 */
	#label(name) {
		return name.replace(/^./, (letter) => letter.toUpperCase());
	}
}

customElements.define("color-stage", ColorStage);
