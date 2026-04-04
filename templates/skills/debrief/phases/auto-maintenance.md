# Auto-Maintenance — Recurring Session-End Tasks

Define automated tasks that should run at the end of every session.
Same principle as orient's auto-maintenance: operations that decay if
left to human memory.

Session-end maintenance differs from session-start: orient's maintenance
prepares for work, debrief's maintenance cleans up after it.

When this file is absent or empty, this step is skipped. (`skip: true`
is equivalent to absent here.)

## What to Include

For each task, provide:
- **What** — the operation to perform
- **Why every session** — what decays if this is skipped
- **Command** — how to run it
- **Auto-execute?** — yes (run silently) or surface (ask user first)

## Example Maintenance Tasks

Uncomment and adapt these for your project:

<!--
### Scan for Stale Work Items
```bash
# Find items that should have been closed but weren't
sqlite3 project.db "SELECT id, text FROM tasks WHERE status = 'active' AND updated_at < date('now', '-14 days')"
```
Items that haven't been touched in two weeks may be stale. Surface for
user decision: still active, defer, or close.

### Clean Build Artifacts
```bash
rm -rf .build-cache/tmp/*
```
Temporary build artifacts that accumulate. Silent cleanup.

### Refresh Research / Prep
```bash
# Scan open items for ones that could benefit from background research
sqlite3 project.db "SELECT id, text FROM tasks WHERE status = 'active' AND prep_status IS NULL"
```
Identify work items where doing a quick research pass now would save
time in a future session. Auto-execute for quick items; surface complex
ones.
-->
