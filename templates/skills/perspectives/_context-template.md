# Perspective Context — [Your Project Name]

This file provides shared context that all perspectives read. It is the
primary injection point for project-specific knowledge into the generic
perspective system. Every perspective references this file.

**To adopt the perspective system:** Copy this template, fill in the
sections below with your project's specifics, and save as `_context.md`
in your `.claude/skills/perspectives/` directory.

---

## What This Project Is

*One paragraph: what the project does, who it's for, what technology
stack it uses.*

## Core Principles

*3-5 principles that guide design decisions. These help perspectives
calibrate their findings — a finding that violates a principle is more
significant than one that doesn't.*

## Architecture

*How the system is structured. Layers, data stores, deployment target,
key files. Perspectives use this to know where to look.*

## Perspective Cabinet

*Which perspectives are active in this project. Note any project-specific
perspectives you've built beyond the generic set.*

### Lane Rules

Each perspective stays in its domain lane. When a perspective notices
something outside its lane, it flags it for the relevant perspective
rather than developing the observation itself. The one exception is
anti-confirmation, which intentionally crosses lanes because its domain
(reasoning quality) touches everything.

### How Perspectives Are Invoked

*How your project invokes perspectives — during planning, execution,
audit, or other checkpoints. Reference the composition patterns in
`_composition-patterns.md` for the orchestration patterns.*

## User Context

*Who uses this system (name, role, relevant background). This replaces
hardcoded user references in perspectives.*

*What life domains the system manages, if applicable (e.g., health,
finances, hobbies, relationships). Only relevant for perspectives like
life-tracker and life-optimization that analyze whole-life patterns.*

## Scan Scopes

*Perspectives reference these sections by name to know where to look.
Fill in the ones relevant to the perspectives you adopt.*

### App Source
*Where the frontend/UI code lives (for accessibility, usability perspectives).*
*Example: `src/components/**/*.tsx`, `src/pages/**/*.tsx`*

### API / Server
*Where the backend/API code lives (for security, data-integrity perspectives).*
*Example: `server.js`, `routes/*.js`*

### Data Store
*Database type and location (for data-integrity, life-optimization perspectives).*
*Example: SQLite at `./data/app.db`, or PostgreSQL at `$DATABASE_URL`*

### Audit Infrastructure
*Where audit scripts, finding schemas, and triage data live (for meta-process).*
*Example: `scripts/audit/`, `reviews/*/triage.json`*

### Deployment
*Platform and config files (for security, process perspectives).*
*Example: Railway + Dockerfile, Vercel + vercel.json, Fly.io + fly.toml*

### Validation Scripts
*Paths to structural validation scripts (for process, documentation perspectives).*
*Example: `scripts/validate-*.sh`*

### Documentation Files
*Where CLAUDE.md files, memory, and system status live (for documentation perspective).*
*Example: `CLAUDE.md` (root), `**/CLAUDE.md` (nested), `system-status.md`*

## API Configuration

*For perspectives that make API calls (life-tracker, life-optimization).
Skip this section if your system doesn't have an API.*

### Task Management API
*Base URL, auth mechanism, auth env var name.*
*Example: `https://my-app.up.railway.app/api`, header `x-api-secret`, `$API_SECRET`*

### Calendar API
*How to access calendar events, if applicable.*
*Example: `GET /api/calendar/events?start=...&end=...`*

## Entity Types

*What structured entities your system manages. Perspectives like
data-integrity and life-optimization need to know what exists and
where it lives.*

*Example:*
*- actions (DB) — tasks with status, due dates, areas*
*- projects (DB) — bounded deliverables containing actions*
*- areas (filesystem) — ongoing responsibilities, one directory each*
*- people (DB) — contacts with linked actions and context*

## Work Tracking

*How your project tracks planned work. The /plan skill needs this to
check for overlap; /execute needs this to load plans and mark them done;
/orient needs this to scan open work; /debrief needs this to close items.*

### Work Item Storage
*Where work items live (DB table, markdown files, GitHub Issues, Linear, etc.).*
*Example: SQLite `tasks` table, or `backlog.md`, or GitHub Issues*

### Query Interface
*How to search open items — the command, API call, or query.*
*Example: `sqlite3 project.db "SELECT * FROM tasks WHERE status != 'done'"`*
*Example: `gh issue list --state open --json number,title`*

### Mutation Interface
*How to create, update, and close items.*
*Example: `POST /api/tasks` with JSON body, `PATCH /api/tasks/:id`*
*Example: `gh issue create --title "..." --body "..."`*

## Codebase Layout

*Key directories and files that perspectives should know about. What
lives where. Which files are the most important to read.*

## Finding Format

When producing audit findings, use this structure:

```yaml
finding:
  perspective: perspective-name
  severity: critical | significant | minor | informational
  category: what domain this falls under
  description: what was found
  evidence: specific file:line or observation
  recommendation: what to do about it
```
