# Calibration Examples — Detailed Before/After Plans

Provide project-specific before/after plan examples showing exact
formatting. The /plan skill reads this file during calibration to
reinforce what good and bad plans look like in your project's context.

When this file is absent or empty, the default behavior is: use the
narrative calibration examples in the skeleton only. To explicitly skip
detailed examples, write only `skip: true`.

## What to Include

At least one bad plan and one good plan using your project's actual plan
template format. Show:
- Real-looking (but anonymized) content
- The specific failure modes your project has encountered
- How surface area, acceptance criteria, and feature completeness differ

## Default Examples

These generic examples apply to any project using the standard template:

### Bad Plan

```markdown
## Implementation
1. Add onProjectEmpty callback to useProjectActions hook
2. Update FolderCard to accept the callback

## Surface Area
- files: hooks/useProjectActions.ts
- files: components/FolderCard.tsx

## Verification
- Verify it works correctly
- Check that the callback fires
```

Problems: Surface area is incomplete (page components that wire the
callback are missing — the callback exists but nothing calls it).
Verification criteria are untestable ("works correctly" is not pass/fail).
The plan delivers dead code: an API nobody invokes.

### Good Plan

```markdown
## Problem
When all actions in a project's folder are completed or moved, the folder
stays open with an empty list. Users have to manually navigate away.
Auto-closing or prompting would reduce friction.

## Implementation
1. Add onProjectEmpty callback to useProjectActions hook (hooks/useProjectActions.ts)
2. Implement empty-detection logic: after action complete/move, check remaining count
3. Update FolderCard to accept and invoke onProjectEmpty (components/FolderCard.tsx)
4. Wire callback in ActionsPage and ProjectDetailPage to navigate back on empty
5. Add empty-state message for the brief moment before navigation

## Surface Area
- files: hooks/useProjectActions.ts
- files: components/FolderCard.tsx
- files: pages/ActionsPage.tsx
- files: pages/ProjectDetailPage.tsx

## Acceptance Criteria
- [auto] TypeScript compiles clean: npx tsc -b --noEmit returns 0 errors
- [auto] Completing last action in a project via API triggers callback (test with curl)
- [manual] Completing last visible action in FolderCard navigates user back to parent view
- [manual] Empty state message appears briefly before navigation
- [manual] Projects with remaining actions are unaffected
```

Surface area includes every file mentioned in implementation. AC are
pass/fail with [auto]/[manual] tags. The plan delivers a complete feature
the user can see and verify — no dead code.
