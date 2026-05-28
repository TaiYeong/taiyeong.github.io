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

Backlink target for: any post touching Claude Code, MCP, or AI automation workflows.

---

### `2026-02-28-blender.md` — "Blender"
Category: pipeline
Topics: Bardel pipeline dept structure (Surfacing/Lighting/Rendering), dev-items per dept, Blender official docs notes (Data-Blocks, Asset, Scene, Collection, Packed Data, File Paths, Asset Browser, Blend file previews), Geometry Nodes use cases (Sample/Resample nodes, fetch & transfer values, rest_position case study)

**New sections added 2026-05-27** (within `## Use Cases of Geometry Nodes`):
- `### Node Group vs Modifier: 핵심 개념 구분` — concept table differentiating Node Group (storable asset) vs Modifier (executor)
- `### Geometry Node Asset 정리 및 에셋화` — 4-step workflow to clean orphan data and publish a node group as an asset

Backlink target for: any post touching Blender pipeline, asset management, or geometry nodes.

---

### `_posts/2024-07-26-unreal.md`
Status: DELETED in working tree (git status shows `D _posts/2024-07-26-unreal.md`). Do not reference or link to this post until it is restored.

---

## Topic clusters for backlink suggestions

- **Claude Code / AI tooling**: ClaudeAI post is the primary target
- **Blender pipeline**: Blender post is the primary target
- **Asset management concepts** (Data-block, Fake User, Orphan Data): Blender post
- **MCP / Plugin / Subagent**: ClaudeAI post
