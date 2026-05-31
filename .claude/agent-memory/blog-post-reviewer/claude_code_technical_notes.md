---
name: claude-code-technical-notes
description: Accuracy issues and correct facts for Claude Code / Claude AI posts — found during review of 2026-02-08-ClaudeAI.md
metadata:
  type: project
---

**Claude Projects file upload limits (2026):**
The current limit is 30 MB per file with no hard cap on file count (the old "20 files max" claim was incorrect). The effective cap is the model's ~200K token context window; when exceeded, Claude automatically switches to RAG mode.

**Agent hooks frontmatter syntax:**
The correct YAML format in agent/skill frontmatter mirrors `settings.json` — it is a nested dict keyed by event name, NOT a flat list of objects with an `event:` key:

```yaml
hooks:
  PreToolUse:
    - matcher: Bash
      hooks:
        - type: command
          command: ./check.py
  PostToolUse:
    - matcher: Write
      hooks:
        - type: command
          command: git diff
```

The flat format `- event: PreToolUse / matcher: Bash / command: ...` is **wrong**.

**Stop hook in subagent frontmatter:**
When a `Stop` hook is defined in a subagent's frontmatter, it is automatically converted to `SubagentStop`. Exit code 2 from a Stop hook forces Claude to keep working. Always check `stop_hook_active` in a Stop hook — if `true`, return exit 0 immediately to prevent infinite loops.

**Hook events supported in agent frontmatter:**
`PreToolUse`, `PostToolUse`, `Stop` (→ `SubagentStop` for agents). Three events total.

**Session fork/branch:**
The correct way to fork a session is `/branch` (inside a session) or `claude --resume <sessionID> --fork-session` from the CLI. `claude --continue --fork-session` is NOT valid — `--fork-session` requires a specific session ID via `--resume`.

**Session `--name` / `-n` flag:**
`claude --name [이름]` or `claude -n [이름]` assigns a human-readable name at session start. This was missing from the post.

**`claude project purge` (released v2.1.126, May 1 2026):**
Deletes all Claude Code state for a project (transcripts, tasks, file history, config entry). Does not delete code files. `--dry-run` flag available for preview. This command is confirmed real and current.

**Why:** Found during review of `_posts/2026-02-08-ClaudeAI.md` on 2026-05-30.

**How to apply:** When reviewing or adding content about Claude Code, verify hooks syntax against the nested-dict pattern, check file upload limits, and confirm session management flags against current docs.

[[user-profile]]
