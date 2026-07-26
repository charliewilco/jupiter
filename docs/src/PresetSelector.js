// @ts-check

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
		const style = document.createElement("style");
		const wrapper = document.createElement("div");

		style.textContent = `
      :host {
        display: inline-block;
      }

      div {
        display: inline-grid;
        grid-template-columns: repeat(var(--preset-count, 2), minmax(0, 1fr));
        gap: 1px;
        overflow: hidden;
        min-width: 142px;
        background: var(--ui-border);
        border: 1px solid var(--ui-border);
        border-radius: 7px;
      }

      button {
        min-height: 34px;
        padding: 0 14px;
        color: inherit;
        cursor: pointer;
        background: var(--ui-background-elevated);
        border: 0;
        font: inherit;
        font-size: 0.82rem;
        font-weight: 760;
      }

      button[aria-pressed="true"] {
        color: var(--ui-background);
        background: var(--ui-foreground);
      }

      button:focus-visible {
        outline: 2px solid var(--ui-user-current-state);
        outline-offset: 2px;
      }

      @media (max-width: 640px) {
        :host,
        div {
          width: 100%;
        }
      }
    `;

		wrapper.setAttribute("role", "group");
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

		this.#root.replaceChildren(style, wrapper);
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
