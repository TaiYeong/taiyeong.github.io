---
name: jekyll-blog-conventions
description: Jekyll blog conventions confirmed for this project — front matter shape, heading limits, category choices
metadata:
  type: project
---

**Why:** Getting these wrong causes broken sidebar TOCs or wrong URL paths. Capture once, never re-derive.

**How to apply:** Every post written for this project must follow these rules exactly.

## Front matter shape (required fields)
```yaml
---
title: "Descriptive English title"
author: taiyeong.song
category: english   # or pipeline, study — controls URL path
layout: post
---
```

## Heading rules
- `##` — main section (appears in sidebar TOC)
- `###` — subsection (appears in sidebar TOC)
- `####` and deeper — does NOT appear in sidebar (`h_max: 3` in `_config.yml`)

## File naming
- Must be `YYYY-MM-DD-title.md` in `_posts/`
- `temp_for_english/` and `temp_posts/` are staging areas — not built by Jekyll

## Category choices seen so far
- `pipeline` — used in existing CELPIP post (may be incorrect; ideally `english` for CELPIP content)
- `english` — appropriate for CELPIP and English expression posts

## Note
- The CELPIP post at `_posts/2025-10-21-CELPIP.md` currently uses `category: pipeline` — a likely mistake, but front matter edit was permission-denied in 2025-10-21 session. Flag for user to correct manually if they want the correct URL path.

**Related:** [[user-profile]]
