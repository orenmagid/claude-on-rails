# Perspective Lifecycle

How perspectives enter, evolve, and leave your project's expertise cabinet.
Adding a perspective is hiring an expert. Retiring one is letting someone
go when their expertise is no longer needed. Both decisions require judgment.

## When to Adopt a Perspective

**Technology signal.** Adopted React? Consider accessibility and
mobile-responsiveness. Using SQLite? Consider data-integrity. Chose a
UI framework? Consider a framework-quality perspective. The technology
choice itself is the signal — you don't wait for an incident.

**Incident signal.** A security breach, a data loss, a deployment that
broke production — each reveals expertise the project lacked. Build a
perspective to carry that expertise forward so the system remembers
what the human might forget.

**Growth signal.** Working with a team? Consider process and documentation.
Managing multiple areas? Consider organized-mind. Tracking complex state?
Consider data-integrity with broader scope.

**Audit gap signal.** During audit triage, you notice recurring friction
that no perspective covers. Before hiring a new perspective, check whether
an existing one could expand its scope. If not, that's a genuine gap.

## When to Retire a Perspective

**No signal, no findings.** If a perspective hasn't caught a real issue
(approved finding) in 3+ audit cycles, it may be dead weight. Check:
- Has the domain it covers changed? (Migrated off the framework, removed
  the feature)
- Is its scan scope stale? (Files it checks no longer exist)
- Has another perspective absorbed its concerns?

**High rejection rate.** If >50% of a perspective's findings are rejected
at triage, it's miscalibrated. Either refine it (via `_eval-protocol.md`)
or retire it if the domain isn't worth the maintenance.

**Domain no longer relevant.** Dropped the UI framework the perspective
checked. Moved to a managed database that handles integrity itself.
Retired the feature the perspective watched.

Retirement is healthy. A lean cabinet of active perspectives is better
than a large one with dead weight. The system stays lean by actively
pruning, not just actively growing.

## How to Assess

Use `_eval-protocol.md` for structured assessment:

1. Define 3-5 assertions about what the perspective should catch
2. Sample recent audit runs for evidence
3. Score: pass / partial / fail / untestable
4. Track over time: declining pass rate = drift

**Key metric: triage acceptance rate.** What fraction of a perspective's
findings does the user approve vs reject? This is the strongest signal
of calibration quality.

## Cross-Cutting vs Grouped

Most perspectives belong in exactly one group (see `_groups-template.yaml`).
They cover a specific domain and stay in their lane.

**Cross-cutting perspectives** intentionally span domains. Their expertise
(reasoning quality, cognitive load, test coverage) touches everything.
These activate via `always-on-for` signals in their SKILL.md frontmatter,
not by group membership. Examples: anti-confirmation, qa, debugger,
organized-mind.

Don't put a cross-cutting perspective in a group. It would run in group
audits where it doesn't belong, and miss ungrouped contexts where it does.

## Creating a New Perspective

A perspective is a skill with `user-invocable: false`. Create it in
`.claude/skills/perspectives/{name}/SKILL.md` with:

1. **Identity** — who is this expert? What do they care about?
2. **Activation Signals** — `always-on-for`, `files`, `topics`
3. **Research Method** — what to examine, what tools to use, what to
   reason about
4. **Boundaries** — what this perspective does NOT own (prevents overlap)
5. **Calibration Examples** — good findings, wrong-lane findings, severity
   anchors

Add the perspective to your `_groups.yaml` under the appropriate group.
It's automatically discovered by the audit skill.

The best perspectives emerge from real incidents and real audit findings.
Start rough, refine through use. A perspective that catches one real issue
is worth more than one that catches nothing precisely.
