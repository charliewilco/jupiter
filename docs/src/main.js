import definitions from "../../definitions/metis.json";

const exportTargets = [
  {
    name: "Ghostty",
    group: "Terminal",
    files: ["ghostty/metis-dark", "ghostty/metis-light"]
  },
  {
    name: "iTerm2",
    group: "Terminal",
    files: ["iterm/Metis Dark.itermcolors", "iterm/Metis Light.itermcolors"]
  },
  {
    name: "Xcode",
    group: "Editor",
    files: ["xcode/Metis Dark.xccolortheme", "xcode/Metis Light.xccolortheme"]
  },
  {
    name: "VSCode",
    group: "Editor",
    files: ["vscode/themes/metis-dark-color-theme.json", "vscode/themes/metis-light-color-theme.json"]
  },
  {
    name: "Shiki",
    group: "Renderer",
    files: ["shiki/metis-dark.json", "shiki/metis-light.json"]
  },
  {
    name: "Vim",
    group: "Editor",
    files: ["colors/metis.vim", "autoload/airline/themes/metis.vim"]
  },
  {
    name: "PrismJS",
    group: "Renderer",
    files: ["prismjs/metis.css"]
  },
  {
    name: "Definitions",
    group: "Source",
    files: ["definitions/metis.json"]
  }
];

const codeLines = [
  [
    ["keyword", "const"],
    ["plain", " token"],
    ["operator", " = "],
    ["function", "resolveSyntaxRole"],
    ["plain", "("],
    ["string", "\"statement\""],
    ["plain", ");"]
  ],
  [
    ["keyword", "if"],
    ["plain", " ("],
    ["property", "token"],
    ["operator", " === "],
    ["property", "palette"],
    ["plain", "."],
    ["property", "amber"],
    ["plain", ") {"]
  ],
  [
    ["plain", "  "],
    ["keyword", "return"],
    ["plain", " "],
    ["type", "ThemeTarget"],
    ["plain", "."],
    ["property", "shiki"],
    ["plain", ";"]
  ],
  [
    ["plain", "}"]
  ],
  [
    ["comment", "// One palette writes every supported editor and renderer target."]
  ],
  [
    ["keyword", "await"],
    ["plain", " "],
    ["function", "writeTheme"],
    ["plain", "({ "],
    ["property", "mode"],
    ["operator", ": "],
    ["string", "\"light\""],
    ["plain", ", "],
    ["property", "targets"],
    ["operator", ": "],
    ["number", "8"],
    ["plain", " });"]
  ]
];

