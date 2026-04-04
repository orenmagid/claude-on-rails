# Build Perspective — Collaborative Expertise Construction

For each new technology without a matching perspective, run a collaborative
conversation with the user to build project-specific expertise. The /seed
skill reads this file when there are gaps to fill.

When this file is absent or empty, the default behavior is: co-author
a perspective through structured conversation following the template
below. To explicitly skip building, write only `skip: true`.

## What to Include

Define your building strategy:
- **Research steps** — how to gather information about the technology
  before asking the user
- **Conversation structure** — what questions to ask, in what order
- **Output format** — where to create the perspective file, what template
  to follow
- **Wiring** — how to register the perspective in groups and make it
  discoverable

## Default Build Process

For each gap the user wants to fill:

### Step 1: Research

Before asking the user anything, gather what you can:
- Read the technology's documentation (use available MCP tools, web search)
- Check how it's configured in this specific project (read config files,
  look at usage patterns in the codebase)
- Identify common pitfalls and best practices for the technology
- Note what version is in use and any version-specific concerns

This research gives you informed questions to ask rather than generic ones.

### Step 2: Collaborative Conversation

Walk through these areas with the user:

**Identity.** "Who is this expert? What do they care about most?"
- Draft a one-paragraph identity statement based on your research
- Ask the user what's missing or wrong about it
- Refine until it captures the right concerns for this project

**Research Method.** "What should this perspective examine?"
- Propose a scan scope based on where the technology's files live
- Propose specific things to check (patterns, anti-patterns, config)
- Ask: "What has bitten you before with this technology?"
- Ask: "What do you worry about that you don't currently check?"

**Boundaries.** "What does this perspective NOT own?"
- Propose lane boundaries to prevent overlap with existing perspectives
- Ask: "Is there anything here that another perspective already covers?"

**Calibration.** "What does a good finding look like?"
- Draft 2-3 example findings at different severities
- Ask the user to adjust the severity anchoring to their project's
  actual risk profile

### Step 3: Create the Perspective

Write the perspective's `SKILL.md` following `_lifecycle.md` guidance:
- Place in `.claude/skills/perspectives/{name}/SKILL.md`
- Include all sections: Identity, Activation Signals, Research Method,
  Boundaries, Calibration Examples
- Set `user-invocable: false` in frontmatter (perspectives are invoked
  by the audit system, not directly)

### Step 4: Wire It Up

- Add to `_groups.yaml` under the appropriate group (unless it's
  cross-cutting, in which case it activates via `always-on-for` signals)
- Verify the perspective is discoverable by the audit skill

### Emphasis

This is co-authoring, not auto-generating. A generic perspective based
solely on technology documentation catches generic issues. A perspective
built with user input — their specific risks, their past incidents,
their project's actual patterns — catches what actually matters.

The user's time in this conversation is an investment. It pays off in
every subsequent audit cycle when the perspective catches something
specific to their project that a generic check would miss.

## Overriding This Phase

Projects override this file when they have a different conversation
structure, additional template requirements, or non-standard perspective
registration. For example, a project that requires cost-benefit analysis
before adopting a perspective, or one that requires approval from
multiple stakeholders.
