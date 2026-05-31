---
description: Implement UI/UX improvements from the design spec in temp_design/design-spec.md using the frontend-developer agent
argument-hint: "[optional: specific improvement to implement, e.g. 'Improvement 2' or 'typography']"
---

Run the **implement-frontend** workflow to apply the design spec to the site's source files.

Target: `$ARGUMENTS`
- If a specific improvement is named, implement only that item from the spec.
- If empty, implement all pending items in `temp_design/design-spec.md`.

Steps:
1. Read `temp_design/design-spec.md`. If it is missing or empty, stop and tell the user to
   run `/ui-design` first to generate a design spec.
2. Invoke the `implement-frontend` skill for the full workflow guidance.
3. Launch the `voltagent-core-dev:frontend-developer` agent (Agent tool) with the full
   design spec content and the scoped target from above.
4. Report which improvements were implemented, which files were changed, and any items skipped.
5. Remind the user to verify with `bundle exec jekyll serve` at `http://localhost:4000`.
6. If all items are implemented, offer to clear `temp_design/design-spec.md`.
