function e(e){return e&&e.__esModule?e.default:e}var t={};t=JSON.parse('{"name":"Metis","slug":"metis","version":"3.0.0","palette":{"cyan":"#00A6D6","blue":"#3D8BFF","indigo":"#7C83FF","violet":"#A774FF","magenta":"#D85FAF","rose":"#F05F84","red":"#E0524D","orange":"#E87743","amber":"#D99A00","yellow":"#D8B92E","green":"#62AD58","mint":"#3FB997"},"roles":{"syntax":{"constant":"cyan","identifier":"blue","statement":"amber","type":"green","global":"violet","emphasis":"magenta","special":"orange","string":"mint","regexp":"rose","number":"yellow","operator":"indigo","tag":"blue","attribute":"cyan","deleted":"red","inserted":"green","changed":"amber"},"ui":{"userActionNeeded":"red","userCurrentState":"cyan"}},"themes":{"dark":{"name":"Metis Dark","slug":"metis-dark","type":"dark","colors":{"cyan":"#43C7E8","blue":"#69A7FF","indigo":"#9AA2FF","violet":"#BC8FFF","magenta":"#EF78C4","rose":"#FF7698","red":"#FF6B62","orange":"#FF9159","amber":"#F2B339","yellow":"#E7CF5B","green":"#82C66F","mint":"#5DD4AF"},"grays":{"gray0":"#070B10","gray1":"#0B1117","gray2":"#182531","gray3":"#415466","gray4":"#738492","gray5":"#AAB8C3","gray6":"#DCE7EF"},"uiGroups":{"backgroundShade":"#070B10","background":"#0B1117","backgroundElevated":"#111A23","backgroundMuted":"#182531","selection":"#1F5367","foreground":"#DCE7EF","foregroundMuted":"#AAB8C3","foregroundSubtle":"#738492","border":"#2A3A47","line":"#415466","userActionNeeded":"#FF6B62","userCurrentState":"#43C7E8","gray0":"#070B10","gray1":"#0B1117","gray2":"#182531","gray3":"#415466","gray4":"#738492","gray5":"#AAB8C3","gray6":"#DCE7EF"},"syntaxGroups":{"constant":"#43C7E8","identifier":"#69A7FF","statement":"#F2B339","type":"#82C66F","global":"#BC8FFF","emphasis":"#EF78C4","special":"#FF9159","string":"#5DD4AF","regexp":"#FF7698","number":"#E7CF5B","operator":"#9AA2FF","tag":"#69A7FF","attribute":"#43C7E8","trivial":"#738492"},"versionControlGroups":{"added":"#82C66F","modified":"#F2B339","removed":"#FF6B62","renamed":"#69A7FF"},"ansiGroups":{"normal":{"black":"#0B1117","red":"#FF6B62","green":"#82C66F","yellow":"#F2B339","blue":"#69A7FF","magenta":"#EF78C4","cyan":"#43C7E8","white":"#DCE7EF"},"bright":{"black":"#738492","red":"#FF7698","green":"#5DD4AF","yellow":"#E7CF5B","blue":"#9AA2FF","magenta":"#BC8FFF","cyan":"#43C7E8","white":"#F5FAFD"}}},"light":{"name":"Metis Light","slug":"metis-light","type":"light","colors":{"cyan":"#007FA8","blue":"#1B67D7","indigo":"#555FCE","violet":"#7A4BC2","magenta":"#AD3E86","rose":"#C83C62","red":"#B93532","orange":"#B85727","amber":"#9D7100","yellow":"#846F00","green":"#3F7F38","mint":"#1F876D"},"grays":{"gray0":"#DCE8EF","gray1":"#F8FBFD","gray2":"#DDE8EF","gray3":"#9DAFBB","gray4":"#708390","gray5":"#4A5E6B","gray6":"#172530"},"uiGroups":{"backgroundShade":"#DCE8EF","background":"#F8FBFD","backgroundElevated":"#EEF5F8","backgroundMuted":"#DDE8EF","selection":"#B9DCE8","foreground":"#172530","foregroundMuted":"#4A5E6B","foregroundSubtle":"#708390","border":"#C7D5DE","line":"#9DAFBB","userActionNeeded":"#B93532","userCurrentState":"#007FA8","gray0":"#DCE8EF","gray1":"#F8FBFD","gray2":"#DDE8EF","gray3":"#9DAFBB","gray4":"#708390","gray5":"#4A5E6B","gray6":"#172530"},"syntaxGroups":{"constant":"#007FA8","identifier":"#1B67D7","statement":"#9D7100","type":"#3F7F38","global":"#7A4BC2","emphasis":"#AD3E86","special":"#B85727","string":"#1F876D","regexp":"#C83C62","number":"#846F00","operator":"#555FCE","tag":"#1B67D7","attribute":"#007FA8","trivial":"#708390"},"versionControlGroups":{"added":"#3F7F38","modified":"#9D7100","removed":"#B93532","renamed":"#1B67D7"},"ansiGroups":{"normal":{"black":"#F8FBFD","red":"#B93532","green":"#3F7F38","yellow":"#9D7100","blue":"#1B67D7","magenta":"#AD3E86","cyan":"#007FA8","white":"#172530"},"bright":{"black":"#708390","red":"#C83C62","green":"#1F876D","yellow":"#846F00","blue":"#555FCE","magenta":"#7A4BC2","cyan":"#007FA8","white":"#FFFFFF"}}}}}');let a=[{name:"Ghostty",group:"Terminal",description:"Native dark and light terminal palettes with ANSI groups generated from the same source.",files:["ghostty/metis-dark","ghostty/metis-light"]},{name:"iTerm2",group:"Terminal",description:"Installable .itermcolors files for the expanded Metis color system.",files:["iterm/Metis Dark.itermcolors","iterm/Metis Light.itermcolors"]},{name:"Xcode",group:"Editor",description:"Xcode themes for Swift, Objective-C, plist, and build log workflows.",files:["xcode/Metis Dark.xccolortheme","xcode/Metis Light.xccolortheme"]},{name:"VSCode",group:"Editor",description:"Packaged VSCode themes using token colors generated from Metis definitions.",files:["vscode/themes/metis-dark-color-theme.json","vscode/themes/metis-light-color-theme.json"]},{name:"Shiki",group:"Renderer",description:"JSON theme definitions for static docs, MDX, Astro, and code examples.",files:["shiki/metis-dark.json","shiki/metis-light.json"]},{name:"Vim",group:"Editor",description:"A Vim colorscheme plus Airline theme definitions for terminal editing.",files:["colors/metis.vim","autoload/airline/themes/metis.vim"]},{name:"PrismJS",group:"Renderer",description:"A small CSS theme for docs that already rely on Prism token classes.",files:["prismjs/metis.css"]},{name:"Definitions",group:"Source",description:"The canonical palette, role, syntax, UI, ANSI, and version-control definitions.",files:["definitions/metis.json"]}],s=[[["comment","// Metis is generated from one definitions file."]],[["keyword","export"],["plain"," "],["keyword","const"],["plain"," theme "],["operator","="],["plain"," "],["function","createTheme"],["plain","({"]],[["plain","  "],["property","name"],["operator",":"],["plain"," "],["string",'"Metis"'],["operator",","]],[["plain","  "],["property","modes"],["operator",":"],["plain"," ["],["string",'"dark"'],["operator",","],["plain"," "],["string",'"light"'],["plain","],"]],[["plain","  "],["property","targets"],["operator",":"],["plain"," "],["number","8"],["operator",","]],[["plain","  "],["function","mapToken"],["plain","("],["type","SyntaxRole"],["plain","."],["property","statement"],["plain",") {"]],[["plain","    "],["keyword","return"],["plain"," "],["property","palette"],["plain","."],["property","amber"],["operator",";"]],[["plain","  }"]],[["plain","});"]],[["plain",""]],[["keyword","await"],["plain"," "],["function","writeTargets"],["plain","("],["property","theme"],["operator",","],["plain"," "],["property","formats"],["plain",");"]]],r=[["statement","Control flow","keywords, storage, declarations"],["identifier","Identifiers","functions and named symbols"],["string","Strings","quoted values and content"],["number","Numbers","literals and numeric constants"],["type","Types","classes, structs, interfaces"],["operator","Operators","punctuation with semantic weight"],["trivial","Comments","comments and low-emphasis tokens"]],i=e=>{let t=document.documentElement;Object.entries(e.uiGroups).forEach(([e,a])=>{t.style.setProperty(`--ui-${o(e)}`,a)}),Object.entries(e.syntaxGroups).forEach(([e,a])=>{t.style.setProperty(`--syntax-${o(e)}`,a)}),Object.entries(e.versionControlGroups).forEach(([e,a])=>{t.style.setProperty(`--version-${o(e)}`,a)}),Object.entries(e.colors).forEach(([e,a])=>{t.style.setProperty(`--color-${o(e)}`,a)}),Object.entries(e.ansiGroups.normal).forEach(([e,a])=>{t.style.setProperty(`--ansi-${o(e)}`,a)})},o=e=>e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),n=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),l=()=>(e(t)).themes[document.documentElement.dataset.mode||"dark"],d=localStorage.getItem("metis-preview-mode")||"dark";document.documentElement.dataset.mode=d,i((e(t)).themes[d]);class c extends HTMLElement{connectedCallback(){this.mode=localStorage.getItem("metis-preview-mode")||"dark",this.render(),this.applyMode()}applyMode(){let a=(e(t)).themes[this.mode];this.dataset.mode=this.mode,document.documentElement.dataset.mode=this.mode,i(a),this.querySelectorAll("[data-mode-option]").forEach(e=>{e.setAttribute("aria-pressed",String(e.dataset.modeOption===this.mode))}),document.dispatchEvent(new CustomEvent("metis-mode-change",{detail:{mode:this.mode}}))}setMode(e){this.mode=e,localStorage.setItem("metis-preview-mode",e),this.applyMode()}render(){this.innerHTML=`
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
              <dt>${Object.keys((e(t)).palette).length}</dt>
              <dd>accents</dd>
            </div>
            <div>
              <dt>2</dt>
              <dd>modes</dd>
            </div>
            <div>
              <dt>${a.length}</dt>
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
    `,this.querySelectorAll("[data-mode-option]").forEach(e=>{e.addEventListener("click",()=>this.setMode(e.dataset.modeOption))})}}class p extends HTMLElement{connectedCallback(){this.surface="code",this.render()}setSurface(e){this.surface=e,this.render()}render(){this.innerHTML=`
      <section class="workbench" aria-label="Metis preview workbench">
        <div class="window-bar">
          <div class="window-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span class="window-title">definitions/metis.json</span>
          <div class="surface-tabs" aria-label="Preview surface">
            ${[["code","Code"],["terminal","Terminal"],["exports","Exports"]].map(([e,t])=>`<button type="button" data-surface="${e}" aria-pressed="${e===this.surface}">${t}</button>`).join("")}
          </div>
        </div>
        <div class="workbench-body">
          <aside class="role-rail" aria-label="Syntax roles">
            ${r.map(([e,t,a])=>`
                  <div class="role-row" style="--role-color: var(--syntax-${e})">
                    <span></span>
                    <strong>${t}</strong>
                    <small>${a}</small>
                  </div>
                `).join("")}
          </aside>
          <div class="preview-surface">
            ${this.renderSurface()}
          </div>
        </div>
      </section>
    `,this.querySelectorAll("[data-surface]").forEach(e=>{e.addEventListener("click",()=>this.setSurface(e.dataset.surface))})}renderSurface(){return"terminal"===this.surface?"<metis-terminal-preview></metis-terminal-preview>":"exports"===this.surface?"<metis-export-preview></metis-export-preview>":"<metis-code-preview></metis-code-preview>"}}class m extends HTMLElement{connectedCallback(){this.innerHTML=`
      <div class="file-tabs" aria-label="Open files">
        <span aria-selected="true">theme.ts</span>
        <span>metis.json</span>
        <span>palette.css</span>
      </div>
      <pre class="code-sample" aria-label="Code syntax sample"><code>${s.map((e,t)=>`<span class="code-line"><span class="line-number">${t+1}</span><span class="code-content">${e.map(([e,t])=>`<span class="token token-${e}">${n(t)}</span>`).join("")}</span></span>`).join("\n")}</code></pre>
      <div class="diff-strip" aria-label="Version control colors">
        <span class="added">added</span>
        <span class="modified">modified</span>
        <span class="removed">removed</span>
        <span class="renamed">renamed</span>
      </div>
    `}}class g extends HTMLElement{connectedCallback(){let a=Object.keys((e(t)).themes.dark.ansiGroups.normal).map(e=>`<span style="--ansi: var(--ansi-${e})"><b></b>${e}</span>`).join("");this.innerHTML=`
      <div class="terminal-preview">
        <p><span class="prompt">metis</span> npm run build</p>
        <p><span class="muted">generated</span> ghostty, iterm, xcode, vscode, shiki, vim, prismjs</p>
        <p><span class="prompt">metis</span> npm test</p>
        <p><span class="success">ok</span> definitions, json, plist, vim, vscode</p>
        <div class="ansi-row" aria-label="ANSI colors">${a}</div>
      </div>
    `}}class u extends HTMLElement{connectedCallback(){this.innerHTML=`
      <div class="export-preview">
        ${a.slice(0,4).map(e=>`
              <article>
                <span>${e.group}</span>
                <strong>${e.name}</strong>
                <small>${e.files[0]}</small>
              </article>
            `).join("")}
      </div>
    `}}class h extends HTMLElement{connectedCallback(){this.render(),document.addEventListener("metis-mode-change",()=>this.updateValues())}render(){this.innerHTML=`
      <section class="section-block" aria-labelledby="palette-title">
        <div class="section-heading">
          <p class="eyebrow">Palette</p>
          <h2 id="palette-title">Expanded accents with mode-aware values.</h2>
        </div>
        <div class="swatch-grid">
          ${Object.keys((e(t)).palette).map(e=>`
                <button type="button" class="swatch" data-copy-color="${e}">
                  <span class="swatch-color" style="background: var(--color-${e})"></span>
                  <span>${e.replace(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase())}</span>
                  <code data-color-name="${e}"></code>
                </button>
              `).join("")}
        </div>
      </section>
    `,this.updateValues(),this.querySelectorAll("[data-copy-color]").forEach(e=>{e.addEventListener("click",async()=>{let t=l().colors[e.dataset.copyColor];navigator.clipboard&&await navigator.clipboard.writeText(t),e.dataset.copied="true",window.setTimeout(()=>{delete e.dataset.copied},1200)})})}updateValues(){let e=l();this.querySelectorAll("[data-color-name]").forEach(t=>{t.textContent=e.colors[t.dataset.colorName]})}}class F extends HTMLElement{connectedCallback(){this.innerHTML=`
      <section class="section-block" aria-labelledby="exports-title">
        <div class="section-heading">
          <p class="eyebrow">Generated Targets</p>
          <h2 id="exports-title">One source definition, only the formats this project supports.</h2>
        </div>
        <div class="target-grid">
          ${a.map(e=>`
                <article class="target-card">
                  <span>${e.group}</span>
                  <strong>${e.name}</strong>
                  <p>${e.description}</p>
                  <code>${n(e.files.join("  "))}</code>
                </article>
              `).join("")}
        </div>
      </section>
    `}}customElements.define("metis-demo",c),customElements.define("metis-workbench",p),customElements.define("metis-code-preview",m),customElements.define("metis-terminal-preview",g),customElements.define("metis-export-preview",u),customElements.define("metis-palette-grid",h),customElements.define("metis-export-grid",F);
//# sourceMappingURL=docs.8454932c.js.map
