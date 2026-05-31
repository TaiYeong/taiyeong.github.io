---
description: Full two-phase front-end improvement workflow — UI design then implementation. Runs ui-designer then frontend-developer in sequence.
argument-hint: "[optional: focus area, e.g. 'sidebar', 'mobile', 'typography']"
---

Run the **complete front-end improvement workflow** end-to-end:
1. **Phase 1 — Design** (`ui-design` skill + `voltagent-core-dev:ui-designer` agent)
2. **Phase 2 — Implementation** (`implement-frontend` skill + `voltagent-core-dev:frontend-developer` agent)

Focus / scope: `$ARGUMENTS`
- If given, scope both phases to that area.
- If empty, do a full-site audit and implement all identified improvements.

Steps:
1. Announce that you are starting Phase 1 (UI Design).
2. Invoke the `ui-design` skill. Launch the `voltagent-core-dev:ui-designer` agent to audit
   the site and write its design spec to `temp_design/design-spec.md`.
3. Show the user the top improvements from the spec and confirm before proceeding.
   Wait for approval if the user wants to review the spec first; otherwise continue automatically.
4. Announce that you are starting Phase 2 (Implementation).
5. Invoke the `implement-frontend` skill. Read `temp_design/design-spec.md` and launch the
   `voltagent-core-dev:frontend-developer` agent to apply all improvements.
6. Report the final result: which files were changed, what was improved, and what (if any) was skipped.
7. Remind the user to verify with `bundle exec jekyll serve` at `http://localhost:4000`.
8. Offer to clear `temp_design/design-spec.md` now that implementation is complete.
