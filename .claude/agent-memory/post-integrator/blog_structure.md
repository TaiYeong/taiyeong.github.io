---
name: blog-structure
description: Key structural facts about the Jekyll blog and its post conventions
metadata:
  type: project
---

Jekyll blog using `sighingnow/jekyll-gitbook` remote theme. All posts are under `pipeline` category.

**Heading rules (critical for TOC):**
- `##` — main section, appears in sidebar TOC
- `###` — subsection, appears in sidebar TOC
- `####` and deeper — does NOT appear in sidebar TOC (`h_max: 3` in `_config.yml`)

**Post naming:** `YYYY-MM-DD-title.md` in `_posts/`. Staging area is `temp_posts/` (not built by Jekyll).

**Permalink pattern:** `/:categories/:year-:month-:day-:title:output_ext`

**Front matter required fields:** `title`, `author` (taiyeong.song), `category` (pipeline), `layout: post`

**Content style:** Korean prose for explanations, English for code/headings/terms. No emojis in prose (author uses them in original chat logs but they should be stripped during integration). Practitioner-focused, no filler.

**Why:** Ensures sidebar navigation works correctly and posts integrate without breaking site structure.

**How to apply:** Always verify heading depth when inserting new sections. New `###` sections are fine. `####` subsections are appropriate for step-by-step detail that shouldn't clutter the TOC. Never promote detail-level content to `##`.
