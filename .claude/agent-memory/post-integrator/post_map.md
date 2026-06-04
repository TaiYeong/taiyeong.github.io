---
name: post-map
description: Semantic map of existing _posts/ files, their topics, and cross-reference relationships
metadata:
  type: project
---

## Published posts in _posts/

### `2026-02-08-ClaudeAI.md` — "Claude AI and Code"
Category: pipeline
Topics: Claude AI Projects feature, Claude Code deep usage guide (Claude.md, Skills, Subagents, Hooks, MCP), Commands (/model, /plugin, /stats, /context, /cost, /statusline, /status), MCP vs Plugin vs Subagent terminology, MCP server deployment (PyPI, Docker, GitHub, Smithery.ai/Glama), Project Orchestrations (Web/App, Pipeline Research, English Study, AI Scribe)

**Agent section** (`### Agents - How to create` and `### Agents - Skills and Hooks 설정`): Populated 2026-05-27. Covers `/agents` UI workflow, manual markdown file creation, skills/hooks YAML frontmatter, `Generate with Claude` automation, plugin hook security caveat.

**Session Management section** (`### Session Management`): Added 2026-05-28. Covers session start/resume/list commands (`claude`, `/clear`, `claude --continue`, `claude --resume`, `/rename`), session picker keyboard shortcuts (`Ctrl+A/B/R`), token optimization commands (`/compact`, `/clear`, `/cost`), Git-branch-per-task workflow pattern, one-liner invocation for automation, session fork/branch (`--fork-session`, `/branch`).

**Session deletion subsection** (`#### 세션 삭제 및 정리`): Added 2026-05-28. Covers `claude project purge` (interactive batch delete) and manual deletion via `~/.claude/projects/*.jsonl` files.

**Subagent/Skills additions** (within `##### 2. 사용자 정의 자동화`): Added 2026-05-30. Added to Subagents bullet: token cost explanation for orchestrator mode, reason agent auto-delegation fails (no Skills defined). Added to Skills NOTE block: session-based workflow capture prompt for auto-generating Skills + Commands.

Backlink target for: any post touching Claude Code, MCP, or AI automation workflows.

---

### `2026-02-28-blender.md` — "Blender"
Category: pipeline
Topics: Bardel pipeline dept structure (Surfacing/Lighting/Rendering), dev-items per dept, Blender official docs notes (Data-Blocks, Asset, Scene, Collection, Packed Data, File Paths, Asset Browser, Blend file previews), Geometry Nodes use cases (Sample/Resample nodes, fetch & transfer values, rest_position case study)

**New sections added 2026-05-27** (within `## Use Cases of Geometry Nodes`):
- `### Node Group vs Modifier: 핵심 개념 구분` — concept table differentiating Node Group (storable asset) vs Modifier (executor)
- `### Geometry Node Asset 정리 및 에셋화` — 4-step workflow to clean orphan data and publish a node group as an asset

**New sections added 2026-05-30** (within `## Use Cases of Geometry Nodes`, before `### Fetch and Transfer Sample data`):
- `### Houdini skinprim / skinprimuv 데이터를 Geometry Nodes로 처리하기` — 4-step bilinear interpolation node tree for mapping Houdini Curves onto Skin Mesh surface; covers why Sample UV Surface and Sample Nearest Surface are insufficient; Deform Curves on Surface as alternative for Rest Pose pipelines
- `### Mix Node` — Mix node reference: data types (Float/Vector/Color/Rotation), Factor behavior, Vector Uniform/Non-Uniform modes, Color blending modes, distinction from Join Geometry

