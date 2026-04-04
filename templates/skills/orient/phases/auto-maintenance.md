# Auto-Maintenance — Recurring Session-Start Tasks

Define automated tasks that should run every session. These are operations
that would decay if left to human memory — the anti-entropy principle
applied to session management.

The distinction from health checks: health checks DETECT problems;
auto-maintenance DOES work. A health check reports "data is stale."

When this file is absent or empty, this step is skipped. (`skip: true`
is equivalent to absent here.)
An auto-maintenance task runs the sync to fix it.

## What to Include

For each task, provide:
- **What** — the operation to perform
- **Why every session** — what decays if this is skipped
- **Command** — how to run it
- **Auto-execute?** — yes (run silently) or surface (ask user first)

## Example Maintenance Tasks

Uncomment and adapt these for your project:

<!--
### Process Pending Queue Items
```bash
# Check for items queued by external systems
curl -s https://your-api.example.com/api/queue/pending
```
Items queued from a UI or external integration since last session.
Auto-execute routine items; surface unusual ones for confirmation.

### Rotate Logs
```bash
# Truncate logs that grow unbounded
tail -1000 sync/app.log > sync/app.log.tmp && mv sync/app.log.tmp sync/app.log
```
Prevents log files from consuming disk. Silent, no user interaction.

### Refresh Cached Computations
```bash
./scripts/rebuild-index.sh
```
Regenerates derived data that may have drifted from source files.
Run if source files changed since last session.
-->
