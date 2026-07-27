set nomore

let s:variants = ["metis", "ganymede", "callisto", "europa"]
let s:modes = ["dark", "light"]
let s:modern_groups = [
	\ "DiagnosticError",
	\ "DiagnosticWarn",
	\ "DiagnosticInfo",
	\ "DiagnosticHint",
	\ "DiagnosticUnderlineError",
	\ "DiagnosticUnderlineWarn",
	\ "DiagnosticUnderlineInfo",
	\ "DiagnosticUnderlineHint",
	\ "LspInlayHint",
	\ "NormalFloat",
	\ "FloatBorder",
	\ "PmenuMatch",
	\ "QuickFixLine",
	\ "GitSignsAdd",
	\ "GitSignsChange",
	\ "GitSignsDelete",
	\ ]
let s:nvim_capture_groups = [
	\ "@function",
	\ "@type",
	\ "@property",
	\ "@keyword",
	\ "@diff.plus",
	\ "@diff.minus",
	\ ]

function! s:LoadDirect(variant, mode) abort
	execute "set background=" . a:mode
	execute "colorscheme " . a:variant
endfunction

function! s:LoadJupiter(variant, mode) abort
	let g:jupiter_variant = a:variant
	execute "set background=" . a:mode
	colorscheme jupiter
endfunction

function! s:ColorSnapshot() abort
	return {
		\ "colors_name": get(g:, "colors_name", ""),
		\ "normal_fg": synIDattr(hlID("Normal"), "fg#"),
		\ "normal_bg": synIDattr(hlID("Normal"), "bg#"),
		\ "comment_fg": synIDattr(hlID("Comment"), "fg#"),
		\ "terminal_0": get(g:, "terminal_color_0", ""),
		\ "terminal_1": get(g:, "terminal_color_1", ""),
		\ "terminal_7": get(g:, "terminal_color_7", ""),
		\ "terminal_15": get(g:, "terminal_color_15", ""),
		\ }
endfunction

function! s:HighlightSnapshot(groups) abort
	let l:snapshot = {}

	for l:group in a:groups
		let l:id = hlID(l:group)
		let l:snapshot[l:group] = {
			\ "fg": synIDattr(l:id, "fg#"),
			\ "bg": synIDattr(l:id, "bg#"),
			\ "style": synIDattr(l:id, "name"),
			\ }
	endfor

	return l:snapshot
endfunction

function! s:AssertGroupsDefined(groups, label) abort
	let l:snapshot = s:HighlightSnapshot(a:groups)

	for l:group in a:groups
		let l:highlight = l:snapshot[l:group]
		let l:value = l:highlight.fg . l:highlight.bg . l:highlight.style
		call assert_true(!empty(l:value), a:label . " should define " . l:group)
	endfor
endfunction

function! s:AirlineSnapshot(theme) abort
	return get(g:, "airline#themes#" . a:theme . "#palette", {})
endfunction

function! s:LoadDirectAirline(variant, mode) abort
	unlet! g:airline#themes#metis#palette
	unlet! g:airline#themes#ganymede#palette
	unlet! g:airline#themes#callisto#palette
	unlet! g:airline#themes#europa#palette
	execute "set background=" . a:mode
	execute "runtime autoload/airline/themes/" . a:variant . ".vim"
	return s:AirlineSnapshot(a:variant)
endfunction

function! s:LoadJupiterAirline(variant, mode) abort
	unlet! g:airline#themes#jupiter#palette
	let g:jupiter_variant = a:variant
	execute "set background=" . a:mode
	runtime autoload/airline/themes/jupiter.vim
	return s:AirlineSnapshot("jupiter")
endfunction

for s:mode in s:modes
	for s:variant in s:variants
		call s:LoadDirect(s:variant, s:mode)
		let s:direct = s:ColorSnapshot()
		let s:direct_modern = s:HighlightSnapshot(s:modern_groups)

		call s:LoadJupiter(s:variant, s:mode)
		call assert_equal(s:direct, s:ColorSnapshot(), "colorscheme jupiter should match " . s:variant . " " . s:mode)
		call assert_equal(s:direct_modern, s:HighlightSnapshot(s:modern_groups), "modern highlights should match " . s:variant . " " . s:mode)
		call s:AssertGroupsDefined(s:modern_groups, s:variant . " " . s:mode)

		if has("nvim")
			call s:AssertGroupsDefined(s:nvim_capture_groups, s:variant . " " . s:mode)
		endif

		let s:direct_airline = s:LoadDirectAirline(s:variant, s:mode)
		let s:jupiter_airline = s:LoadJupiterAirline(s:variant, s:mode)
		call assert_equal(s:direct_airline, s:jupiter_airline, "airline jupiter should match " . s:variant . " " . s:mode)
	endfor
endfor

unlet! g:jupiter_variant
set background=dark
colorscheme metis
let s:default = s:ColorSnapshot()
colorscheme jupiter
call assert_equal(s:default, s:ColorSnapshot(), "colorscheme jupiter should default to metis")

let g:jupiter_variant = ""
colorscheme jupiter
call assert_equal(s:default, s:ColorSnapshot(), "empty g:jupiter_variant should default to metis")

let g:jupiter_variant = "not-a-moon"
try
	colorscheme jupiter
	call assert_report("invalid g:jupiter_variant should fail")
catch /Jupiter variant must be one of/
endtry

if !empty(v:errors)
	for s:error in v:errors
		echoerr s:error
	endfor
	cquit
endif

qa!
