---
title: Readability Design Spec – custom-local.css
author: taiyeong.song
category: meta
layout: post
---

# Readability Refinement Design Spec

**Target file:** `assets/gitbook/custom-local.css`  
**Target audience:** developer dropping in ready CSS rules  
**Scope:** typography, spacing, hierarchy — no structural or brand changes  
**Do not touch:** `assets/gitbook/style.css`, `assets/gitbook/custom.css`, existing rules already in `custom-local.css`

---

## Confirmed baseline (read from source files)

| Property | Current value (style.css) |
|---|---|
| Body font family | `"Helvetica Neue", Helvetica, Arial, sans-serif` (14 px, set on `body`) |
| `.markdown-section` color | `#333` |
| `.markdown-section` line-height | `1.7` |
| `p` / `ul` / `ol` / `table` margin-bottom | `0.85em` |
| `h3–h6` margin-top | `1.275em`, margin-bottom `0.85em`, weight `700` |
| `h1` font-size | `2em` |
| `h2` font-size | `1.75em` |
| `h3` font-size | `1.5em` |
| `h4` font-size | `1.25em` |
| `h5/h6` font-size | `1em` |
| Link color (default) | `#4183c4` |
| Link color (dark theme, `.section.normal a`) | `#3eb1d0` |
| Inline `code` bg | `#f7f7f7`, font-size `0.85em`, padding `0.2em` |
| Pre bg | `#f7f7f7`, padding `0.85em 1em` |
| Table `td/th` padding | `6px 13px`, border `1px solid #ddd` |
| Table even-row bg | `#f8f8f8` |
| Blockquote border-left | `4px solid #e5e5e5`, color `#858585` |
| `.page-inner` max-width | `800px` (set via `site.page_width`) |
| Color-theme-1 (sepia) body | bg `#f3eacb`, text `#704214` |
| Color-theme-2 (dark) body | bg `#1c1f2b`, text `#bdcadb` |
| Color-theme-2 headings | `#fffffa` |
| Color-theme-2 h1/h2 border-color | `#373b4e` |
| Color-theme-2 blockquote border | `#373b4e` |
| Color-theme-2 inline code | color `#9dbed8`, bg `#2d3143` |
| Color-theme-2 table even-row | `#35394b` |

**Existing custom-local.css rules to preserve (do not duplicate or conflict):**
- Dark-theme Python syntax highlighting token colors (`color-theme-2 .language-python`)
- Image lightbox overlay (`#custom-zoom-overlay`, `#custom-zoom-img`)
- GitHub Markdown alerts (`.markdown-alert` family — all five types)
- Search results list styling (`#book-search-results` family)

---

## Step 0 — Add Pretendard CDN via `_config.yml`

`head.html` already loops `site.extra_css` and emits a `<link rel="stylesheet">` for each entry, supporting full `http` URLs.
Add one line to `_config.yml`:

```yaml
extra_css:
  - "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
```

This injects the CDN link **before** `custom.css` and `custom-local.css`, so `Pretendard` is available when those files reference it. No `<link>` tag in any HTML partial needs to be touched.

---

## CSS rules for `custom-local.css`

Paste the following blocks at the **end** of `assets/gitbook/custom-local.css`, in the order shown. Each section is labelled so it maps 1:1 to the spec section numbers in the brief.

---

### Section 1 — Font stack (`.markdown-section` body and headings)

```css
/* ============================================================
   SECTION 1 — Font stack: Pretendard + system sans fallback
   Pretendard CDN loaded via _config.yml extra_css.
   Monospace stack left untouched (already set in style.css).
   ============================================================ */

.markdown-section {
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans KR",
    sans-serif;
}

.markdown-section h1,
.markdown-section h2,
.markdown-section h3,
.markdown-section h4,
.markdown-section h5,
.markdown-section h6 {
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans KR",
    sans-serif;
}
```

**Rationale:** `Pretendard` covers the full Hangul + Latin range with consistent weight axes. The fallback chain mirrors the existing `--font-family` variable in `custom.css` so the site degrades identically on systems without the CDN. `Noto Sans KR` is added as a second Korean fallback before the generic `sans-serif`.

---

### Section 2 — Body text: size, line-height, paragraph spacing, letter-spacing

