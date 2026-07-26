// @ts-check

import definitions from "../../definitions/metis.json";

const themes = /** @type {Record<string, typeof definitions.themes.dark>} */ (definitions.themes);

class ColorStage extends HTMLElement {
	static get observedAttributes() {
		return ["mode"];
	}

	connectedCallback() {
		if (!this.hasAttribute("role")) {
			this.setAttribute("role", "group");
		}

		this.#render();
		this.#sync();
	}

	attributeChangedCallback() {
		this.#sync();
	}

	get mode() {
		const mode = this.getAttribute("mode");

		return mode && themes[mode] ? mode : "dark";
	}

	set mode(value) {
		this.setAttribute("mode", value);
	}

	#render() {
		this.replaceChildren();

		Object.keys(definitions.palette).forEach((name) => {
			const button = document.createElement("button");
			const label = document.createElement("span");
			const value = document.createElement("code");

			button.type = "button";
			button.className = `color-orb orb-${name}`;
			button.dataset.copyColor = name;
			button.addEventListener("click", () => this.#copy(name, button));

			label.textContent = this.#label(name);
			value.dataset.colorName = name;

			button.append(label, value);
			this.append(button);
		});
	}

	#sync() {
		const theme = themes[this.mode];
		const colors = /** @type {Record<string, string>} */ (theme.colors);

		/** @type {NodeListOf<HTMLElement>} */
		const nodes = this.querySelectorAll("[data-color-name]");

		nodes.forEach((node) => {
			const name = node.dataset.colorName;

			if (!name || !colors[name]) {
				return;
			}

			const orb = /** @type {HTMLElement | null} */ (node.closest(".color-orb"));

			node.textContent = colors[name];
			orb?.style.setProperty("--orb-color", colors[name]);
		});
	}

	/**
	 * @param {string} name
	 * @param {HTMLButtonElement} button
	 */
	async #copy(name, button) {
		const colors = /** @type {Record<string, string>} */ (themes[this.mode].colors);
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
