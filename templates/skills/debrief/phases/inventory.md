# Inventory — How to Identify What Was Done

Define how to determine what the session accomplished. The /debrief skill
reads this file to build a list of completed work before matching it
against open items.

When this file is absent or empty, the default behavior is: review git
log, files changed, and session context. To explicitly skip inventory,
write only `skip: true`.

## What to Include

For each evidence source, provide:
- **Source** — where to look for what changed
- **Command** — how to query it
- **What it reveals** — commits, file changes, conversation actions

## Example Inventory Methods

Uncomment and adapt these for your project:

<!--
### Git History
```bash
git log --oneline -20    # recent commits
git diff --stat HEAD~5   # files changed
```
The primary evidence of what was built, fixed, or modified.

### Conversation Context
Review what was discussed, what plans were executed, what features were
built, what bugs were fixed. This catches work that isn't yet committed.

### Deployment Log
```bash
cat deploy/latest.log
```
If the session included a deployment, note what was deployed and whether
it succeeded.
-->
