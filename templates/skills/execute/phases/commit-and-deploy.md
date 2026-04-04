# Commit and Deploy — How to Persist and Deploy Changes

Define how your project persists work (commit strategy) and deploys
changes (if applicable). The /execute skill reads this file at Step 6
after validation passes.

When this file is absent or empty, the default behavior is: commit with
a clear message describing the implementation. Don't push or deploy —
deployment strategy is project-specific. To explicitly skip commit
(e.g., changes are committed manually), write only `skip: true`.

## What to Include

- **Commit strategy** — message format, what to stage, branch conventions
- **Push rules** — when to push, to which remote
- **Deployment** — how to deploy, whether deploy is automatic or manual
- **Post-deploy verification** — how to confirm deployment succeeded

## Example Commit-and-Deploy Configurations

Uncomment and adapt these for your project:

<!--
### Standard Git Workflow
```bash
# Stage specific files (never git add -A)
git add path/to/changed/files

# Commit with descriptive message
git commit -m "feat: description of what was implemented

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to remote
git push origin current-branch
```

### Deployment (auto-deploy on push)
If your platform auto-deploys on push (Railway, Vercel, Netlify):
- Push triggers deployment automatically
- Run /verify-deploy or equivalent to confirm
- Wait for deployment to complete before marking work done

### Deployment (manual)
```bash
# Build and deploy
npm run build
railway up  # or: vercel deploy, fly deploy, etc.
```

### Deployment (split: code vs. content)
Some projects deploy code and content differently:
- **Code changes** → full deploy (rebuild required)
- **Content/markdown changes** → git push triggers a pull on the server
  (no rebuild, instant update)

Determine which type of change was made and use the appropriate path.

### Post-Deploy Verification
```bash
# Check deployment health
curl -s https://your-app.example.com/health | jq .
# Verify the specific change is live
curl -s https://your-app.example.com/api/version
```
-->