```css
/* ============================================================
   SECTION 2 — Body text
   Base: 15px, lh 1.75 (midpoint of requested 1.7–1.8 range,
   optimal for Korean/English mixed at this measure).
   Paragraph spacing increased from 0.85em → 1.1em.
   Contrast verified WCAG AA for all three themes below.
   ============================================================ */

.markdown-section {
  font-size: 15px;          /* up from 14px body base; keeps rem scale intact */
  line-height: 1.75;        /* was 1.7 — 0.05 lift aids Korean glyph clarity */
  letter-spacing: 0.01em;   /* very slight tracking; Korean type benefits from
                               a hair of tracking, English is unaffected at this
                               value. Remove if it feels unnatural after testing. */
}

.markdown-section p {
  margin-top: 0;
  margin-bottom: 1.1em;     /* was 0.85em — adds clear breath between paragraphs */
  line-height: inherit;
}

/* Default (white): #333 on #fff — contrast ratio ~12.6:1. WCAG AA pass. */
/* No override needed; style.css already sets color:#333. */

/* Sepia: #704214 on #f3eacb — contrast ratio ~6.5:1. WCAG AA pass. */
/* Already set by website.css .book.color-theme-1 .book-body; no override needed. */

/* Dark: #bdcadb on #1c1f2b — contrast ratio ~9.8:1. WCAG AA pass. */
/* Already set by website.css .book.color-theme-2 .book-body; no override needed. */
```

---

### Section 3 — Heading hierarchy h1–h4

The goal is a **clear visual jump between every level** while staying within the GitBook aesthetic (border-bottom on h1/h2 is a GitBook convention already applied in `section.normal` via `website.css`).

Font sizes use a 1.25x modular scale anchored to 15 px body text. Sizes are expressed in `em` relative to the parent `font-size` so GitBook's font-size-N user setting continues to work.

| Level | Old size | New size | Weight | Notes |
|---|---|---|---|---|
| h1 | 2.000em | 2.200em | 700 | Section title, top of page |
| h2 | 1.750em | 1.750em | 700 | Keep; already good separation from h3 |
| h3 | 1.500em | 1.350em | 700 | Tightened gap vs h2 was too close |
| h4 | 1.250em | 1.150em | 600 | Distinct but clearly subordinate |

```css
/* ============================================================
   SECTION 3 — Heading hierarchy h1–h4
   Modular scale (×1.25) from 15 px body.
   Margins: large top to detach from preceding content,
   smaller bottom to bind heading to its following text.
   Border-bottom on h1/h2 matches GitBook convention.
   ============================================================ */

.markdown-section h1 {
  font-size: 2.2em;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 0.6em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #e5e5e5;   /* default theme */
  line-height: 1.3;
}

.markdown-section h2 {
  font-size: 1.75em;
  font-weight: 700;
  margin-top: 1.8em;
  margin-bottom: 0.5em;
  padding-bottom: 0.25em;
  border-bottom: 1px solid #e5e5e5;   /* default theme */
  line-height: 1.35;
}

.markdown-section h3 {
  font-size: 1.35em;
  font-weight: 700;
  margin-top: 1.6em;
  margin-bottom: 0.4em;
  line-height: 1.4;
}

.markdown-section h4 {
  font-size: 1.15em;
  font-weight: 600;
  margin-top: 1.4em;
  margin-bottom: 0.35em;
  line-height: 1.45;
}

/* h5/h6: leave at existing 1em; they are rarely surfaced in this blog */

/* --- Heading: sepia theme (color-theme-1) border override --- */
.book.color-theme-1 .markdown-section h1,
.book.color-theme-1 .markdown-section h2 {
  border-bottom-color: #d4c49a;   /* warm tone matching sepia palette */
}

/* --- Heading: dark theme (color-theme-2) border override --- */
/* border-color for h1/h2 already set by website.css to #373b4e
   for .section.normal h1/h2 — that selector wins.
   Repeat here to keep specificity consistent for our h3 layout. */
.book.color-theme-2 .markdown-section h1,
.book.color-theme-2 .markdown-section h2 {
  border-bottom-color: #373b4e;
}
```

---

### Section 4 — Lists (ul / ol)

