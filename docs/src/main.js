import definitions from "../../definitions/metis.json";

const exportTargets = [
  {
    name: "Ghostty",
    group: "Terminal",
    description: "Native dark and light terminal palettes with ANSI groups generated from the same source.",
    files: ["ghostty/metis-dark", "ghostty/metis-light"]
  },
  {
    name: "iTerm2",
    group: "Terminal",
    description: "Installable .itermcolors files for the expanded Metis color system.",
    files: ["iterm/Metis Dark.itermcolors", "iterm/Metis Light.itermcolors"]
  },
  {
    name: "Xcode",
    group: "Editor",
    description: "Xcode themes for Swift, Objective-C, plist, and build log workflows.",
    files: ["xcode/Metis Dark.xccolortheme", "xcode/Metis Light.xccolortheme"]
  },
  {
    name: "VSCode",
    group: "Editor",
    description: "Packaged VSCode themes using token colors generated from Metis definitions.",
    files: ["vscode/themes/metis-dark-color-theme.json", "vscode/themes/metis-light-color-theme.json"]
  },
  {
    name: "Shiki",
    group: "Renderer",
    description: "JSON theme definitions for static docs, MDX, Astro, and code examples.",
    files: ["shiki/metis-dark.json", "shiki/metis-light.json"]
  },
  {
    name: "Vim",
    group: "Editor",
    description: "A Vim colorscheme plus Airline theme definitions for terminal editing.",
    files: ["colors/metis.vim", "autoload/airline/themes/metis.vim"]
  },
  {
    name: "PrismJS",
    group: "Renderer",
    description: "A small CSS theme for docs that already rely on Prism token classes.",
    files: ["prismjs/metis.css"]
  },
  {
    name: "Definitions",
    group: "Source",
    description: "The canonical palette, role, syntax, UI, ANSI, and version-control definitions.",
    files: ["definitions/metis.json"]
  }
];

const codeLines = [
  [
    ["comment", "// Metis is generated from one definitions file."],
  ],
  [
    ["keyword", "export"],
    ["plain", " "],
    ["keyword", "const"],
    ["plain", " theme "],
    ["operator", "="],
    ["plain", " "],
    ["function", "createTheme"],
    ["plain", "({"]
  ],
  [
    ["plain", "  "],
    ["property", "name"],
    ["operator", ":"],
    ["plain", " "],
    ["string", "\"Metis\""],
    ["operator", ","]
  ],
  [
    ["plain", "  "],
    ["property", "modes"],
    ["operator", ":"],
    ["plain", " ["],
    ["string", "\"dark\""],
    ["operator", ","],
    ["plain", " "],
    ["string", "\"light\""],
    ["plain", "],"]
  ],
  [
    ["plain", "  "],
    ["property", "targets"],
    ["operator", ":"],
    ["plain", " "],
    ["number", "8"],
    ["operator", ","]
  ],
  [
    ["plain", "  "],
    ["function", "mapToken"],
    ["plain", "("],
    ["type", "SyntaxRole"],
    ["plain", "."],
    ["property", "statement"],
    ["plain", ") {"]
  ],
  [
    ["plain", "    "],
    ["keyword", "return"],
    ["plain", " "],
    ["property", "palette"],
    ["plain", "."],
    ["property", "amber"],
    ["operator", ";"]
  ],
  [
    ["plain", "  }"]
  ],
  [
    ["plain", "});"]
  ],
  [
    ["plain", ""]
  ],
  [
    ["keyword", "await"],
    ["plain", " "],
    ["function", "writeTargets"],
    ["plain", "("],
    ["property", "theme"],
    ["operator", ","],
    ["plain", " "],
    ["property", "formats"],
    ["plain", ");"]
  ]
];

const roleRows = [
  ["statement", "Control flow", "keywords, storage, declarations"],
  ["identifier", "Identifiers", "functions and named symbols"],
  ["string", "Strings", "quoted values and content"],
  ["number", "Numbers", "literals and numeric constants"],
  ["type", "Types", "classes, structs, interfaces"],
  ["operator", "Operators", "punctuation with semantic weight"],
  ["trivial", "Comments", "comments and low-emphasis tokens"]
];