**New sections added 2026-06-02** (within `## Official Docs > ### Scene` and new `### Python API`):
- `#### bpy.types vs bpy.context vs bpy.data` — comparison table of the three namespaces with pipeline use cases
- `#### bpy.types.Scene — Shot 메타데이터 주입` — full PropertyGroup + Panel + register/unregister pattern for injecting USD pipeline metadata into Scene; architecture comparison table (Python API vs Geometry Nodes vs Library Overrides)
- `### Python API > #### bpy.types.Operator` — Operator architecture (WM registration, bl_idname, bl_label), execute() entry point, Early Return pattern, FINISHED/CANCELLED return semantics, `libraries.load` context manager caveat
- `### Python API > #### 커스텀 Operator를 Add Menu / Search에 등록` — draw function injection into `VIEW3D_MT_mesh_add`
- `### Python API > #### Viewport Add Menu & Search` — shortcut reference table (Shift+A, F3)

Backlink target for: any post touching Blender pipeline, asset management, geometry nodes, or `bpy` API usage.

---

### `_posts/2024-07-26-unreal.md`
Status: DELETED in working tree (git status shows `D _posts/2024-07-26-unreal.md`). Do not reference or link to this post until it is restored.

---

---

### `2025-01-18-python.md` — "Python"
Category: pipeline
Topics: venv setup, Docstring conventions, Absolute vs Relative imports, `__future__`, `typing.Union`, `pandas` CRUD, `logging`

**New section added 2026-06-02** (`## Context Manager`):
- `### with vs try-finally` — explains `__enter__`/`__exit__` mechanism, why `with` is preferred in production over `try-finally`, `as` variable = `__enter__()` return value (not the function's return)
- `#### File I/O — ShotGrid / JSON metadata`
- `#### Asset Append/Link via bpy.data.libraries.load` — safe pattern: build `data_to` inside block, post-process outside block
- `#### Artist Context Preservation` — `@contextmanager` pattern with `preserve_user_context()` for protecting artist mode/selection state
- Backlink to Blender post for `bpy.types.Operator` context

Backlink target for: any post touching Python patterns, Blender scripting, or pipeline tool development.

---

### `2024-07-26-computerGraphics.md` — "Computer Graphics"
Category: pipeline
Topics: Math concepts (Deviation, Perpendicular/Orthogonal, Surface Normal, Frenet-Serret, TBN/Tangent Space, Vector ops, Vector projection, Transformation Matrix, Barycentric interpolation), Use Cases (GuideDeform in Houdini, Bilinear Interpolation for SKIN hair, Barycentric interpolation for GUIDE hair, Tweak hair)

**New sections added 2026-06-03** (within `### TBN / Tangent Space` and `## Use Cases`):
- `#### Naive TBN 계산의 한계 — 파이프라인 파손 원인 3가지` — inserted after `#### ③ TBN 프레임`. Covers why Face Normal vs. Smooth Normal, Edge Direction vs. UV Space (MikkTSpace), and Quad Non-Planar error break pipeline TBN matching vs. Katana/RenderMan.
- `### Blender Geometry Nodes에서 정확한 TBN 추출 — skinprim / skinprimuv 기반` — inserted after `### Barycentric interpolation - for GUIDE type`. Covers: Quad vs. Triangle topology table for skinprimuv; Quad Trap warning + Divide SOP solution; 3-step GN node setup (Corners of Face + Sample Index → Barycentric weighting → Gram-Schmidt orthogonalization).

Backlink added: `[Blender — Houdini skinprim / skinprimuv 데이터를 Geometry Nodes로 처리하기](/pipeline/2026-02-28-blender.html)` — within the new GN TBN section.

Backlink target for: any post touching Blender groom/hair deformation, skinprim/skinprimuv, or Houdini↔Blender pipeline matching.

---

## Topic clusters for backlink suggestions

- **Claude Code / AI tooling**: ClaudeAI post is the primary target
- **Blender pipeline**: Blender post is the primary target
- **Asset management concepts** (Data-block, Fake User, Orphan Data): Blender post
- **MCP / Plugin / Subagent**: ClaudeAI post
- **Python scripting / context managers / bpy API**: Python post links to Blender post and vice versa
