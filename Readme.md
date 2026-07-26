# Metis

Metis is a color system and theme set for terminal, editor, and syntax highlighting surfaces.

Supported targets:

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
yarn build
```

The build writes every generated artifact from `metis/index.js`.

```sh
yarn test
```

The test command validates the core package and verifies generated artifacts are current.

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
