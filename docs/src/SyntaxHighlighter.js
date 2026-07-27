// @ts-check

import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-go";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-rust";
import { findTemplateElement } from "./dom.js";

const normalizeSource = (source) => {
	const lines = source.replace(/\r\n?/g, "\n").split("\n");

	while (lines[0]?.trim() === "") {
		lines.shift();
	}

	while (lines.at(-1)?.trim() === "") {
		lines.pop();
	}

	const indentation = lines.filter((line) => line.trim()).map((line) => line.match(/^[\t ]*/)?.[0].length || 0);
	const trimLength = indentation.length ? Math.min(...indentation) : 0;

	return lines.map((line) => line.slice(trimLength)).join("\n");
};

const labelForLanguage = (language) => language.replace(/^./, (letter) => letter.toUpperCase());

class SyntaxHighlighter extends HTMLElement {
	static get observedAttributes() {
		return ["file", "label", "language"];
	}

	/** @type {string | null} */
	#source = null;

	connectedCallback() {
		this.#source ??= this.#readSource();
		this.#render();
	}

	attributeChangedCallback() {
		if (this.isConnected && this.#source !== null) {
			this.#render();
		}
	}

	get language() {
		return this.getAttribute("language") || "javascript";
	}

	#render() {
		const template = findTemplateElement("syntax-highlighter-template");
		const language = this.language;
		const grammar = Prism.languages[language];
		const source = this.#source || "";

		this.replaceChildren(template.content.cloneNode(true));

		const title = this.querySelector("[data-syntax-title]");
		const file = this.querySelector("[data-syntax-file]");
		const pre = this.querySelector("pre");
		const code = this.querySelector("[data-syntax-code]");

		if (!(title instanceof HTMLElement) || !(file instanceof HTMLElement) || !pre || !(code instanceof HTMLElement)) {
			return;
		}

		title.textContent = this.getAttribute("label") || labelForLanguage(language);
		file.textContent = this.getAttribute("file") || "";
		file.hidden = !file.textContent;
		pre.className = `language-${language}`;
		code.className = `language-${language}`;

		if (grammar) {
			code.innerHTML = Prism.highlight(source, grammar, language);
		} else {
			code.textContent = source;
		}
	}

	#readSource() {
		const sourceTemplate = this.querySelector("[data-syntax-source]");
		const source =
			sourceTemplate instanceof HTMLTemplateElement
				? sourceTemplate.content.querySelector("pre")?.textContent || sourceTemplate.content.textContent
				: this.textContent;

		return normalizeSource(source);
	}
}

customElements.define("syntax-highlighter", SyntaxHighlighter);
