---
name: houdini-technical-notes
description: Recurring Houdini accuracy issues found during post review — VEX/HOM terminology and syntax pitfalls
metadata:
  type: project
---

**VEX comment syntax is `//`, not `#`.**
Python-style `#` comments are incorrect inside VEX code blocks. Always use `//` for VEX.

**`hou.parm` vs `hou.Parm`:**
`hou.Parm` is the class name (capital P). The correct way to call `evalAsNode()` is on a parm instance: `parm_obj.evalAsNode()`. Writing `hou.parm.evalAsNode()` is wrong — `hou.parm` is not a valid module-level attribute.

**`strreplace()` vs `replace()` — Hscript vs VEX:**
`strreplace()` is an **Hscript expression** function used in parameter fields (inside backtick-expanded expressions). The VEX equivalent is `replace()`. This distinction is commonly missed in the blog posts.

**Code block language tags:**
VEX code blocks should use ` ```cpp ` (or ` ```vex ` ) for syntax highlighting. Untagged blocks lose highlighting. The author's String functions section already uses `cpp`; keep other VEX blocks consistent.

**Troubleshooting anchor in VEX snippets docs:**
The correct anchor for the troubleshooting section in `https://www.sidefx.com/docs/houdini/vex/snippets.html` is `#troubleshooting`, not `#accessing-globals` (a prior duplicate link error was found in the 2024-07-26-houdini.md post).

**Why:** Found during review of `_posts/2024-07-26-houdini.md`.

**How to apply:** Whenever reviewing Houdini posts, verify VEX comment syntax, HOM API class name casing, and Hscript vs VEX function names.

[[user-profile]]
