import definitions from "../../definitions/metis.json";

const toKebab = (value) => value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const getInitialMode = () => localStorage.getItem("metis-preview-mode") || "dark";
const getCurrentTheme = () => definitions.themes[document.documentElement.dataset.mode || "dark"];

const setText = (selector, value) => {
  const node = document.querySelector(selector);

  if (node) {
    node.textContent = value;
  }
};

const setThemeVars = (theme) => {
  const root = document.documentElement;
  const groups = [
    ["ui", theme.uiGroups],
    ["syntax", theme.syntaxGroups],
    ["version", theme.versionControlGroups],
    ["color", theme.colors],
    ["ansi", theme.ansiGroups.normal]
  ];

  groups.forEach(([prefix, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      root.style.setProperty(`--${prefix}-${toKebab(key)}`, value);
    });
  });
};

const bindSwatches = () => {
  document.querySelectorAll("[data-copy-color]").forEach((button) => {
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
};

const updateValues = () => {
  const theme = getCurrentTheme();

  document.querySelectorAll("[data-color-name]").forEach((node) => {
    node.textContent = theme.colors[node.dataset.colorName];
  });

  document.querySelectorAll("[data-role-value]").forEach((node) => {
    node.textContent = theme.syntaxGroups[node.dataset.roleValue];
  });
};

const cacheIconSources = () => {
  document.querySelectorAll("[data-icon-target]").forEach((picture) => {
    picture.querySelectorAll("[data-icon-mode]").forEach((source) => {
      picture.dataset[`${source.dataset.iconMode}Icon`] = source.srcset;
    });
  });
};

const updateIcons = () => {
  const mode = document.documentElement.dataset.mode || "dark";

  document.querySelectorAll("[data-icon-target]").forEach((picture) => {
    const src = picture.dataset[`${mode}Icon`];

    if (!src) {
      return;
    }

    picture.querySelectorAll("source").forEach((source) => {
      source.srcset = src;
    });

    const image = picture.querySelector("img");

    if (image) {
      image.src = src;
    }
  });
};

const setMode = (mode) => {
  document.documentElement.dataset.mode = mode;
  localStorage.setItem("metis-preview-mode", mode);
  setThemeVars(definitions.themes[mode]);
  updateValues();
  updateIcons();

  document.querySelectorAll("[data-mode-option]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.modeOption === mode));
  });
};

setText("[data-version]", definitions.version);
setText("[data-palette-count]", Object.keys(definitions.palette).length);
setText("[data-role-count]", Object.keys(definitions.themes.dark.syntaxGroups).length);

cacheIconSources();
bindSwatches();

document.querySelectorAll("[data-mode-option]").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.modeOption));
});

setMode(getInitialMode());