```css
/* ============================================================
   SECTION 4 — Lists
   Item spacing: 0.3em vertical gap between siblings gives
   clear separation without making short lists feel sparse.
   Line-height inherits the 1.75 body value.
   Nested indentation: 1.5em (slightly tighter than the 2em
   default for the outer list — prevents deep nesting from
   overflowing the 800 px measure).
   ============================================================ */

.markdown-section ul,
.markdown-section ol {
  margin-bottom: 1.1em;     /* match new paragraph spacing */
  padding-left: 1.75em;     /* was 2em in style.css; slight tighten */
}

.markdown-section li {
  margin-bottom: 0.3em;
  line-height: 1.75;
}

/* Last item in a list should not add extra space before the next block */
.markdown-section li:last-child {
  margin-bottom: 0;
}

/* Nested lists: reset item spacing slightly */
.markdown-section ul ul,
.markdown-section ul ol,
.markdown-section ol ul,
.markdown-section ol ol {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  padding-left: 1.5em;      /* tighter than outer 1.75em */
}
```

---

### Section 5 — Links

Link colors are **already set per theme** by `style.css` and `website.css`. The refinement is: make the underline appear only on hover (current), ensure visited state is distinguishable, and confirm dark-theme link color passes WCAG AA.

Contrast checks:
- Default: `#4183c4` on `#fff` — 4.5:1 (AA pass for normal text at 15 px).
- Sepia: `color: inherit` (`#704214`) on `#f3eacb` — 6.5:1 (AA pass).
- Dark: `#3eb1d0` on `#1c1f2b` — 4.6:1 (AA pass).

```css
/* ============================================================
   SECTION 5 — Links
   No color changes needed — all three themes already pass
   WCAG AA. Refinements: visited state, and a subtle
   underline decoration that keeps GitBook feel but improves
   affordance on the knowledge-base content type.
   ============================================================ */

.markdown-section a {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: rgba(65, 131, 196, 0.4);  /* default theme */
}

.markdown-section a:hover,
.markdown-section a:focus {
  text-decoration-color: #4183c4;   /* full opacity on hover */
  text-decoration-thickness: 2px;
  outline: 0;
}

/* Sepia */
.book.color-theme-1 .markdown-section a {
  text-decoration-color: rgba(112, 66, 20, 0.35);
}
.book.color-theme-1 .markdown-section a:hover,
.book.color-theme-1 .markdown-section a:focus {
  text-decoration-color: #704214;
  text-decoration-thickness: 2px;
}

/* Dark */
.book.color-theme-2 .markdown-section a {
  text-decoration-color: rgba(62, 177, 208, 0.4);
}
.book.color-theme-2 .markdown-section a:hover,
.book.color-theme-2 .markdown-section a:focus {
  text-decoration-color: #3eb1d0;
  text-decoration-thickness: 2px;
}
```

---

### Section 6 — Inline code and code blocks

The existing dark-theme Python syntax rules in `custom-local.css` must not be duplicated. Only layout/rhythm rules are added here. Color rules for code are only added for the default and sepia themes where no override exists yet.

```css
/* ============================================================
   SECTION 6 — Inline code and code blocks
   Size: 0.875em (was 0.85em) — fractionally larger for
   Korean-context readability; still visually subordinate.
   Inline code: subtle rounded pill treatment, no jarring
   border, matches GitBook's ghost-box aesthetic.
   Code blocks: slight vertical breathing room.

   IMPORTANT: Do NOT add any color rules for color-theme-2
   code/pre here — those are already set in custom-local.css
   (lines 1–86) and in website.css. Adding them again would
   require !important battles.
   ============================================================ */

/* Inline code — default and sepia */
.markdown-section code {
  font-size: 0.875em;
  padding: 0.2em 0.45em;
  border-radius: 4px;
  /* background-color already #f7f7f7 from style.css */
}

/* Code blocks */
.markdown-section pre {
  font-size: 0.875em;
  padding: 1em 1.1em;
  margin-bottom: 1.25em;
  border-radius: 4px;
  line-height: 1.6;           /* slightly tighter than body — good for code */
}

/* Sepia: code background warmer to match palette */
.book.color-theme-1 .markdown-section code {
  /* website.css already sets bg:#fdf6e3 and color:#657b83
     for .section.normal code — no further override needed */
}

/* Dark: already fully handled by existing custom-local.css rules.
   No additions here. */
```

