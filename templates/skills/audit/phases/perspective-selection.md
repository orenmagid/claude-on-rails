# Perspective Selection — Which Perspectives to Run

Define how the audit selects which perspectives to run. The /audit skill
reads this file before spawning perspective agents.

When this file is absent or empty, the default behavior is: discover all
perspectives from `skills/perspectives/*/SKILL.md`, present groups if
`_groups.yaml` exists, otherwise run all. To explicitly skip perspective
selection (and run no audit), write only `skip: true`.

## What to Include

Define your selection strategy:
- **Discovery** — where to find available perspectives
- **Grouping** — how perspectives are organized (groups, tiers, categories)
- **Default set** — what runs when no specific request is made
- **Selection interface** — how the user chooses (menu, flags, auto)

## Example Strategies

Uncomment and adapt for your project:

<!--
### Run All (simplest)
Discover all perspectives in `skills/perspectives/*/SKILL.md`.
Run every one. Good for small projects with few perspectives.

### Group-Based Selection
Read `skills/perspectives/_groups.yaml` for group definitions.
Present groups to the user:
  1. ux — accessibility, mobile-responsiveness
  2. code — technical-debt, architecture
  3. health — security, data-integrity, performance
  4. process — process, documentation

Cross-cutting perspectives (marked in _groups.yaml) always run
regardless of group selection.

### Targeted Audit
Accept a perspective name or group as an argument:
  /audit security          — run only the security perspective
  /audit --group health    — run the health group
  /audit --all             — run everything
-->
