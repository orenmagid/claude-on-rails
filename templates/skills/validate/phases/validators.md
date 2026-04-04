# Validators

Define your project-specific validation checks here. Each validator is
a named check with a command to run. The /validate skill reads this file
and executes each check in sequence.

## Format

For each validator, provide:
- **Name** — short label for the summary table
- **Command** — shell command that returns exit 0 on success, non-zero on failure
- **What it catches** — brief description of what this validator detects

## Example Validators

Uncomment and adapt these for your project:

<!--
### Type Check
```bash
cd your-app-dir && npx tsc --noEmit
```
Catches type errors before they reach production.

### Lint
```bash
cd your-app-dir && npx eslint src/
```
Catches style violations and common code quality issues.

### Production Build
```bash
cd your-app-dir && npx vite build
```
Catches what the type checker misses: bare catch blocks, runtime-only
errors, bundle resolution failures. A type check pass + build fail =
broken deploy.

### Structural Validation
```bash
./scripts/validate-structure.sh
```
Project-specific structural checks (e.g., required files exist, cross-references
are valid, configuration is consistent). Write these scripts for your
project's invariants.

### Memory/Docs Validation
```bash
./scripts/validate-docs.sh
```
Checks that documentation references (memory index, CLAUDE.md links) point
to files that actually exist.
-->