const setThemeVars = (theme) => {
  const root = document.documentElement;

  Object.entries(theme.uiGroups).forEach(([key, value]) => {
    root.style.setProperty(`--ui-${toKebab(key)}`, value);
  });

  Object.entries(theme.syntaxGroups).forEach(([key, value]) => {
    root.style.setProperty(`--syntax-${toKebab(key)}`, value);
  });

  Object.entries(theme.versionControlGroups).forEach(([key, value]) => {
    root.style.setProperty(`--version-${toKebab(key)}`, value);
  });

  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${toKebab(key)}`, value);
  });

  Object.entries(theme.ansiGroups.normal).forEach(([key, value]) => {
    root.style.setProperty(`--ansi-${toKebab(key)}`, value);
  });
};

const toKebab = (value) => value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const labelFromKey = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (character) => character.toUpperCase());

const getCurrentTheme = () => definitions.themes[document.documentElement.dataset.mode || "dark"];
const initialMode = localStorage.getItem("metis-preview-mode") || "dark";

document.documentElement.dataset.mode = initialMode;
setThemeVars(definitions.themes[initialMode]);

class MetisDemo extends HTMLElement {
  connectedCallback() {
    this.mode = localStorage.getItem("metis-preview-mode") || "dark";
    this.render();
    this.applyMode();
  }

  applyMode() {
    const theme = definitions.themes[this.mode];
    this.dataset.mode = this.mode;
    document.documentElement.dataset.mode = this.mode;
    setThemeVars(theme);

    this.querySelectorAll("[data-mode-option]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.modeOption === this.mode));
    });

    document.dispatchEvent(new CustomEvent("metis-mode-change", { detail: { mode: this.mode } }));
  }

  setMode(mode) {
    this.mode = mode;
    localStorage.setItem("metis-preview-mode", mode);
    this.applyMode();
  }

  render() {
    this.innerHTML = `
      <header class="topbar">
        <a class="brand" href="#preview" aria-label="Metis preview home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>
            <strong>Metis</strong>
            <small>Theme definitions</small>
          </span>
        </a>
        <div class="mode-control" aria-label="Theme mode">
          <button type="button" data-mode-option="dark">Dark</button>
          <button type="button" data-mode-option="light">Light</button>
        </div>
      </header>

      <main>
        <section class="hero" aria-labelledby="metis-title">
          <div class="hero-copy">
            <p class="eyebrow">Jupiter inner moon, developer theme system</p>
            <h1 id="metis-title">Metis</h1>
            <p class="lede">A two-mode palette generated for terminals, editors, and syntax renderers from one portable definition file.</p>
          </div>
          <dl class="stats" aria-label="Theme coverage">
            <div>
              <dt>${Object.keys(definitions.palette).length}</dt>
              <dd>accents</dd>
            </div>
            <div>
              <dt>2</dt>
              <dd>modes</dd>
            </div>
            <div>
              <dt>${exportTargets.length}</dt>
              <dd>targets</dd>
            </div>
          </dl>
        </section>

        <metis-workbench id="preview"></metis-workbench>

        <section class="lower-grid" aria-label="Palette and export details">
          <metis-palette-grid></metis-palette-grid>
          <metis-export-grid></metis-export-grid>
        </section>
      </main>
    `;

    this.querySelectorAll("[data-mode-option]").forEach((button) => {
      button.addEventListener("click", () => this.setMode(button.dataset.modeOption));
    });
  }
}

class MetisWorkbench extends HTMLElement {
  connectedCallback() {
    this.surface = "code";
    this.render();
  }

  setSurface(surface) {
    this.surface = surface;
    this.render();
  }

  render() {
    const surfaceLabels = [
      ["code", "Code"],
      ["terminal", "Terminal"],
      ["exports", "Exports"]
    ];

    this.innerHTML = `
      <section class="workbench" aria-label="Metis preview workbench">
        <div class="window-bar">
          <div class="window-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span class="window-title">definitions/metis.json</span>
          <div class="surface-tabs" aria-label="Preview surface">
            ${surfaceLabels
              .map(
                ([value, label]) =>
                  `<button type="button" data-surface="${value}" aria-pressed="${value === this.surface}">${label}</button>`
              )
              .join("")}
          </div>
        </div>
        <div class="workbench-body">
          <aside class="role-rail" aria-label="Syntax roles">
            ${roleRows
              .map(
                ([role, title, detail]) => `
                  <div class="role-row" style="--role-color: var(--syntax-${role})">
                    <span></span>
                    <strong>${title}</strong>
                    <small>${detail}</small>
                  </div>
                `
              )
              .join("")}
          </aside>
          <div class="preview-surface">
            ${this.renderSurface()}
          </div>
        </div>
      </section>
    `;

    this.querySelectorAll("[data-surface]").forEach((button) => {
      button.addEventListener("click", () => this.setSurface(button.dataset.surface));
    });
  }

  renderSurface() {
    if (this.surface === "terminal") {
      return `<metis-terminal-preview></metis-terminal-preview>`;
    }

    if (this.surface === "exports") {
      return `<metis-export-preview></metis-export-preview>`;
    }

    return `<metis-code-preview></metis-code-preview>`;
  }
}

class MetisCodePreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="file-tabs" aria-label="Open files">
        <span aria-selected="true">theme.ts</span>
        <span>metis.json</span>
        <span>palette.css</span>
      </div>
      <pre class="code-sample" aria-label="Code syntax sample"><code>${codeLines
        .map((line, index) => `<span class="code-line"><span class="line-number">${index + 1}</span><span class="code-content">${line.map(([role, value]) => `<span class="token token-${role}">${escapeHtml(value)}</span>`).join("")}</span></span>`)
        .join("\n")}</code></pre>
      <div class="diff-strip" aria-label="Version control colors">
        <span class="added">added</span>
        <span class="modified">modified</span>
        <span class="removed">removed</span>
        <span class="renamed">renamed</span>
      </div>
    `;
  }
}

