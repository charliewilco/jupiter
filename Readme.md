# Metis

Metis is a color system and theme set for terminal, editor, and syntax highlighting surfaces.

Supported targets:

- Codex: `codex/metis-dark.json`, `codex/metis-light.json`
- Ghostty: `ghostty/metis-dark`, `ghostty/metis-light`
- iTerm2: `iterm/Metis Dark.itermcolors`, `iterm/Metis Light.itermcolors`
- Xcode: `xcode/Metis Dark.xccolortheme`, `xcode/Metis Light.xccolortheme`
- VSCode: `vscode/themes/metis-dark-color-theme.json`, `vscode/themes/metis-light-color-theme.json`
- Shiki: `shiki/metis-dark.json`, `shiki/metis-light.json`
- Vim: `colors/metis.vim`, `autoload/airline/themes/metis.vim`
- PrismJS: `prismjs/metis.css`
- Generic definitions: `definitions/metis.json`

## Build

```sh
npm run build
```

The build writes every generated artifact from `metis/index.js`.

```sh
npm test
```

The test command validates the core package, verifies generated artifacts are current, checks JSON and plist outputs, smoke-tests Vim, and packages the VSCode theme.

## Demo

The previewer lives at https://charliewilco.github.io/metis/.

The previewer source lives in `docs/` and is built by Parcel in GitHub Actions. On pushes to `master`, `.github/workflows/deploy-demo.yml` builds `docs/index.html` into `docs-dist/` and publishes that output to the `gh-pages` branch.

## Vim

```vim
set background=dark
colorscheme metis
let g:airline_theme = "metis"
```

Use `set background=light` before loading the colorscheme for the light variant.

## PrismJS

Load `prismjs/metis.css` and scope code blocks with either `.metis-dark`, `.metis-light`, `data-theme="metis-dark"`, or `data-theme="metis-light"`.

## Package

The `metis` package exports the dark theme as its default compatibility surface plus explicit definitions:

```js
const Metis = require("metis");

Metis.themes.dark;
Metis.themes.light;
Metis.definitions;
```
