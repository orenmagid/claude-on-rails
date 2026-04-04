# Loose Ends — Non-Project Items to Capture

Define how to sweep for non-project items and environmental concerns
before closing the session. Sessions generate work that isn't part of
the main project — manual tasks, purchases, emails, configuration
changes, appointments. If these aren't captured, they rely on human
memory, which violates the anti-entropy principle.

When this file is absent or empty, this step is skipped. (`skip: true`
is equivalent to absent here.)

## What to Include

- **What to scan for** — categories of non-project items
- **Where to route them** — inbox, task tracker, notes, specific lists
- **How to capture** — API calls, file edits, commands

## Example Loose Ends Patterns

Uncomment and adapt these for your project:

<!--
### Non-Project Tasks
Scan the session for anything that came up which isn't a project task
but should be tracked:
- Manual steps the user needs to take outside the terminal
- Purchases or orders to place
- Emails or messages to send
- License acceptances or account actions
- Appointments or scheduling tasks

Route each to its proper home — don't dump everything in a generic
inbox if you know the category. An item that's already classified
should go directly to the right place.

### Environment Changes
If the session changed anything that lives outside of git:
- New background processes or services started
- System permissions granted
- New tools or dependencies installed globally
- Environment variables added or changed
- Configuration files outside the project directory

Record these in a setup or environment file so the configuration can
be reproduced. An environment change that isn't documented is a change
that gets lost on the next machine.

### If Nothing Surfaced
This is the most common outcome. If no non-project items came up during
the session, skip this phase silently — don't report "no loose ends
found."
-->
