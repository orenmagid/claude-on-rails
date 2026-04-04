# Diff Upstream — Compare Project Against PIB Package

Compare the project's current adoption state (from detect-current) against
the upstream PIB package. Produce a categorized list of changes.

When this file is absent or empty, the default behavior is: look for
`process-in-a-box/` in the project root and perform semantic diffs of
all adopted skeletons. To explicitly skip diffing, write only `skip: true`.

## Locating Upstream

Default: `process-in-a-box/` in the project root. This is where the PIB
package lives when vendored into the project. If your project stores it
elsewhere (a submodule, a symlinked directory, a separate checkout),
specify the path here.

## Diff Strategy

The diff is **semantic, not textual.** Line-by-line diffs of markdown
files are noisy and miss the point. Instead:

### For Each Adopted Skeleton SKILL.md

Compare section by section:
- **Purpose/description** — has the framing changed?
- **Workflow steps** — are there new phases? Removed phases? Reordered?
- **Phase summary table** — do defaults differ?
- **Default behaviors** — for each phase, has the "absent/empty" behavior
  changed? This matters most for projects using defaults.
- **Calibration** — has the failure mode description evolved?
- **Extending section** — new extension examples?

### For Non-Adopted Skills

List any skills in upstream that the project hasn't adopted. For each,
note: name, one-line description, what problem it addresses.

### For Perspectives

- New perspectives in upstream that the project doesn't have.
- Updated perspectives where upstream content differs from project copy.
- New perspective groups.

### For Schema

Compare `pib-db-schema.sql` (or equivalent) column-by-column against
the project's actual database tables. Flag: new columns, changed types,
new tables, new indexes.

### For Infrastructure

- New hooks in upstream's recommended settings.
- New rules files in upstream's `.claude/rules/`.
- Changes to the PIB onboarding or seed skills.

## Output Format

A categorized change list, where each change has:
- **What** changed (specific file, section, or artifact)
- **Category** (1-6, matching the SKILL.md's change categories)
- **Summary** of the change in plain language
- **Impact** on the project (does this touch something the project customized?)

This feeds directly into the merge phase.
