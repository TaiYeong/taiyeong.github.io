---
description: Refine temp_posts/ notes and integrate them into the matching _posts/ entries, then clear the staging files
argument-hint: "[optional: specific temp_posts filename, e.g. 2026-02-28-blender.md]"
---

Run the **integrate-posts** workflow to process staged notes in `temp_posts/` and merge them
into their matching published posts in `_posts/`.

Target: `$ARGUMENTS`
- If a filename is given above, integrate only that `temp_posts/` file.
- If it is empty, process **all** files currently in `temp_posts/`.

Steps:
1. Invoke the `integrate-posts` skill for the full guidance.
2. First check `temp_posts/`. If it is empty (or the named file is empty), report that there is
   nothing to integrate and stop.
3. Otherwise launch the `post-integrator` agent (Agent tool) to run the complete
   discovery → refine → plan → integrate → cleanup workflow, scoped to the target above.
4. Relay the agent's final integration summary (sections added/moved, backlinks, skipped items).
