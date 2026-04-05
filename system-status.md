# System Status — Claude on Rails

## What's Built

- CLI installer with interactive and flag-based module selection
- 8 modules: session-loop, hooks, work-tracking, planning, compliance, audit, lifecycle, validate
- 3 install modes: Everything, Lean (`--lean`), Custom (interactive per-module)
- Template copying with hash-based conflict detection and manifest tracking
- Existing installs: add-only (no overwrite prompts), updates via `/cor-upgrade`
- Conflict prompts show full paths (`.claude/skills/orient/SKILL.md` not `SKILL.md`)
- Safe reset via `--reset` (manifest-aware, won't delete customized files)
- Settings merge (hooks into `.claude/settings.json`)
- Optional SQLite work tracker setup
- 20 expert perspectives for audit system
- Conversational onboard, seed, and cor-upgrade skills
- Link/unlink skills for local dev workflow
- Publish skill with post-publish dogfood sync
- Extract skill for proposing upstream extraction from consuming projects
- Dogfooded: CoR installed on itself via `--lean` with full context layer

## What's Active

- Published at v0.3.4 on npm
- Flow updated with new skills and .corrc.json rename
- Flow pending `/cor-upgrade` to refresh SKILL.md skeletons

## What's Planned

- Onboard interview testing across different project types
- Run `/cor-upgrade` in Flow to update SKILL.md skeletons
- Run `/extract` from Flow to test the proposal pipeline
- Perspective seeding from tech signals (`/seed`)
- README update to document `--lean` flag and new skills
