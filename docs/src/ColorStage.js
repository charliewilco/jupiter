// @ts-check

import definitions from "../../definitions/metis.json";

const variants = /** @type {Record<string, typeof definitions.variants.metis>} */ (definitions.variants);

class ColorStage extends HTMLElement {
	static get observedAttributes() {
		return ["mode", "variant"];
	}

	connectedCallback() {
		if (!this.hasAttribute("role")) {
			this.setAttribute("role", "group");
		}

		this.#render();
		this.#sync();
	}

	attributeChangedCallback() {
		this.#render();
		this.#sync();
	}

	get variant() {
		const variant = this.getAttribute("variant");

		return variant && variants[variant] ? variant : "metis";
	}

	set variant(value) {
		this.setAttribute("variant", value);
	}

	get mode() {
		const mode = this.getAttribute("mode");
		const themes = variants[this.variant].themes;

		return mode && themes[mode] ? mode : "dark";
	}

	set mode(value) {
		this.setAttribute("mode", value);
	}

	#render() {
		this.replaceChildren();

		Object.keys(variants[this.variant].palette).forEach((name) => {
			const figure = document.createElement("figure");
			const button = document.createElement("button");
			const object = document.createElement("object");
			const caption = document.createElement("figcaption");
			const label = document.createElement("span");
			const value = document.createElement("code");

			figure.className = "color-swatch";
			button.type = "button";
			button.className = `color-orb orb-${name}`;
			button.dataset.copyColor = name;
			button.addEventListener("click", () => this.#copy(name, button));
			object.setAttribute("aria-hidden", "true");

			label.textContent = this.#label(name);
			value.dataset.colorName = name;

			button.append(object);
			caption.append(label, value);
			figure.append(button, caption);
			this.append(figure);
		});
	}

	#sync() {
		const theme = variants[this.variant].themes[this.mode];
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
		const colors = /** @type {Record<string, string>} */ (variants[this.variant].themes[this.mode].colors);
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
