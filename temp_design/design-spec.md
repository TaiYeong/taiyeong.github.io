## Design Spec: 2026-05-30 — Code Block Readability

### Summary
Improved dark-mode (color-theme-2) code block readability by: (1) adding a language header
badge via CSS `::before`, (2) fixing comment token colors globally (previously only Python),
(3) restoring keyword/operator colors that were erased by the reset block, and
(4) adding a subtle border to make code block boundaries visible.

### Implementation (completed)

**File:** `assets/gitbook/custom-local.css` — appended to end of file

#### Improvement 1: Subtle border on code block container
- **Selector:** `.book.color-theme-2 div.highlighter-rouge`
- **Change:** `border: 1px solid rgba(255,255,255,0.09)`, `border-radius: 5px`, `overflow: hidden`
- **Outcome:** Code blocks have a faint visible boundary in dark mode

#### Improvement 2: Language badge header bar
- **Selector:** `::before` pseudo-element on `.language-X.highlighter-rouge`
- **Change:** `display: block` with uppercase label text, subtle background strip,
  and `border-bottom` separator — 30+ languages covered
- **Outcome:** Each labeled code block shows e.g. "PYTHON", "BASH", "CMAKE" above the code

#### Improvement 3: Global comment color fix
- **Selector:** `.book.color-theme-2 div.highlight .c, .c1, .cm, .cs, .cp, .ch, .cpf`
- **Change:** `color: #7a9c7a !important` (green) — covers ALL languages, not just `.language-python`
- **Outcome:** `# comments` in bash/shell/PS1/etc. show green consistently
- **Why it was broken:** The earlier reset block (lines 55-77) set `.cm` to `color: inherit`
  and overrode the Python-specific green; the new global rule comes after and wins by cascade

#### Improvement 4: Keyword token colors
- **Selector:** `.k, .kd, .kn, .kp, .kr, .kt, .kc` in `.book.color-theme-2 div.highlight`
- **Change:** `color: #c792ea !important` (light purple)
- **Outcome:** Keywords like `def`, `class`, `import`, `if` stand out in dark mode

#### Improvement 5: Operator token colors
- **Selector:** `.o, .ow`
- **Change:** `color: #89ddff !important` (light blue)
- **Outcome:** Operators restored from `color: inherit` (set by reset block)

#### Improvement 6: Function name tokens
- **Selector:** `.nf, .fm`
- **Change:** `color: #82aaff !important` (blue)
- **Outcome:** Function/method names visually distinct in dark mode

---

## Design Spec: 2026-05-30 (Round 2) — PLAIN badge bug + inline code + callouts

### Summary
Fixed a regression where the language badge leaked onto inline `code` spans (rendering a
stray "PLAIN" label everywhere), added proper inline-code pill styling, and refreshed the
markdown callout (alert) boxes.

**File:** `assets/gitbook/custom-local.css`

#### Fix 1: Remove stray "PLAIN" badge from inline code
- **Cause:** Kramdown wraps inline code as `<code class="language-plaintext highlighter-rouge">`,
  so the badge selectors `.language-X.highlighter-rouge::before` matched inline code too.
- **Change:** Scoped every badge selector to `div.language-X...` (fenced blocks are wrapped
  in a `<div>`, inline code is not). Removed the `plaintext`/`text` badges entirely.
- **Outcome:** Inline code shows no badge; only labeled fenced blocks show a language header.

#### Improvement 7: Inline code pill styling
- **Selector:** `code.highlighter-rouge`, `p/li/td code` (excluding `pre code`, headings, links)
- **Change:** Soft tinted background, accent text color, per-theme variants
  (light `#c7254e`, sepia `#9a4a1a`, dark `#b6c8ff` on slate-blue tint).
- **Outcome:** Inline code is legible and clearly distinct from prose and from code blocks.

#### Improvement 8: Callout / alert box redesign
- **Selector:** `.markdown-alert` + `.markdown-alert-title`
- **Change:** Full subtle border + 4px colored left accent, larger radius (8px),
  light-mode soft shadow, balanced vertical margins, bolder/tighter title.
- **Outcome:** Callouts read as cohesive cards; left-border color still encodes the type
  (note/tip/warning/caution) via the existing per-type rules, which are untouched.

### Verification
`bundle exec jekyll build` → success (done in ~1.9s, no errors).