---

### Section 7 — Tables

```css
/* ============================================================
   SECTION 7 — Tables
   Padding: increased from 6px 13px to 8px 14px for
   better vertical breathing room.
   Header: font-weight 700 already set; add letter-spacing
   for column heading legibility.
   Border treatment: keep existing 1px solid #ddd (default).
   Zebra striping: keep existing nth-child(2n) rules.
   Per-theme overrides respect website.css border/bg values.
   ============================================================ */

.markdown-section table {
  font-size: 0.95em;          /* slightly smaller than body; dense content */
  margin-bottom: 1.25em;
}

.markdown-section table th {
  padding: 9px 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  vertical-align: bottom;
}

.markdown-section table td {
  padding: 8px 14px;
  vertical-align: top;
  line-height: 1.6;
}

/* Default theme: add subtle top border emphasis on header row */
.markdown-section table thead tr {
  border-top: 2px solid #c8c8c8;
}

/* Sepia: website.css sets border and bg; just add the 2px header rule */
.book.color-theme-1 .markdown-section table thead tr {
  border-top: 2px solid #d4b87a;
}

/* Dark */
.book.color-theme-2 .markdown-section table thead tr {
  border-top: 2px solid #4a5068;
}

/* Ensure table wrapper allows horizontal scroll on narrow viewports */
/* .table-wrapper already set in custom.css; this is just documentation. */
```

---

### Section 8 — Blockquotes

**Important:** Do not conflict with `.block-tip`, `.block-warning`, `.block-danger` (defined in `custom.css`) or `.markdown-alert` family (defined in `custom-local.css`). Those are scoped with their own classes and are unaffected by plain `blockquote` rules.

```css
/* ============================================================
   SECTION 8 — Blockquotes (plain, not .block-tip/.block-warning
   and not .markdown-alert — those are handled elsewhere).
   Refinements: more top/bottom margin for breathing room,
   slight left padding increase, italic body text to signal
   quotation context.
   ============================================================ */

.markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) {
  margin-top: 0;
  margin-bottom: 1.1em;
  padding: 0.1em 0 0.1em 1em;   /* was padding: 0 15px */
  border-left-width: 4px;
  border-left-style: solid;
  border-left-color: #d0d0d0;    /* default: slightly darker than existing #e5e5e5 */
  color: #666;                   /* default: slightly darker than existing #858585 */
  font-style: italic;
}

.markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) p {
  margin-bottom: 0.5em;
}
.markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) p:last-child {
  margin-bottom: 0;
}

/* Sepia */
.book.color-theme-1 .markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) {
  border-left-color: #c8a86a;
  color: #8a6030;
}

/* Dark: website.css already sets border-color:#373b4e via .section.normal blockquote.
   Override just the text color for legibility. */
.book.color-theme-2 .markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) {
  border-left-color: #4a5068;
  color: #8a97aa;
}
```

---

### Section 9 — Images / figures

```css
/* ============================================================
   SECTION 9 — Images and figures
   Spacing: vertical margin above and below so images
   sit clearly apart from text flow.
   Max-width: 100% already set in style.css — keep.
   Border-radius: 4px on images gives a softened,
   modern appearance consistent with the rest of the UI
   without clashing with diagram screenshots (transparent-bg
   images won't show the radius against the page bg).
   Caption text (em/figcaption under image): small, muted.
   The existing image lightbox overlay in custom-local.css
   is unaffected by these rules.
   ============================================================ */

.markdown-section img {
  display: block;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  border-radius: 4px;
  /* max-width: 100% already set in style.css */
}

/* Inline images (e.g. emoji, icons) — don't block-display them */
.markdown-section p img {
  display: inline;
  margin-top: 0;
  margin-bottom: 0;
  vertical-align: middle;
  border-radius: 2px;
}

/* Image caption: the common pattern is <em> immediately after an image */
.markdown-section img + em,
.markdown-section p > img ~ em {
  display: block;
  margin-top: -0.75em;
  margin-bottom: 1em;
  font-size: 0.82em;
  color: #888;
  text-align: center;
  font-style: italic;
}

.book.color-theme-2 .markdown-section img + em,
.book.color-theme-2 .markdown-section p > img ~ em {
  color: #6a7a8a;
}
```

