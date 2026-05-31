---
name: implement-frontend
description: Implement UI/UX improvements on the Jekyll blog by reading the design spec from temp_design/design-spec.md and delegating to the voltagent-core-dev:frontend-developer agent. Must be run after the ui-design skill has produced a spec.
---

# Implement Frontend Skill

This skill drives the **implementation phase** of the two-step front-end improvement workflow.
It reads the design specification produced by the `ui-design` skill and delegates execution
to the `voltagent-core-dev:frontend-developer` agent.

## Prerequisites

`temp_design/design-spec.md` must exist and contain a valid design spec.
If it is missing or empty, stop and tell the user to run `/ui-design` first.

## Scope

Editable files:
- `_includes/` — Liquid partials
- `_layouts/` — layout templates
- `assets/` — custom CSS/JS/images

**Never touch:** `_site/` (build output), `assets/gitbook/` (upstream theme files).

## How to run

1. Read `temp_design/design-spec.md` in full. If absent or empty, abort with a message.
2. If `$ARGUMENTS` names a specific improvement (e.g. "Improvement 2"), scope the agent to that item only.
   Otherwise, implement all items in the spec.
3. Launch the **`voltagent-core-dev:frontend-developer`** agent via the Agent tool with the prompt below.
4. After the agent completes, report which improvements were implemented and which (if any) were skipped.
5. Optionally offer to clear `temp_design/design-spec.md` if all items are done.

## Agent prompt template

When invoking the `voltagent-core-dev:frontend-developer` agent, include:

```
You are implementing front-end improvements on a Jekyll blog (taiyeong.github.io).
The blog uses the sighingnow/jekyll-gitbook remote theme.

Editable directories: _includes/, _layouts/, assets/
DO NOT edit: _site/, assets/gitbook/ (theme upstream — changes will be overwritten)

Design specification to implement:
---
$DESIGN_SPEC
---

Scope: $SCOPE

Instructions:
1. Read the full design spec above before touching any file.
2. For each improvement in scope:
   a. Read the target file(s) before editing.
   b. Make the smallest change that achieves the specified outcome.
   c. Verify Jekyll Liquid syntax is valid ({% %} / {{ }} blocks).
   d. Preserve existing functionality — do not remove features, only add/adjust styling.
3. After all edits, list each file changed and what was changed in it.
4. Flag any spec item you could not implement (with reason) rather than silently skipping it.

Jekyll rules:
- Heading hierarchy: ## and ### appear in sidebar TOC; #### and deeper do not (h_max: 3).
- Front matter fields title/author/category/layout must not be altered.
- Permalink pattern: /:categories/:year-:month-:day-:title:output_ext
```

## Guardrails

- Verify `temp_design/design-spec.md` exists before launching the agent.
- The agent must not edit `_site/` or `assets/gitbook/`.
- After implementation, the user should run `bundle exec jekyll serve` locally to verify the result.

## Related

- Skill: `.claude/skills/ui-design/SKILL.md`
- Command: `.claude/commands/implement-frontend.md`
- Command: `.claude/commands/improve-frontend.md`
