# Validators — What Validation to Run

Define what validation to run after implementation and before commit.
The /execute skill reads this file at Step 6. This may reference or
duplicate your project's /validate skill phases — that's fine, the
execute skeleton needs to know what to run inline.

When this file is absent or empty, the default behavior is: run the
project's /validate skill if it exists. If no validate skill exists,
run the project's type checker and linter at minimum. To explicitly
skip validation, write only `skip: true`.

## What to Include

- **Type checking** — command to verify types
- **Linting** — command to check style and correctness
- **Build** — command to verify the project builds
- **Structural validation** — project-specific integrity checks
- **Pass criteria** — what "passing" means (zero errors? warnings OK?)

## Example Validator Configurations

Uncomment and adapt these for your project:

<!--
### TypeScript Project
```bash
npx tsc -b --noEmit        # Type checking — must exit 0
npx eslint . --max-warnings 0  # Linting — zero warnings
npm run build               # Build — must succeed
```

### Python Project
```bash
mypy src/                   # Type checking
ruff check src/             # Linting
python -m pytest --co -q    # Verify tests collect (don't run full suite)
```

### Structural Validation
```bash
./scripts/validate-fids.sh          # Entity ID coverage
./scripts/validate-threads.sh       # Thread structure integrity
./scripts/validate-schema.sh        # Schema consistency
```

### Pass Criteria
All commands must exit 0. Warnings are acceptable for linting only if
they existed before this session's changes (don't introduce new ones).
-->