const roleRows = [
  ["statement", "Statement", "keyword, storage, control"],
  ["identifier", "Identifier", "functions, methods, symbols"],
  ["constant", "Constant", "properties, enums, attributes"],
  ["type", "Type", "classes, structs, interfaces"],
  ["string", "String", "quoted content"],
  ["number", "Number", "numeric literals"],
  ["operator", "Operator", "punctuation, separators"],
  ["trivial", "Trivial", "comments, inactive text"]
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
const getInitialMode = () => localStorage.getItem("metis-preview-mode") || "dark";

document.documentElement.dataset.mode = getInitialMode();
setThemeVars(definitions.themes[getInitialMode()]);

class MetisDemo extends HTMLElement {
  connectedCallback() {
    this.mode = getInitialMode();
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
      <header class="masthead">
        <div class="identity">
          <div>
            <h1>Metis</h1>
            <p>Theme specimen · ${definitions.version}</p>
          </div>
        </div>
        <div class="mode-control" aria-label="Theme mode">
          <button type="button" data-mode-option="dark">Dark</button>
          <button type="button" data-mode-option="light">Light</button>
        </div>
      </header>

      <main>
        <section class="specimen-grid" aria-label="Metis specimen">
          <section class="specimen-panel lead-panel" aria-labelledby="overview-title">
            <p class="section-kicker">Overview</p>
            <h2 id="overview-title">Source-driven themes for the tools this repo actually ships.</h2>
            <p>The preview reads the checked-in Metis definitions and renders the current mode. The same source writes Ghostty, iTerm2, Xcode, VSCode, Shiki, Vim, and PrismJS outputs.</p>
            <dl class="overview-list">
              <div>
                <dt>Source</dt>
                <dd><code>definitions/metis.json</code></dd>
              </div>
              <div>
                <dt>Palette</dt>
                <dd>${Object.keys(definitions.palette).length} accents, ${Object.keys(definitions.themes.dark.syntaxGroups).length} syntax roles</dd>
              </div>
              <div>
                <dt>Build</dt>
                <dd><code>npm run build</code></dd>
              </div>
            </dl>
          </section>

          <metis-code-specimen></metis-code-specimen>
          <metis-role-table></metis-role-table>
          <metis-palette-grid></metis-palette-grid>
          <metis-terminal-specimen></metis-terminal-specimen>
          <metis-export-table></metis-export-table>
        </section>
      </main>
    `;

    this.querySelectorAll("[data-mode-option]").forEach((button) => {
      button.addEventListener("click", () => this.setMode(button.dataset.modeOption));
    });
  }
}

class MetisCodeSpecimen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="specimen-panel code-panel" aria-labelledby="code-title">
        <div class="panel-heading">
          <div>
            <p class="section-kicker">Code</p>
            <h2 id="code-title">Token contrast</h2>
          </div>
          <code>theme.ts</code>
        </div>
        <pre class="code-sample" aria-label="Code syntax sample"><code>${codeLines
          .map((line, index) => `<span class="code-line"><span class="line-number">${index + 1}</span><span class="code-content">${line.map(([role, value]) => `<span class="token token-${role}">${escapeHtml(value)}</span>`).join("")}</span></span>`)
          .join("\n")}</code></pre>
        <div class="version-strip" aria-label="Version control colors">
          <span class="added">added</span>
          <span class="modified">modified</span>
          <span class="removed">removed</span>
          <span class="renamed">renamed</span>
        </div>
      </section>
    `;
  }
}

class MetisRoleTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="specimen-panel role-panel" aria-labelledby="roles-title">
        <div class="panel-heading">
          <div>
            <p class="section-kicker">Roles</p>
            <h2 id="roles-title">Syntax mapping</h2>
          </div>
        </div>
        <div class="role-list">
          ${roleRows
            .map(
              ([role, label, detail]) => `
                <div class="role-row">
                  <span class="sample-dot" style="--sample-color: var(--syntax-${role})"></span>
                  <strong>${label}</strong>
                  <span>${detail}</span>
                  <code>${getCurrentTheme().syntaxGroups[role]}</code>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
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
      <section class="specimen-panel palette-panel" aria-labelledby="palette-title">
        <div class="panel-heading">
          <div>
            <p class="section-kicker">Palette</p>
            <h2 id="palette-title">Accent values</h2>
          </div>
          <span class="hint">Click to copy</span>
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

        try {
          await navigator.clipboard?.writeText(color);
          button.dataset.copied = "true";
          window.setTimeout(() => {
            delete button.dataset.copied;
          }, 900);
        } catch {
          button.dataset.copied = "false";
        }
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

class MetisTerminalSpecimen extends HTMLElement {
  connectedCallback() {
    const ansiRows = Object.keys(definitions.themes.dark.ansiGroups.normal)
      .map((name) => `<span class="ansi-item"><b style="--ansi: var(--ansi-${name})"></b>${name}</span>`)
      .join("");

    this.innerHTML = `
      <section class="specimen-panel terminal-panel" aria-labelledby="terminal-title">
        <div class="panel-heading">
          <div>
            <p class="section-kicker">Terminal</p>
            <h2 id="terminal-title">ANSI ramp</h2>
          </div>
          <code>Ghostty / iTerm2</code>
        </div>
        <div class="terminal-body">
          <p><span>metis</span> npm run build</p>
          <p>Generated 16 artifacts from <em>definitions/metis.json</em></p>
          <p><span>metis</span> npm test</p>
          <p><strong>ok</strong> json, plist, vim, vscode</p>
        </div>
        <div class="ansi-row" aria-label="ANSI colors">${ansiRows}</div>
      </section>
    `;
  }
}

class MetisExportTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="specimen-panel export-panel" aria-labelledby="exports-title">
        <div class="panel-heading">
          <div>
            <p class="section-kicker">Outputs</p>
            <h2 id="exports-title">Generated files</h2>
          </div>
        </div>
        <div class="target-table">
          ${exportTargets
            .map(
              (target) => `
                <article class="target-row">
                  <span>${target.group}</span>
                  <strong>${target.name}</strong>
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
customElements.define("metis-code-specimen", MetisCodeSpecimen);
customElements.define("metis-role-table", MetisRoleTable);
customElements.define("metis-palette-grid", MetisPaletteGrid);
customElements.define("metis-terminal-specimen", MetisTerminalSpecimen);
customElements.define("metis-export-table", MetisExportTable);