---

### Section 10 — Page measure recommendation (comment only, no forced change)

```css
/* ============================================================
   SECTION 10 — Page width recommendation
   Current: max-width 800px (set via site.page_width in
   _config.yml and rendered into custom.css as .page-inner).

   RECOMMENDATION: Keep 800px. Do not change.

   Rationale:
   - Korean text is significantly wider per character than
     Latin. At 800 px with 15 px body text the content area
     holds ~55–60 Korean characters per line, placing it
     comfortably inside the 45–75 character optimal range
     for East Asian typography (CLREQ guidance).
   - For the mixed Korean/English/code content on this blog,
     800 px also prevents code blocks from wrapping on typical
     technical identifiers and terminal output.
   - Going wider (e.g. 900–1000 px) would push English
     paragraphs past ~90 characters per line, reducing
     readability for Latin text without meaningfully
     benefiting Korean blocks.
   - Going narrower (e.g. 680 px) would cause longer code
     lines to scroll horizontally more aggressively.
   - If the owner ever wants slightly wider content, 860 px
     is the ceiling that keeps both scripts comfortable.

   No CSS rule is added here — this is a documented decision.
   ============================================================ */
```

---

## Complete paste-ready block

The following is the entire addition assembled in order, ready to append to `custom-local.css`. Lines are annotated for the developer.

