# Interview — Conversational Questions Adapted to Mode

The heart of onboarding. This is a dialogue, not a form — ask questions,
listen to answers, follow up on what's interesting or unclear. The quality
of the context layer depends directly on the quality of this conversation.

When this file is absent or empty, the default behavior is: ask mode-
adapted questions as described below, 2-3 at a time, with follow-ups.
To explicitly skip the interview (e.g., when generating context from
existing documentation), write only `skip: true`.

## First-Run Questions

Start with the big picture and narrow based on answers. Never ask all
questions at once — this is a conversation, not an intake form.

**Round 1 — Identity:**
- Tell me about this project. What does it do, who is it for?
- What tech stack are you working with?
- Is this a solo project or a team? If a team, what's the collaboration
  model?

**Round 2 — Pain (adapt based on Round 1):**
- What pain points led you to setting up PIB?
- What breaks silently in this project? Things that fail without anyone
  noticing until it's too late.
- What do you wish Claude knew about this project from the very start of
  every session?

**Round 3 — Operations (adapt based on Rounds 1-2):**
- How do you currently track work? (Issues, backlog file, mental list, etc.)
- Is there a remote data store or deployment pipeline?
- What does a typical working session look like for you on this project?

**Follow-up instincts:**
- If someone mentions a pain point, ask *why* it happens and how often
- If someone describes their stack, ask what the tricky parts are
- If someone says "it's just me," ask how they keep context between sessions
- If someone mentions a team, ask about handoff friction

## Early Re-Run Questions

The session loop has been running. Shift from "what is this" to "what
have you learned."

**Round 1 — Session Loop Feedback:**
- What has the session loop taught you that the context files don't
  currently capture?
- Does orient give you what you need at session start? What's missing?
- Does debrief close the right loops? What falls through?

**Round 2 — Friction (adapt based on Round 1):**
- Where have you hit friction with the current setup?
- Are there things you keep having to tell Claude that should already be
  in the context?
- Any phase files that aren't pulling their weight?

**Round 3 — Growth (adapt based on Rounds 1-2):**
- Has the project changed since the initial onboard? New components,
  shifted priorities, different pain points?
- Are you ready for any of the modules you skipped last time?
- Anything you've been doing manually that should be automated?

## Mature Re-Run Questions

The system has been running long enough to accumulate both value and
cruft. This is a health check.

**Round 1 — Usage Reality:**
- Which PIB modules are you actually using regularly?
- Anything that felt useful at first but you've stopped relying on?
- Are there modules you adopted but never really configured properly?

**Round 2 — Gaps and Drift:**
- What gaps have you noticed in coverage? Things the system should catch
  but doesn't.
- Has the project's architecture or priorities shifted since the last
  onboard run? Does the context layer reflect the current reality?
- Any new pain points that weren't there before?

**Round 3 — Simplification:**
- Is anything ready to retire? Phase files, perspectives, health checks
  that check for problems you no longer have?
- Could any of your custom phase files be simplified now that you know
  what you actually need?
- Are there patterns in your memory/feedback that suggest a structural
  change rather than another rule?

## Conversation Guidelines

- **2-3 questions per round.** Let the user respond before asking more.
- **Follow up on substance.** If an answer reveals something important,
  dig into it before moving on to the next topic.
- **Note PIB module signals.** When someone describes a pain point that
  maps to a specific module, note it internally for the modularity menu
  phase — but don't interrupt the conversation to pitch the module.
- **Don't assume answers.** Even if you can see the project's files, ask
  about things like pain points and priorities that only the user knows.
- **Summarize before generating.** After the interview, reflect back what
  you heard: "Here's what I'm taking away from this conversation..." Let
  the user correct before generating files.
