---
name: integrate-posts
description: Refine raw AI chat notes staged in temp_posts/ and integrate them into the matching published posts in _posts/, then clear the staging files. Use when the user wants to process temp_posts content, merge notes into a blog post, or "정리해서 포스트에 통합" their Jekyll knowledge-base blog.
---

# Integrate temp_posts → _posts

This skill drives the end-to-end pipeline for turning messy, staged AI-chat notes in
`temp_posts/` into polished sections inside the correct published posts in `_posts/`,
then emptying the staging files. It is the repeatable form of the workflow run manually
in past sessions via the `post-integrator` agent.

## How to run it

The heavy lifting lives in the **`post-integrator`** subagent (`.claude/agents/post-integrator.md`),
which already encodes the full editorial workflow, the Jekyll rules, and project memory.

**Preferred path — delegate to the agent:**

1. Quickly list `temp_posts/` to confirm there is pending content. If it is empty, tell the
   user there is nothing to integrate and stop.
2. Launch the `post-integrator` agent via the Agent tool with a prompt that asks it to run
   the full discovery → refine → plan → integrate → cleanup workflow on everything currently
   in `temp_posts/` (or on a specific file if the user named one).
3. Relay the agent's final summary to the user.

If the user explicitly asks to run it inline (no subagent), follow the 5 steps below yourself.

## Workflow (순서도)

### Step 1 — Discovery & Audit
- List every file in `temp_posts/`.
- Match each temp file to its `_posts/` twin **by filename** (`temp_posts/YYYY-MM-DD-x.md` → `_posts/YYYY-MM-DD-x.md`).
- If a temp file has no matching published post, **stop and ask** the user (create new post, or hold?).
- Read each temp file **and** its target post in full before editing anything.

### Step 2 — Content Extraction & Refinement
- Strip conversational noise (user questions, "Sure!", "Great question!", filler).
- Extract the real technical substance: explanations, tips, code, insights.
- Deduplicate against content already present in the target post.
- Rewrite Q&A fragments into coherent blog prose / structured sections.
- Preserve all code blocks with language tags (```python, etc.).
- Respect heading hierarchy: `##` and `###` appear in the sidebar TOC; `####`+ do not (`h_max: 3`).

### Step 3 — Context-Aware Integration Planning
- Analyze the target post's existing structure and narrative flow.
- Map each refined chunk to its **best insertion point** — elaborate inside an existing section,
  add a new section at a logical position, or revise existing content if updated/contradicted.
  Do **not** blindly append to the end.
- Design meaningful backlinks to related `_posts/` entries using the permalink pattern
  `/:categories/:year-:month-:day-:title.html`.

### Step 4 — Integration Execution
- Insert refined content at the planned locations with brief bridging sentences.
- Add cross-post backlinks only where genuinely useful (no SEO padding).
- Do not change `title`/`author`/`category`/`layout` front matter unless asked.
- Verify all headings comply with the `##`/`###`/`####` rules.

### Step 5 — Cleanup & Report
- After successful integration, **empty each processed `temp_posts/` file** (write empty string) — do not delete the file.
- Report: which sections were added/modified, where content was inserted, which backlinks were added and why, and anything skipped (with reason: duplicate / unclear / out of scope).

## Guardrails
- Edit only files under `_posts/`; never touch `_site/` (build output) or `assets/gitbook/` (theme).
- Tone: technical, concise, practitioner-focused — match the existing post's voice.
- When placement is ambiguous or content conflicts with the post, present options and ask rather than guessing.

## Related
- Agent: `.claude/agents/post-integrator.md`
- Project conventions: `CLAUDE.md` (post format, heading/TOC rules, site structure)