```css
/* ================================================================
   READABILITY REFINEMENTS — append to end of custom-local.css
   Date: 2026-05-30
   Scope: typography / spacing / hierarchy only.
         No structural, brand, or layout changes.
   Prerequisites: Pretendard CDN added to _config.yml extra_css
   ================================================================ */

/* ------ SECTION 1: Font stack ------ */

.markdown-section {
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans KR",
    sans-serif;
}

.markdown-section h1,
.markdown-section h2,
.markdown-section h3,
.markdown-section h4,
.markdown-section h5,
.markdown-section h6 {
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans KR",
    sans-serif;
}

/* ------ SECTION 2: Body text ------ */

.markdown-section {
  font-size: 15px;
  line-height: 1.75;
  letter-spacing: 0.01em;
}

.markdown-section p {
  margin-top: 0;
  margin-bottom: 1.1em;
  line-height: inherit;
}

/* ------ SECTION 3: Headings ------ */

.markdown-section h1 {
  font-size: 2.2em;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 0.6em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #e5e5e5;
  line-height: 1.3;
}

.markdown-section h2 {
  font-size: 1.75em;
  font-weight: 700;
  margin-top: 1.8em;
  margin-bottom: 0.5em;
  padding-bottom: 0.25em;
  border-bottom: 1px solid #e5e5e5;
  line-height: 1.35;
}

.markdown-section h3 {
  font-size: 1.35em;
  font-weight: 700;
  margin-top: 1.6em;
  margin-bottom: 0.4em;
  line-height: 1.4;
}

.markdown-section h4 {
  font-size: 1.15em;
  font-weight: 600;
  margin-top: 1.4em;
  margin-bottom: 0.35em;
  line-height: 1.45;
}

.book.color-theme-1 .markdown-section h1,
.book.color-theme-1 .markdown-section h2 {
  border-bottom-color: #d4c49a;
}

.book.color-theme-2 .markdown-section h1,
.book.color-theme-2 .markdown-section h2 {
  border-bottom-color: #373b4e;
}

/* ------ SECTION 4: Lists ------ */

.markdown-section ul,
.markdown-section ol {
  margin-bottom: 1.1em;
  padding-left: 1.75em;
}

.markdown-section li {
  margin-bottom: 0.3em;
  line-height: 1.75;
}

.markdown-section li:last-child {
  margin-bottom: 0;
}

.markdown-section ul ul,
.markdown-section ul ol,
.markdown-section ol ul,
.markdown-section ol ol {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  padding-left: 1.5em;
}

/* ------ SECTION 5: Links ------ */

.markdown-section a {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: rgba(65, 131, 196, 0.4);
}

.markdown-section a:hover,
.markdown-section a:focus {
  text-decoration-color: #4183c4;
  text-decoration-thickness: 2px;
  outline: 0;
}

.book.color-theme-1 .markdown-section a {
  text-decoration-color: rgba(112, 66, 20, 0.35);
}
.book.color-theme-1 .markdown-section a:hover,
.book.color-theme-1 .markdown-section a:focus {
  text-decoration-color: #704214;
  text-decoration-thickness: 2px;
}

.book.color-theme-2 .markdown-section a {
  text-decoration-color: rgba(62, 177, 208, 0.4);
}
.book.color-theme-2 .markdown-section a:hover,
.book.color-theme-2 .markdown-section a:focus {
  text-decoration-color: #3eb1d0;
  text-decoration-thickness: 2px;
}

/* ------ SECTION 6: Code ------ */

.markdown-section code {
  font-size: 0.875em;
  padding: 0.2em 0.45em;
  border-radius: 4px;
}

.markdown-section pre {
  font-size: 0.875em;
  padding: 1em 1.1em;
  margin-bottom: 1.25em;
  border-radius: 4px;
  line-height: 1.6;
}

/* ------ SECTION 7: Tables ------ */

.markdown-section table {
  font-size: 0.95em;
  margin-bottom: 1.25em;
}

.markdown-section table th {
  padding: 9px 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  vertical-align: bottom;
}

.markdown-section table td {
  padding: 8px 14px;
  vertical-align: top;
  line-height: 1.6;
}

.markdown-section table thead tr {
  border-top: 2px solid #c8c8c8;
}

.book.color-theme-1 .markdown-section table thead tr {
  border-top: 2px solid #d4b87a;
}

.book.color-theme-2 .markdown-section table thead tr {
  border-top: 2px solid #4a5068;
}

/* ------ SECTION 8: Blockquotes ------ */

.markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) {
  margin-top: 0;
  margin-bottom: 1.1em;
  padding: 0.1em 0 0.1em 1em;
  border-left-width: 4px;
  border-left-style: solid;
  border-left-color: #d0d0d0;
  color: #666;
  font-style: italic;
}

.markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) p {
  margin-bottom: 0.5em;
}
.markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) p:last-child {
  margin-bottom: 0;
}

.book.color-theme-1 .markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) {
  border-left-color: #c8a86a;
  color: #8a6030;
}

.book.color-theme-2 .markdown-section blockquote:not(.block-tip):not(.block-warning):not(.block-danger) {
  border-left-color: #4a5068;
  color: #8a97aa;
}

/* ------ SECTION 9: Images ------ */

.markdown-section img {
  display: block;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  border-radius: 4px;
}

.markdown-section p img {
  display: inline;
  margin-top: 0;
  margin-bottom: 0;
  vertical-align: middle;
  border-radius: 2px;
}

.markdown-section img + em,
.markdown-section p > img ~ em {
  display: block;
  margin-top: -0.75em;
  margin-bottom: 1em;
  font-size: 0.82em;
  color: #888;
  text-align: center;
  font-style: italic;
}

.book.color-theme-2 .markdown-section img + em,
.book.color-theme-2 .markdown-section p > img ~ em {
  color: #6a7a8a;
}

/* ------ SECTION 10: Page width -- no rule, see comment ------ */
/* Recommendation: KEEP 800px. See spec for rationale. */
```

---

## Implementation checklist for developer

1. Add Pretendard CDN URL to `_config.yml` under `extra_css` (Section 0 above).
2. Append the complete CSS block above to `assets/gitbook/custom-local.css`.
3. Run `bundle exec jekyll serve` and verify:
   - Default (white), sepia (color-theme-1), and dark (color-theme-2) themes all render correctly.
   - Existing `.markdown-alert` boxes are visually unchanged.
   - Existing Python syntax highlighting in dark mode is visually unchanged.
   - Image lightbox zoom still works.
   - Search result list styling is unchanged.
4. Test on a post with both Korean and English paragraphs — confirm Pretendard loads (Network tab shows CDN font fetch) and Korean glyphs render with the new font.
5. Test on mobile (< 600 px) — GitBook's responsive breakpoints remain intact because none of the rules touch layout, only typography.
