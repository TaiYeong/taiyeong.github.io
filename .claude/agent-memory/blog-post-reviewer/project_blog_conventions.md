---
name: project-blog-conventions
description: Jekyll/GitBook sidebar rules, front matter requirements, and heading conventions for taiyeong.github.io
metadata:
  type: project
---

Jekyll blog using `sighingnow/jekyll-gitbook` remote theme. `h_max: 3` in `_config.yml`.

**Sidebar TOC rules:**
- `##` = main section — appears in sidebar
- `###` = sub section — appears in sidebar
- `####` and deeper — DO NOT appear in sidebar
- Never use a top-level `#` inside the post body; title comes from front matter `title:` field
- Never skip heading levels (e.g., `##` → `####` is invalid)

**Required front matter fields:** `title`, `author: taiyeong.song`, `category`, `layout: post`
- `category` controls the URL path — do not change unless asked
- File naming: `YYYY-MM-DD-title.md` — do not rename

**Sidebar readability:** Heading text at `##`/`###` levels must read cleanly as standalone nav entries. Avoid bracket decoration like `## [Case study]` or `## [ Vex & Expression Syntax ]` — these render with brackets in the sidebar TOC.

**Why:** These are hard constraints from the remote theme configuration and Jekyll permalink pattern.

**How to apply:** Check every `##`/`###` heading for bracket noise or level skips before finalizing edits. Always verify front matter fields are intact after editing.

[[user-profile]]
