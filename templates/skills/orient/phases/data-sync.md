# Data Sync — How to Pull Fresh Canonical Data

Define how to sync data from remote canonical sources so the local
environment has current information. The /orient skill reads this file
and runs each sync step before scanning work items.

When this file is absent or empty, this step is skipped — purely local
projects don't need it. (`skip: true` is equivalent to absent here.)

## What to Include

For each sync source, provide:
- **Source** — where the canonical data lives
- **Command** — how to pull it locally
- **Failure handling** — what to do if sync fails (use stale data? report?)

## Example Sync Sources

Uncomment and adapt these for your project:

<!--
### Database Sync
```bash
./scripts/sync-db.sh --pull
```
Pulls the production database to a local cache. If this fails, note
staleness and continue — stale data is better than no data.

### API State Refresh
```bash
curl -s https://your-api.example.com/api/status > .cache/api-status.json
```
Fetches current state from a remote API. Cache locally so subsequent
queries during the session don't require network calls.
-->
