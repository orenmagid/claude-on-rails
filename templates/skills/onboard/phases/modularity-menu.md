# Modularity Menu — Present Opt-In Modules

Present the PIB module hierarchy so the user can decide what to adopt now
and what to defer. The session loop is mandatory; everything else is
opt-in. Progressive adoption means starting with what you need and adding
modules as the project matures.

When this file is absent or empty, the default behavior is: read
`.pibrc.json` for module selections made during CLI install, then present
the module hierarchy with that context. To explicitly skip the menu,
write only `skip: true`.

## Reading CLI Selections (.pibrc.json)

If `.pibrc.json` exists in the project root, the CLI has already asked
about module selections. Read the `modules` and `skipped` fields:

- **Installed modules** (`modules` map, value `true`): These are already
  set up. Don't re-ask. Confirm what's installed and move on.
- **Skipped modules** (`skipped` map, with reasons): The user opted out
  during CLI install. The reason matters — it tells you what alternative
  to ask about. For example:
  - `"work-tracking": "User has existing Railway API"` → ask how they
    track work so you can wire phase files to their system
  - `"work-tracking": "Not needed yet"` → note it's available later, move on
  - `"audit": "Project too small"` → respect the decision, note the threshold

For skipped modules with alternatives, the interview (previous phase)
should have already asked about the alternative system. Use those answers
here to confirm the wiring plan.

If `.pibrc.json` doesn't exist (manual install or pre-npm adoption),
fall back to presenting the full menu as described below.

## Module Hierarchy

Present these in order from most fundamental to most specialized:

### 1. Session Loop (orient + debrief) — MANDATORY

Always set up. This is the minimum viable PIB adoption. Orient reads
state at session start; debrief writes state at session end. Without
this, nothing else has a foundation.

**What you get:** Context continuity between sessions. Claude starts
informed and ends by recording what happened. The project gets smarter
with each session instead of resetting to zero.

**Cost:** Two phase directories with a few files each. Runs at the
start and end of every session (adds 30-60 seconds each).

### 2. Work Tracking (pib-db) — RECOMMENDED

A lightweight SQLite-based task and project tracker. Gives orient
something to scan and debrief something to close.

**What you get:** Open actions, due dates, project containers, flagged
items. Orient surfaces what's overdue or due today. Debrief marks
things done. Plan creates work items.

**Cost:** One SQLite database, CLI interface via `node scripts/pib-db.js`.
No external service dependency.

**Skip if:** You already have a work tracker you're happy with (GitHub
Issues, Linear, Jira, a markdown file). You can wire the session loop to
your existing tracker instead.

### 3. Planning (plan + execute) — OPT-IN

Structured implementation planning with perspective-based critique and
execution with checkpoints.

**What you get:** Plans that carry enough detail for a future session to
execute without re-exploring the codebase. Perspective agents that
critique plans before execution. Execution with structured checkpoints.

**Cost:** Plan and execute skill configuration. Perspective setup if you
want critique. Adds deliberation time before building — this is the point.

**Skip if:** Your project's work is mostly small, clear tasks that don't
benefit from structured planning. Add this module when you start hitting
edge cases or duplicating work.

### 4. Compliance Stack (rules, hooks) — OPT-IN

Scoped instructions in `.claude/rules/` and deterministic enforcement
via hooks in `.claude/settings.json`.

**What you get:** Path-specific rules that load automatically (e.g.,
"when editing tests/, always run the test suite"). Hooks that enforce
hard guardrails (e.g., block commits without tests, validate file formats).

**Cost:** Rule files and hook scripts that need maintenance. Hooks run on
every tool invocation — poorly written hooks add latency.

**Skip if:** Your project doesn't yet have recurring mistakes worth
encoding. Add rules as patterns emerge from debrief lessons.

### 5. Audit Loop (audit + triage-audit + perspectives) — OPT-IN

Periodic expert-perspective analysis of the codebase with structured
triage of findings.

**What you get:** Semantic analysis by specialized perspectives (security,
accessibility, data integrity, etc.). Structured findings with severity
levels. Triage workflow to accept, defer, or dismiss findings.

**Cost:** Perspective configuration, audit runs (LLM-intensive), triage
time. This is the most expensive module in compute and attention.

**Skip if:** Your project is small enough to review holistically, or
you're not yet at the stage where systematic quality analysis adds value.
Add this when the codebase grows beyond what one person can hold in their
head.

### 6. Capability Seeding (seed) — OPT-IN

Bootstrap new skills, perspectives, or process components from PIB
skeleton templates.

**What you get:** Quick scaffolding of new capabilities with all required
files and wiring in place.

**Cost:** Minimal. This is tooling for extending the system itself.

**Skip if:** You're happy with the modules you have and aren't planning
to build custom skills or perspectives. Come back to this when you want
to extend.

## Presentation Guidelines

- **Present the full menu** so the user sees the landscape, but recommend
  based on what the interview revealed.
- **Mark the mandatory module** clearly — the session loop isn't optional.
- **Connect modules to pain points.** If the user mentioned stale deploys,
  note that health checks (part of the session loop) address this. If they
  mentioned duplicated work, note that the planning module helps.
- **Respect "not yet."** Deferring a module is fine. The menu is always
  available via re-running onboard.

## Re-Run Presentation

For re-runs, augment the menu with current adoption state:

```
Module                  Status          Notes
Session loop            ACTIVE          3 orient phases, 2 debrief phases
Work tracking           ACTIVE          47 actions, 8 projects
Planning                ACTIVE          Using plan + execute
Compliance stack        PARTIAL         2 rules files, no hooks
Audit loop              NOT ADOPTED     —
Capability seeding      NOT ADOPTED     —
```

Also surface:
- **Retirement candidates:** Modules or phase files that show signs of
  disuse (e.g., a health check that hasn't fired in weeks)
- **Growth candidates:** Modules the project seems ready for based on
  accumulated patterns or interview answers
