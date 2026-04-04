# Verification Tools — How to Check Acceptance Criteria

Define what tools your project has for verifying acceptance criteria.
The /execute skill reads this file during the QA gate (Step 7) to know
what's available for checking [manual] criteria.

When this file is absent or empty, the default behavior is: use whatever
tools are available in the environment. For [auto] criteria, run the
command. For [manual] criteria, attempt verification with available
tools before deferring to the user. To skip tool-based verification
entirely (defer all manual criteria to user), write only `skip: true`.

## What to Include

- **Available tools** — what verification tools the project has
- **Tool-to-criterion mapping** — which tool to use for which kind of check
- **Limitations** — what genuinely can't be verified with tools
  (physical hardware, native gestures, audio output)

## Example Verification Tool Configurations

Uncomment and adapt these for your project:

<!--
### Preview Tools (Claude Code built-in)
For web applications with a dev server:
- preview_start — ensure a dev server is running
- preview_snapshot — check page content, structure, element presence
- preview_screenshot — capture visual state for layout/styling checks
- preview_click — test interactive elements (buttons, toggles, menus)
- preview_fill — test form inputs
- preview_console_logs — check for runtime errors
- preview_inspect — verify CSS properties
- preview_eval — run JS to navigate, scroll, check DOM state
- preview_resize — test responsive behavior

Tool-to-criterion mapping:
- "Page renders X" → preview_snapshot or preview_screenshot
- "Clicking X does Y" → preview_click + preview_snapshot
- "No console errors" → preview_console_logs
- "Element has style X" → preview_inspect
- "Responsive at Npx" → preview_resize + preview_screenshot

### Test Runner
```bash
npm test -- --grep "test-pattern"
pytest -k "test_pattern"
```

### API Verification
```bash
curl -s -o /dev/null -w "%{http_code}" https://localhost:3000/api/endpoint
```

### Browser Automation (external)
If using Playwright, Cypress, or similar:
```bash
npx playwright test tests/specific-test.spec.ts
```

### What Can't Be Tool-Verified
These genuinely require user interaction:
- Native touch gestures on physical device
- Audio output quality
- Physical hardware interaction
- Real-time performance under production load
-->
