# Perspective Critique — How to Activate Expert Review

Define which perspectives to activate during planning, any special rules,
and any project-specific critique workflow. The /plan skill reads this
file before running the perspective critique step.

When this file is absent or empty, the default behavior is: scan all
perspectives in `.claude/skills/perspectives/*/SKILL.md`, activate those
whose activation signals match the plan's surface area or topic keywords,
and spawn each as a parallel agent. To explicitly skip perspective
critique (even if perspectives exist), write only `skip: true`.

If no perspectives exist in the project, critique is skipped regardless.

## What to Include

- **Always-on perspectives** — perspectives that activate for every plan
- **Special committees** — groups of perspectives that work together for
  specific plan types (e.g., UI plans get a design committee)
- **Escalation overrides** — project-specific rules for how to handle
  verdicts (stricter or more lenient than default)
- **Additional context** — anything perspectives need beyond `_context.md`

## Example Perspective Critique Configuration

Uncomment and adapt these for your project:

<!--
### Always-On for Planning
These perspectives activate for every plan regardless of surface area:
- security — every change has security implications
- architecture — structural coherence across the codebase

### Design Committee (UI Plans)
When the plan's surface area includes UI files (pages/*.tsx,
components/**/*.tsx), activate both of these as a committee:
- information-design — produces visual mock, evaluates hierarchy
- usability — critiques interaction model, accessibility

If the design committee produces a mock, open it in the browser for
user review. User approval covers plan AND mock.

### Escalation Rules
- Any **block** from security → stop, no override without explicit user ack
- Architecture **conditional** → always address before presenting
- Other **conditional** → include in presentation, user decides
-->
