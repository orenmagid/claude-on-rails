# Evaluate Existing — Compare Signals Against Perspective Cabinet

For each technology signal detected in the scan phase, check whether a
matching perspective already exists and whether it is current. The /seed
skill reads this file after scanning to determine what needs building
versus what needs updating.

When this file is absent or empty, the default behavior is: compare
each detected signal against `.claude/skills/perspectives/` and report
gaps and staleness. To explicitly skip evaluation, write only `skip: true`.

## What to Include

Define your evaluation strategy:
- **How to match** — what counts as a perspective "covering" a technology
  (name match, scan scope overlap, domain description)
- **What "stale" means** — how to detect that a perspective exists but
  hasn't kept up with the technology
- **What to present** — how to show the user the gap/staleness analysis

## Default Evaluation

For each detected technology signal:

1. **Search for matching perspective.** Check each perspective's SKILL.md
   in `.claude/skills/perspectives/` for:
   - Name or description mentioning the technology
   - Scan scope covering directories where the technology's files live
   - Domain coverage that would include the technology's concerns

2. **Assess coverage quality.** If a match exists:
   - Does the perspective's scan scope include the right directories?
     (e.g., a data-integrity perspective should cover wherever the DB
     files and migration scripts live)
   - Does the perspective reference the current technology version or
     configuration? (e.g., if the project moved from CommonJS to ESM,
     does the boundary-conditions perspective know?)
   - Has the perspective produced findings in recent audits? (A
     perspective that never fires may have a stale scope)

3. **Classify each signal:**
   - **Covered** — matching perspective exists and is current
   - **Gap** — no matching perspective covers this technology
   - **Stale** — perspective exists but scope, version, or domain
     description is outdated
   - **Absorbed** — no dedicated perspective, but an existing broader
     perspective covers the concern adequately

4. **Present the analysis** to the user as a table:
   | Technology | Status | Perspective | Notes |
   |------------|--------|-------------|-------|
   Show all four categories. Let the user decide which gaps to fill
   and which staleness to address. Not every gap needs a perspective.

## Overriding This Phase

Projects override this file when they have non-standard perspective
storage, custom matching logic, or additional assessment criteria.
For example, a project that stores perspectives in a different location,
or one that tracks perspective health metrics in a database rather
than relying on file-level inspection.
