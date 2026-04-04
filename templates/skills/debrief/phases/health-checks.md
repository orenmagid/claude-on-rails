# Health Checks — Session-End Verification

Define health checks to run at the end of the session. These verify that
the session's work didn't break anything and that the system is in a
good state for the next session.

When this file is absent or empty, this step is skipped. (`skip: true`
is equivalent to absent here.)

End-of-session health checks differ from start-of-session: orient checks
catch pre-existing problems; debrief checks catch problems the session
may have introduced.

## What to Include

For each check, provide:
- **Name** — short label for reporting
- **Command** — how to run the check
- **What it catches** — what could have gone wrong during the session
- **If it fails** — fix now, or note for next session?

## Example Health Checks

Uncomment and adapt these for your project:

<!--
### Memory Index Freshness
```bash
# Verify all memory files are listed in the index
ls memory/*.md | while read f; do
  basename="$(basename $f)"
  grep -q "$basename" memory/MEMORY.md || echo "MISSING: $basename"
done
```
Catches memory files created during the session that weren't added to
the index. Fix immediately — an unlisted memory file is invisible.

### State File Consistency
```bash
# Verify system-status.md was updated if code changed
CHANGED=$(git diff --name-only HEAD~5 | grep -v '.md$' | wc -l)
STATUS_CHANGED=$(git diff --name-only HEAD~5 | grep 'system-status.md' | wc -l)
[ "$CHANGED" -gt 0 ] && [ "$STATUS_CHANGED" -eq 0 ] && echo "WARN: code changed but status not updated"
```
If code was changed but the status file wasn't updated, the next
orient will read stale state. Fix before closing.

### Build Verification
```bash
npm run build 2>&1 | tail -5
```
Verify the project still builds after changes. If broken, fix before
committing or note the failure clearly.
-->
