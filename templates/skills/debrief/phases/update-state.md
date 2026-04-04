# Update State — What to Update After the Session

Define what state files and documentation to update so the system's
persistent state reflects what actually happened.

When this file is absent or empty, the default behavior is: check
whether system-status.md needs updating. To explicitly skip state
updates, write only `skip: true`. Stale state erodes
trust — an item marked "planned" that's actually built, or a status
file that says "incomplete" for something that shipped, makes the
system less reliable for the next orient.

## What to Include

For each state artifact, provide:
- **File** — what to check and potentially update
- **What changes** — what kind of updates to look for
- **How to update** — edit the file, run a command, call an API

## Example State Updates

Uncomment and adapt these for your project:

<!--
### System Status File
```
Read and update system-status.md:
- Move completed items from "Planned" or "In Progress" to "Built"
- Add new capabilities that didn't exist before
- Update any counts or metrics
- Note new known issues discovered during the session
```

### Project Documentation
Check if any of these need updating based on what changed:
- Root CLAUDE.md — new workflows, entity types, directories?
- Directory-level CLAUDE.md files — changed conventions?
- Schema or configuration files — new fields or types?
- README — new features or changed setup instructions?

Only update what actually changed. Don't rewrite docs for no reason.

### Skills and Process Docs
Review what happened during the session:
- Did any skill's instructions prove wrong or incomplete? Fix it.
- Did a workflow gap surface? Update the relevant skill.
- Did you discover a better approach? Record it where it helps.
-->
