---
name: ui-design
description: Analyze the Jekyll blog's current front-end and produce a concrete UI/UX design specification for improvements. Uses the voltagent-core-dev:ui-designer agent. The output design spec is saved to temp_design/design-spec.md for the implement-frontend skill to consume.
---

# UI Design Skill

This skill drives the **design phase** of the two-step front-end improvement workflow.
It delegates to the `voltagent-core-dev:ui-designer` agent to audit the current site and
produce a concrete, implementable design specification.

## Scope

The blog is a Jekyll site using the `sighingnow/jekyll-gitbook` remote theme.
Customisable files live in:
- `_includes/` — Liquid partials (toc, toc-date, metadata, analytics)
- `_layouts/` — `home.html`, `search-base.html`
- `assets/` — images, custom CSS, JS (avoid `assets/gitbook/` — theme copies)

Never propose changes to `_site/` (build output) or `assets/gitbook/` (theme files).

## How to run

1. Read `temp_design/design-spec.md` (if it exists) to check for a prior in-progress spec.
2. Launch the **`voltagent-core-dev:ui-designer`** agent via the Agent tool with the prompt below.
3. The agent must save its final design spec to `temp_design/design-spec.md`.
4. Relay the agent's summary to the user and confirm the spec is ready for implementation.

## Agent prompt template

When invoking the `voltagent-core-dev:ui-designer` agent, include:

```
You are improving the Jekyll blog at the working directory (taiyeong.github.io).
It uses the sighingnow/jekyll-gitbook remote theme.

Your task:
1. Read the site structure — _includes/, _layouts/, assets/, _config.yml, CLAUDE.md.
2. Read at least 2-3 representative _posts/ files to understand content style.
3. Audit the current design: layout, typography, color, navigation, sidebar, readability, mobile responsiveness.
4. Identify the top 5-8 concrete improvements that can be achieved by editing files under
   _includes/, _layouts/, or assets/ (never _site/ or assets/gitbook/).
5. For each improvement, write a precise implementation spec:
   - Which file(s) to edit
   - What exactly to add/change (CSS selectors, Liquid partials, HTML structure)
   - The expected visual outcome
6. Save the complete design spec to temp_design/design-spec.md using this structure:

   ## Design Spec: [date]
   ### Summary
   (2-3 sentence overview of the improvements)
   ### Improvement 1: [Title]
   - **File(s):** ...
   - **Change:** ...
   - **Outcome:** ...
   [repeat for each improvement]

7. Return a short summary of the top improvements and confirm the spec was written.

Scope provided by user: $SCOPE
```

## Guardrails

- The agent must write `temp_design/design-spec.md` — verify the file exists after the agent completes.
- If a previous spec already exists, the agent should append a new dated section rather than overwrite.
- Design specs should be specific enough for a developer to implement without further design decisions.
- Do not propose changes that require editing `assets/gitbook/` files.

## Related

- Skill: `.claude/skills/implement-frontend/SKILL.md`
- Command: `.claude/commands/ui-design.md`
- Command: `.claude/commands/improve-frontend.md`
