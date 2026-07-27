# Jupiter

Jupiter is a generated color system for terminals, editors, syntax highlighters, and Codex-compatible theme consumers.

It ships four variants, each with a dark and light mode:

- Metis: the default Jupiter palette.
- Ganymede: the archived original palette, preserved as a generated pair.
- Callisto: a higher-contrast dark-space palette.
- Europa: a quieter icy palette.

Artifact slugs use `<variant>-<mode>`, such as `metis-dark`, `ganymede-light`, `callisto-dark`, and `europa-light`.

## Outputs

- Codex: `codex/*.json`
- Ghostty: `ghostty/*`
- iTerm2: `iterm/*.itermcolors`
- Xcode: `xcode/*.xccolortheme`
- VS Code: `vscode/themes/*.json`
- Shiki: `shiki/*.json`
- Vim: `colors/*.vim` and `autoload/airline/themes/*.vim`
- PrismJS: `prismjs/jupiter.css`
- Generic definitions: `definitions/jupiter.json`

## Install

Run `npm run build` first if you have changed the source palette in `jupiter/index.js`.

### Codex

Jupiter currently exports Codex theme artifacts as VS Code-shaped JSON files in `codex/`.

The [Codex CLI customization docs](https://developers.openai.com/codex/cli-customization) currently describe custom theme loading as `.tmTheme` files in `$CODEX_HOME/themes`, selected through `/theme`, so the files in `codex/` are not drop-in CLI theme files yet. Use them as source data for Codex-compatible consumers, or convert a generated theme to `.tmTheme` before installing it into Codex CLI.

### Ghostty

Copy the Ghostty theme files into your Ghostty themes directory:

```sh
mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/ghostty/themes"
cp ghostty/* "${XDG_CONFIG_HOME:-$HOME/.config}/ghostty/themes/"
```

Then set the theme in your Ghostty config:

```conf
theme = metis-dark
```

Use any generated slug, such as `metis-light`, `ganymede-dark`, `callisto-light`, or `europa-dark`.

### iTerm2

Import the generated `.itermcolors` files from `iterm/`:

1. Open iTerm2 Settings.
2. Select a profile.
3. Open Colors.
4. Open Color Presets.
5. Choose Import, then select one or more files from `iterm/`.
6. Select the imported preset from Color Presets.

### Xcode

Install the generated Xcode color themes into Xcode's user theme directory:

```sh
mkdir -p "$HOME/Library/Developer/Xcode/UserData/FontAndColorThemes"
cp xcode/*.xccolortheme "$HOME/Library/Developer/Xcode/UserData/FontAndColorThemes/"
```

Restart Xcode, then select the theme in Xcode Settings under Themes.

### VS Code

Package and install the VS Code extension locally:

```sh
cd vscode
npm exec --yes -- @vscode/vsce package --no-dependencies
code --install-extension jupiter-vscode-theme-3.0.0.vsix
```

Then run the `Preferences: Color Theme` command and choose one of the Jupiter themes.

### Shiki

Use the generated Shiki JSON files directly:

```js
import { codeToHtml } from "shiki";
import metisDark from "./shiki/metis-dark.json" with { type: "json" };

const html = await codeToHtml(source, {
	lang: "ts",
	theme: metisDark,
});
```

### Vim

Install the repository with your plugin manager. With `vim-plug`:

```vim
Plug 'charliewilco/jupiter'
```

Then choose a variant and load the shared Jupiter colorscheme:

```vim
let g:jupiter_variant = "metis"
set background=dark
colorscheme jupiter
let g:airline_theme = "jupiter"
```

Use `set background=light` for the light mode. Supported variants are `metis`, `ganymede`, `callisto`, and `europa`.

You can also load the variant colorschemes directly:

```vim
set background=dark
colorscheme metis
let g:airline_theme = "metis"
```

For manual Vim installation:

```sh
mkdir -p "$HOME/.vim/colors" "$HOME/.vim/autoload/airline/themes"
cp colors/*.vim "$HOME/.vim/colors/"
cp autoload/airline/themes/*.vim "$HOME/.vim/autoload/airline/themes/"
```

For Neovim:

```sh
mkdir -p "$HOME/.config/nvim/colors" "$HOME/.config/nvim/autoload/airline/themes"
cp colors/*.vim "$HOME/.config/nvim/colors/"
cp autoload/airline/themes/*.vim "$HOME/.config/nvim/autoload/airline/themes/"
```

### PrismJS

Load PrismJS first, then load `prismjs/jupiter.css`:

```html
<link rel="stylesheet" href="/path/to/prism.css" /> <link rel="stylesheet" href="/path/to/jupiter.css" />
```

Scope a code block with a generated theme class or `data-theme` value:

```html
<pre class="metis-dark"><code class="language-js">const theme = "jupiter";</code></pre>
<pre data-theme="europa-light"><code class="language-css">:root { color-scheme: light; }</code></pre>
```

Supported Prism scopes are `metis-dark`, `metis-light`, `ganymede-dark`, `ganymede-light`, `callisto-dark`, `callisto-light`, `europa-dark`, and `europa-light`.

## Package

The `jupiter` package exports the Metis dark theme as its default compatibility surface plus explicit variant definitions:

```js
const Jupiter = require("jupiter");

Jupiter.themes.dark;
Jupiter.themes.light;
Jupiter.variants.metis.themes.dark;
Jupiter.variants.ganymede.themes.dark;
Jupiter.variants.callisto.themes.dark;
Jupiter.variants.europa.themes.dark;
Jupiter.definitions;
```

From this repository, install the package workspace directly:

```sh
npm install ./jupiter
```

## Build

```sh
npm run build
```

The build writes every generated artifact from `jupiter/index.js`.

```sh
npm test
```

The test command validates the core package, verifies generated artifacts are current, checks JSON and plist outputs, smoke-tests Vim, and packages the VS Code theme.

## Demo

The previewer lives at https://charliewilco.github.io/jupiter/.

The previewer source lives in `docs/` and is built by Parcel in GitHub Actions. On pushes to `master` or `main`, `.github/workflows/deploy-demo.yml` builds `docs/index.html` into `docs-dist/` and publishes that output to the `gh-pages` branch.
