# Health Checks — System Health at Session Start

Define health and validation checks to run early in the session. These
catch problems before they waste time — stale data, broken references,
failed background processes, configuration drift.

Projects add health checks as they discover failure modes worth detecting
early. A new project may have none; a mature project may have many.

When this file is absent or empty, this step is skipped. (`skip: true`
is equivalent to absent here.)

## What to Include

For each check, provide:
- **Name** — short label for reporting
- **Command** — how to run the check
- **What it catches** — what failure looks like
- **Severity** — blocking (stop and fix) vs. warning (note and continue)

## Example Health Checks

Uncomment and adapt these for your project:

<!--
### Data Freshness
```bash
# Check if local data cache is recent enough to trust
LAST_SYNC=$(stat -f %m .cache/db.sqlite 2>/dev/null || echo 0)
NOW=$(date +%s)
AGE=$(( (NOW - LAST_SYNC) / 3600 ))
[ "$AGE" -lt 24 ] && echo "fresh" || echo "STALE: ${AGE}h old"
```
Warns if local data hasn't been synced in over 24 hours. Not blocking —
stale data is usable but may be wrong.

### Background Process Health
```bash
# Check if a background process is still running
pgrep -f "your-daemon" > /dev/null && echo "running" || echo "NOT RUNNING"
```
Warns if a background process that should be running has stopped.

### Reference Integrity
```bash
./scripts/validate-refs.sh
```
Checks that cross-references between files are still valid. Catches
renames and deletions that break links.
-->
