# Stop Hook Template

The Stop hook fires when a session is ending. It checks whether
substantive work was done without running the session-closing skill
(e.g., `/debrief`). If yes, it prompts to run it.

## How to Install

Add this to your `.claude/settings.json` under the `hooks` key:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Check if substantive work was done without running the session-closing skill. If yes, prompt to run it.",
            "statusMessage": "Checking session close compliance..."
          }
        ]
      }
    ]
  }
}
```

## How It Works

- **Event:** `Stop` — fires when the user ends the session
- **Type:** `prompt` — an LLM-evaluated check, not a deterministic script
- **Compliance:** ~80% — prompt-type hooks are advisory, not blocking

## Customization

Replace the prompt text with your project's specific closing skill name:

```
"Check if substantive work was done without /debrief. If yes, prompt to run it."
```

This is the single most important anti-entropy hook in the methodology.
Without it, sessions end without capturing what happened, and the next
session starts blind. The session loop (orient → work → debrief) is the
system's learning mechanism. This hook guards the debrief step.

## Limitations

This is a prompt-type hook, not a command hook. It asks the LLM to check
and prompt — it doesn't deterministically block the session from ending.
Compliance is imperfect. This is an honest example of the anti-entropy
principle in action: debrief compliance has been a recurring friction
point in the reference implementation, promoted to a hook. It's better
than without. It's not 100%.
