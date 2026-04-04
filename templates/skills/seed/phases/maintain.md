# Maintain — Perspective Cabinet Health Review

Review existing perspectives for health: retirement candidates, update
needs, and coverage gaps. The /seed skill reads this file after building
new perspectives (or when no new perspectives are needed).

When this file is absent or empty, the default behavior is: review the
full perspective cabinet using the criteria below. To explicitly skip
maintenance, write only `skip: true`.

## What to Include

Define your maintenance strategy:
- **Retirement criteria** — what signals that a perspective should be removed
- **Update criteria** — what signals that a perspective needs revision
- **Coverage analysis** — how to detect areas of the codebase that no
  perspective watches
- **Presentation** — how to show recommendations to the user

## Default Maintenance Review

### Retirement Candidates

Check each perspective for retirement signals:

- **Technology removed.** The dependency, config file, or infrastructure
  that the perspective watches is gone from the project. A perspective
  for a framework you no longer use is dead weight.

- **High rejection rate.** If more than half of a perspective's audit
  findings are rejected at triage, it's miscalibrated. Either refine it
  (adjust scope, update calibration examples) or retire it if the domain
  isn't worth the maintenance.

- **Stale scan scope.** The directories or files the perspective checks
  no longer exist. The perspective runs but examines nothing.

- **Absorbed by another.** A broader perspective was created that covers
  the same concerns. The narrow one is now redundant.

Apply `_lifecycle.md` criteria for formal assessment. Recommend
retirements as readily as adoptions — a lean cabinet is healthier than
a comprehensive one with dead weight.

### Update Candidates

Check each perspective for update signals:

- **Version drift.** The technology version changed significantly
  (major version bump, breaking changes). The perspective's calibration
  examples and research method may reference outdated patterns.

- **Scope expansion needed.** New directories were added that fall under
  the perspective's domain but aren't in its scan scope. For example,
  a security perspective that scans `routes/` but the project added an
  `api/` directory with new endpoints.

- **New features.** The technology added capabilities that the project
  now uses but the perspective doesn't check. For example, SQLite added
  JSON functions that the project started using — the data-integrity
  perspective should know about JSON type coercion.

### Coverage Gaps

Scan the codebase for areas no perspective watches:

- Directories with significant logic that aren't in any perspective's
  scan scope
- File types that have grown in number but lack a corresponding
  perspective (e.g., many migration files but no migration-safety
  perspective)
- Patterns that recur across the codebase that no perspective checks
  (e.g., error handling patterns, logging patterns)

### Presentation

Present maintenance recommendations as three lists:

1. **Retire** — perspectives to remove, with reasoning
2. **Update** — perspectives to revise, with specific changes needed
3. **Gap** — uncovered areas that might warrant new perspectives

The user decides on each recommendation. Retirement is not failure —
it's the system staying lean.

## Overriding This Phase

Projects override this file when they have additional maintenance
criteria (e.g., cost tracking for perspectives, team assignment
reviews), different retirement thresholds, or non-standard health
metrics. For example, a project that tracks perspective ROI based on
bugs caught per audit cycle.
