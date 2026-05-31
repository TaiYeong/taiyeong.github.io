---
description: Analyze the Jekyll blog's current front-end and produce a UI/UX design specification saved to temp_design/design-spec.md
argument-hint: "[optional: focus area, e.g. 'sidebar navigation', 'typography', 'mobile layout']"
---

Run the **ui-design** workflow to audit the current site and produce a concrete design spec
for front-end improvements.

Focus / scope: `$ARGUMENTS`
- If a focus area is given, the design spec should prioritize that area.
- If empty, do a full-site audit covering layout, typography, color, navigation, and mobile.

Steps:
1. Check whether `temp_design/design-spec.md` already has an unimplemented spec.
   If so, ask the user whether to append a new section or overwrite.
2. Invoke the `ui-design` skill for the full workflow guidance.
3. Launch the `voltagent-core-dev:ui-designer` agent (Agent tool) to audit the site and
   write the design spec to `temp_design/design-spec.md`.
4. Confirm the spec file was written and summarize the top improvements identified.
5. Suggest the user run `/implement-frontend` next to apply the changes.
