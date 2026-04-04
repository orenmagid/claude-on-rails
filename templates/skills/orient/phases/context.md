# Context — What to Read at Session Start

Define what files and state to load so the session starts with a model
of where things stand. The /orient skill reads this file and loads each
item before proceeding.

When this file is absent or empty, the default behavior is: read the
project's root CLAUDE.md, system-status.md, and relevant memory files.
To explicitly skip context loading, write only `skip: true`.

## What to Include

For each context source, provide:
- **What** — the file or data to read
- **Why** — what it tells you about current state
- **How** — the command or tool to read it (Read tool, sqlite3, curl, etc.)

## Example Context Sources

Uncomment and adapt these for your project:

<!--
### System Status
```
Read system-status.md
```
The single-source-of-truth for what's built, what's broken, and what's
next. Read every session — it's the fastest way to know where things
stand.

### Memory Files
```
Read memory/MEMORY.md for the index, then load files relevant to the
session's likely focus.
```
Persistent context from prior sessions — user preferences, project
state, feedback patterns, references. Don't read everything — scan
the index and load what's relevant.

### Project-Specific State
```
Read config/project-state.yaml
```
Whatever your project uses to track configuration, feature flags,
environment state, or deployment status. Anything that changes between
sessions and affects how you work.
-->
