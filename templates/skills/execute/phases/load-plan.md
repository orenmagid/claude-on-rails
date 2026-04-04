# Load Plan — Where Plans Live and How to Read Them

Define where your project stores plans and how to read them. The /execute
skill reads this file to find and load the plan before implementing.

When this file is absent or empty, the default behavior is: expect the
plan to be provided in conversation or referenced by the user. To
explicitly skip plan loading (plan is always provided inline), write
only `skip: true`.

## What to Include

- **Where plans live** — database, markdown files, issue tracker, etc.
- **How to query** — the command or API to fetch a specific plan
- **What to extract** — implementation steps, surface area, acceptance
  criteria, plan type (code vs. walkthrough)

## Example Load-Plan Configurations

Uncomment and adapt these for your project:

<!--
### Database API
```bash
# Fetch plan from action notes
curl -s https://your-app.example.com/api/tasks/TASK_ID \
  -H "Authorization: Bearer $API_TOKEN" | jq '.notes'
```
Parse the notes for: ## Implementation, ## Surface Area, ## Acceptance Criteria

### Local Database
```bash
sqlite3 project.db "SELECT notes FROM tasks WHERE id = 'TASK_ID'"
```

### GitHub Issue
```bash
gh issue view ISSUE_NUMBER --json body | jq -r '.body'
```

### Markdown File
```bash
Read docs/plans/YYYY-MM-DD-plan-title.md
```

### Plan Identification
When the user says "execute the plan," look up the most recent active
plan item. When ambiguous, list open plan items and ask which one.
-->
