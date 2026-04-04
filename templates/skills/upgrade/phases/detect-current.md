# Detect Current — Inventory PIB Adoption State

Build a structured manifest of the project's current PIB adoption. This
manifest is consumed by the diff-upstream phase to determine what has
changed.

When this file is absent or empty, the default behavior is: scan the
project's `.claude/skills/`, perspectives, hooks, and database for PIB
artifacts. To explicitly skip detection, write only `skip: true`.

## What to Inventory

### Skills

For each directory in `.claude/skills/`:
- **Is it a PIB skeleton?** Compare the SKILL.md against the upstream
  `process-in-a-box/skills/` directory. If it matches a known skeleton
  (by name or by frontmatter `name` field), it's a PIB skill.
- **Phase file status:** For each phase file the skeleton defines, check
  whether the project's copy is: absent (using default), empty (using
  default), contains `skip: true` (opted out), or contains custom content
  (project-specific adaptation).
- **Custom phases:** Any phase files in the project's `phases/` directory
  that the skeleton doesn't define are project extensions.

### Perspectives

- Which perspective groups exist in `.claude/skills/perspectives/`?
- Which perspectives are listed in each group's `_group.yaml`?
- Which perspectives have project-customized content vs upstream defaults?

### Hooks

- Read `.claude/settings.json` (or `.claude/settings.local.json`).
- Identify which hooks were installed as part of PIB adoption vs
  project-specific additions.

### Database Schema

- If the project uses `pib-db`, check the actual DB schema against
  known PIB columns. Record which tables and columns exist.
- Note the effective schema version (inferred from which columns are
  present, not from a version number).

### Memory and Patterns

- Count files in `memory/patterns/` and `memory/archive/`.
- Note whether the enforcement pipeline is active (patterns have
  `enforcement` frontmatter fields).

## Output Format

Produce a structured manifest (in conversation, not a file) listing:
- Each adopted skill with its phase file statuses
- Each adopted perspective group with member count
- Hook count and types
- Schema state
- Pattern/archive counts

This manifest feeds directly into the diff-upstream phase.
