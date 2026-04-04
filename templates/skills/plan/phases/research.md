# Research — What to Investigate Before Planning

Define what to always investigate before drafting a plan. The /plan skill
reads this file and follows this guidance before proposing any solution.

When this file is absent or empty, the default behavior is: explore the
codebase to understand what files are involved, what patterns exist, what
the current behavior is, and what constraints apply. To explicitly skip
this phase (no default, no custom), write only `skip: true`.

## What to Include

Project-specific research guidance:
- **Required reading** — files, docs, or external sources to always check
- **Domain resources** — architecture decision records, design system docs,
  API changelogs, wikis
- **Consultation patterns** — "always check with [person/team] for changes
  to [area]"
- **External sources** — MCP servers, documentation sites, ecosystem tools

## Example Research Guidance

Uncomment and adapt these for your project:

<!--
### Always Read First
- `docs/architecture-decisions/` — check for ADRs related to this area
- `CHANGELOG.md` — understand recent changes that might affect this work
- The relevant `CLAUDE.md` in the directory being modified

### Domain Documentation
Before proposing API changes, check the API style guide at `docs/api-style.md`.
Before proposing UI changes, check the design system at `docs/design-system.md`.

### External Sources
Use the framework-docs MCP server to check for relevant framework patterns
before proposing implementation approaches that might have well-known
solutions.

### Stakeholder Context
For changes to shared infrastructure, check whether other teams have
open work in the same area (query the issue tracker).
-->
