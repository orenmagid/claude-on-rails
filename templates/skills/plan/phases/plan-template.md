# Plan Template — Your Project's Plan Structure

Define the sections every plan should have and what each section contains.
The /plan skill reads this file when drafting and structures the plan
accordingly.

When this file is absent or empty, the default template is used:
Problem, Implementation, Surface Area, Acceptance Criteria. To explicitly
skip (no template structure), write only `skip: true`.

## What to Include

- **Required sections** — what every plan must have
- **Section descriptions** — what goes in each section, how detailed
- **Optional sections** — sections to include when relevant
- **Format conventions** — how to mark file paths, new files, categories

## Example Plan Templates

Uncomment and adapt these for your project:

<!--
### Standard Plan Template

```markdown
## Problem
What friction, gap, or issue exists. Why this matters. Include links
to related issues or feedback if applicable.

## Implementation
Numbered steps with file paths (`src/components/...`). Enough detail
to execute without re-exploring. Each step should be independently
verifiable where possible.

## Surface Area
Every file that will be created or modified:
- files: path/to/file1.ext
- files: path/to/file2.ext (new)
- dirs: path/to/new-directory/ (new)

## Acceptance Criteria
Testable criteria — each marked by category:
- [auto] Criteria verifiable by running a command
- [manual] Criteria requiring human judgment or interaction
- [deferred] Criteria that can't be tested until later

## Design Decisions
Key choices made and why. Include alternatives considered and why they
were rejected. This helps future sessions evaluate whether the plan
still makes sense if context has changed.
```

### Extended Template (for larger plans)

Add these sections when the plan is complex:

```markdown
## Dependencies
Other work items that must be completed first, or that this plan
affects. Reference by ID, not by description.

## Risk Assessment
What could go wrong. What's the rollback plan if this doesn't work.

## Migration / Rollout
If this changes data or behavior, how to migrate. Can it be deployed
incrementally?
```
-->
