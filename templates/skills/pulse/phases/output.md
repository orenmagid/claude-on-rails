# Output — How to Present Results

Define how pulse presents its findings. The /pulse skill reads this
file to determine output format and destination.

When this file is absent or empty, the default behavior is:
- **Embedded mode:** silent when healthy, brief flags when not
- **Standalone mode:** stratified report (Fixed / Options / Questions)
To explicitly skip output, write only `skip: true`.

## What to Include

Define your output strategy:
- **Embedded format** — how to report within orient/debrief output
- **Standalone format** — how to present the full report
- **Destination** — conversation only, or also written to a file/log

## Example Output Configuration

Uncomment and adapt for your project:

<!--
### Embedded Mode
When running inside orient or debrief:
- Silent when all checks pass
- One-line per discrepancy: "Pulse: [what] says X, found Y"
- Include auto-fixes already applied: "Pulse: updated skill count 12→14"

### Standalone Mode
When running as /pulse:

#### Fixed (auto-corrected)
List each discrepancy that was auto-fixed:
- What was wrong
- What it was changed to
- Where (file and line)

#### Options (needs human judgment)
List each discrepancy that requires a decision:
- What the documentation says
- What was actually found
- Why this can't be auto-fixed (ambiguous correction)

#### Questions (uncertain)
List anything that couldn't be verified:
- What was checked
- Why verification failed
- Suggested next step

### Log File
In addition to conversation output, append results to
`sync/pulse-log.txt` for trend tracking. One line per check:
`YYYY-MM-DD HH:MM:SS | check-name | pass/fail | details`
-->