class MetisTerminalPreview extends HTMLElement {
  connectedCallback() {
    const ansiRows = Object.keys(definitions.themes.dark.ansiGroups.normal)
      .map((name) => `<span style="--ansi: var(--ansi-${name})"><b></b>${name}</span>`)
      .join("");

    this.innerHTML = `
      <div class="terminal-preview">
        <p><span class="prompt">metis</span> npm run build</p>
        <p><span class="muted">generated</span> ghostty, iterm, xcode, vscode, shiki, vim, prismjs</p>
        <p><span class="prompt">metis</span> npm test</p>
        <p><span class="success">ok</span> definitions, json, plist, vim, vscode</p>
        <div class="ansi-row" aria-label="ANSI colors">${ansiRows}</div>
      </div>
    `;
  }
}

class MetisExportPreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="export-preview">
        ${exportTargets
          .slice(0, 4)
          .map(
            (target) => `
              <article>
                <span>${target.group}</span>
                <strong>${target.name}</strong>
                <small>${target.files[0]}</small>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }
}

class MetisPaletteGrid extends HTMLElement {
  connectedCallback() {
    this.render();
    document.addEventListener("metis-mode-change", () => this.updateValues());
  }

  render() {
    this.innerHTML = `
      <section class="section-block" aria-labelledby="palette-title">
        <div class="section-heading">
          <p class="eyebrow">Palette</p>
          <h2 id="palette-title">Expanded accents with mode-aware values.</h2>
        </div>
        <div class="swatch-grid">
          ${Object.keys(definitions.palette)
            .map(
              (name) => `
                <button type="button" class="swatch" data-copy-color="${name}">
                  <span class="swatch-color" style="background: var(--color-${name})"></span>
                  <span>${labelFromKey(name)}</span>
                  <code data-color-name="${name}"></code>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
    `;

    this.updateValues();
    this.querySelectorAll("[data-copy-color]").forEach((button) => {
      button.addEventListener("click", async () => {
        const color = getCurrentTheme().colors[button.dataset.copyColor];

        if (navigator.clipboard) {
          await navigator.clipboard.writeText(color);
        }

        button.dataset.copied = "true";
        window.setTimeout(() => {
          delete button.dataset.copied;
        }, 1200);
      });
    });
  }

  updateValues() {
    const theme = getCurrentTheme();

    this.querySelectorAll("[data-color-name]").forEach((node) => {
      node.textContent = theme.colors[node.dataset.colorName];
    });
  }
}

class MetisExportGrid extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section-block" aria-labelledby="exports-title">
        <div class="section-heading">
          <p class="eyebrow">Generated Targets</p>
          <h2 id="exports-title">One source definition, only the formats this project supports.</h2>
        </div>
        <div class="target-grid">
          ${exportTargets
            .map(
              (target) => `
                <article class="target-card">
                  <span>${target.group}</span>
                  <strong>${target.name}</strong>
                  <p>${target.description}</p>
                  <code>${escapeHtml(target.files.join("  "))}</code>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }
}

customElements.define("metis-demo", MetisDemo);
customElements.define("metis-workbench", MetisWorkbench);
customElements.define("metis-code-preview", MetisCodePreview);
customElements.define("metis-terminal-preview", MetisTerminalPreview);
customElements.define("metis-export-preview", MetisExportPreview);
customElements.define("metis-palette-grid", MetisPaletteGrid);
customElements.define("metis-export-grid", MetisExportGrid);
