---
name: integration-patterns
description: Patterns that work well for integrating temp_posts content into _posts
metadata:
  type: feedback
---

## Temp posts content patterns observed

**Content type: AI Q&A chat logs (Korean)**
The author pastes raw AI conversation responses. These always contain:
- Conversational openers ("네, 아주 정확한 지적입니다!", "결론부터 말씀드리면") — strip entirely
- Emoji bullets — strip or convert to plain bullets
- Redundant preamble paragraphs — condense to one bridge sentence or drop
- Useful: tables, step lists, code blocks, conceptual comparisons

**Extraction rule:** Keep tables, numbered steps, code blocks, and the conceptual "why" behind each point. Drop all meta-commentary, rhetorical framing, and closing pleasantries.

## Insertion placement patterns

**Empty stub sections** (e.g., `### Agents - How to create` followed only by `---`): Insert directly — the author clearly planned this slot for this content.

**Conceptual foundation before procedural content**: When temp content explains "what X is" and the post already has "how to use X," insert the conceptual section as the first `###` under the relevant `##`, before the procedural sections.

**Multi-topic temp files**: Split into separate sections at their natural topic boundaries. Don't force unrelated topics into a single section.

## Style conventions confirmed

- `####` headings for numbered steps within a workflow section (keeps TOC clean)
- Tables for side-by-side comparisons (Node Group vs Modifier pattern worked well)
- Blockquote (`>`) for tips/caveats that are important but shouldn't interrupt the main flow
- Code blocks always get language identifiers; `markdown` for agent file examples
- Korean for step descriptions, English for UI element names (e.g., `Mark as Asset`, `Recursive Unused Data`)

## What NOT to do

- Do not append all new content at the end of a post — find the logical home within existing structure
- Do not preserve emoji-heavy original formatting; convert to clean markdown
- Do not include the Q&A question text itself — only the answer's substance
- Do not create a new `##` section for content that logically belongs under an existing `##`
