# Generate Context — Create or Update Context Files

Transform interview answers into the files that make the rest of Claude on Rails
functional. This is where conversation becomes infrastructure — but it
is always a proposal, never an imposition.

When this file is absent or empty, the default behavior is: generate
or update files as described below, always showing the user what will
be created or changed before writing. To explicitly skip context
generation, write only `skip: true`.

## First-Run Generation

Create these files from interview answers:

### _context.md

Use `_context-template.md` (from `.claude/skills/perspectives/`) as the
structural starting point. Populate each section from what the interview
revealed:

- **What This Project Is** — from identity questions
- **Core Principles** — from pain points and priorities (what matters most?)
- **Architecture** — from tech stack discussion
- **Scan Scopes** — from architecture (where does code live, where is the DB?)
- **Work Tracking** — from how they currently track work
- **User Context** — from who works on the project

Don't leave sections blank with placeholder text. If the interview didn't
cover a section, either omit it with a comment noting it can be filled
later, or ask a targeted follow-up question. A `_context.md` full of
"TODO: fill in later" is worse than one with fewer sections that are
actually populated.

### CLAUDE.md Additions

If the project already has a CLAUDE.md, propose additions — don't
overwrite. If it doesn't, generate an initial one with:
- Project description (1 paragraph)
- Key files and directories
- Conventions and constraints from the interview
- Any "Claude should always/never" rules that emerged

### system-status.md

Create an initial state tracking file with:
- What's built (current state of the project)
- What's active (current focus areas)
- What's planned (near-term intentions from the interview)

Keep it concise. This file gets updated every debrief — it doesn't
need to be comprehensive on day one.

## Re-Run Updates

For existing files, never overwrite silently. The protocol:

1. Read the current file content
2. Identify what the interview suggests should change
3. Present proposed changes as clear before/after diffs
4. Let the user approve, modify, or reject each change
5. Apply approved changes

Common re-run updates:
- Adding scan scopes that were missing (user said "perspectives never
  check my tests directory")
- Updating architecture sections after a stack change
- Adding new core principles discovered through use
- Updating work tracking configuration after switching tools
- Removing stale information that no longer applies

## Update Project Registry

After generating the context layer, update `~/.claude/cor-registry.json`
with what you learned from the interview. The installer registers the
project with just its folder name and an empty description — onboard
is where the real name and description get filled in.

Find this project's entry by path and update:
- **`name`** — the project's actual name (from the interview, not the
  folder name, unless they match)
- **`description`** — one line about what the project does

This is a silent update — don't ask the user to confirm registry changes
separately. The information already came from the interview.

## Quality Standards

- **Populated, not padded.** Every section should contain real project
  information, not generic advice or placeholder text.
- **Specific paths, not patterns.** "Server code lives in `src/server/`"
  not "The server code directory."
- **Decisions, not descriptions.** "We use PostgreSQL because X" carries
  more context than "Database: PostgreSQL."
- **The user's voice.** Use language from the interview. If they called
  it "the deploy pipeline" don't write "CI/CD infrastructure."
