# Perspectives — Which Expert Lenses to Activate

Define which perspectives (expert evaluation lenses) should be active
during this session. Active perspectives watch for specific concerns
throughout the session without being explicitly invoked for each decision.

When this file is absent or empty, this step is skipped. (`skip: true`
is equivalent to absent here.)

## What to Include

For each perspective, provide:
- **Name** — the perspective to activate
- **Path** — where the perspective's SKILL.md lives
- **When active** — always, or only under certain conditions
- **What it watches for** — the concern this lens monitors

## Example Perspective Configurations

Uncomment and adapt these for your project:

<!--
### Always-On Perspectives

These activate every session regardless of focus:

**QA Perspective** (`.claude/skills/perspectives/qa/SKILL.md`):
Watches for untested changes, missing edge cases, and quality gaps.
Active whenever code is being written or modified.

**Process Perspective** (`.claude/skills/perspectives/process/SKILL.md`):
Watches for process deviations — skipped steps, missing validation,
undocumented decisions. Active every session.

### Conditional Perspectives

These activate based on session context:

**Security Perspective** (`.claude/skills/perspectives/security/SKILL.md`):
Activate when the session involves authentication, data handling,
external APIs, or user input processing.

**Performance Perspective** (`.claude/skills/perspectives/performance/SKILL.md`):
Activate when the session involves database queries, rendering logic,
or data processing at scale.
-->
