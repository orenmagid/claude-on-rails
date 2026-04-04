# Completeness Check — Domain-Specific Completeness Rules

Define additional completeness rules beyond the three generic checks
(feature completeness, surface area completeness, testable AC). The
/plan skill reads this file and applies these rules alongside the
generic checks.

When this file is absent or empty, the default behavior is: apply only
the three generic completeness checks defined in the skeleton. To
explicitly skip completeness checking, write only `skip: true`.

## What to Include

Domain-specific rules that catch incomplete plans in your project:
- **Required artifacts** — what every plan of a certain type must include
- **Coupling rules** — "if you change X, you must also change Y"
- **Category-specific requirements** — different plan types have different
  completeness criteria

## Example Completeness Rules

Uncomment and adapt these for your project:

<!--
### API Changes
- Every new endpoint must include auth middleware in the surface area
- Every schema change must include a migration script
- Every API change must include at least one [auto] AC that exercises it

### UI Changes
- Every new page must include mobile viewport AC ([manual] at 375px)
- Every new component must include empty state handling
- If adding a page, App.tsx routing must be in the surface area

### Infrastructure Changes
- Cost estimate required for new services or storage
- Rollback plan required for data migrations
- Monitoring/alerting changes must accompany new infrastructure

### Coupling Rules
- Changes to the DB schema require corresponding API endpoint updates
- Changes to API response format require corresponding frontend updates
- Changes to shared types require checking all consumers
-->
