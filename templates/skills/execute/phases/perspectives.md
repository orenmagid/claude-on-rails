# Perspectives — Which to Activate for Execution

Define which perspectives to activate during plan execution, any
always-on perspectives, and any project-specific checkpoint rules.
The /execute skill reads this file when selecting perspectives for
the three checkpoint stages.

When this file is absent or empty, the default behavior is: scan all
perspectives in `.claude/skills/perspectives/*/SKILL.md`, activate those
whose activation signals match the plan's surface area or topic keywords.
To explicitly skip all perspective checkpoints (even if perspectives
exist), write only `skip: true`.

If no perspectives exist in the project, checkpoints are skipped regardless.

## What to Include

- **Always-on perspectives** — perspectives that activate for every
  execution regardless of surface area
- **Checkpoint-specific rules** — which perspectives at which checkpoints
  (pre-implementation, per-file-group, pre-commit)
- **Escalation overrides** — stricter or more lenient than default
- **Performance tuning** — skip per-file-group checkpoints for small plans,
  or reduce to pre-commit only for low-risk changes

## Example Perspective Configurations

Uncomment and adapt these for your project:

<!--
### Always-On for Execution
These perspectives activate at every checkpoint:
- boundary-conditions — catches edge cases in implementation
- qa — tracks acceptance criteria throughout

### Checkpoint-Specific Rules
- Pre-implementation (Checkpoint 1): all activated perspectives
- Per-file-group (Checkpoint 2): only perspectives matching changed files
- Pre-commit (Checkpoint 3): all activated perspectives (full sweep)

### Performance Tuning
For plans with surface area <= 3 files, skip per-file-group checkpoints
(Checkpoint 2) and go straight to pre-commit sweep. The overhead of
multiple checkpoints isn't justified for small changes.

### Escalation Overrides
- Security **stop** → always halt, no bypass without explicit user ack
- QA **pause** for failing AC → escalate to stop (AC failures are blocking)
-->
