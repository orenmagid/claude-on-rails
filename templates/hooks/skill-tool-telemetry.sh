#!/bin/bash
# PostToolUse hook for Skill tool telemetry
# Captures programmatic Skill invocations (not user-typed /slash-commands)
# Complements skill-telemetry.sh (UserPromptSubmit) for full coverage
#
# Configuration (environment variables with defaults):
#   TELEMETRY_FILE — where to write JSONL records
#   DEBUG_LOG      — where to write debug output

TELEMETRY_DIR="${TELEMETRY_DIR:-${HOME}/.claude/telemetry}"
TELEMETRY_FILE="${TELEMETRY_FILE:-${TELEMETRY_DIR}/telemetry.jsonl}"
DEBUG_LOG="${DEBUG_LOG:-${TELEMETRY_DIR}/hook-debug.log}"

# Ensure telemetry directory exists
mkdir -p "$(dirname "$TELEMETRY_FILE")"
mkdir -p "$(dirname "$DEBUG_LOG")"

# Read hook input from stdin
INPUT=$(cat)

# Extract skill name and session_id from the tool input
eval "$(echo "$INPUT" | python3 -c "
import sys, json, shlex
try:
    data = json.load(sys.stdin)
    tool_input = data.get('tool_input', {})
    if isinstance(tool_input, str):
        tool_input = json.loads(tool_input)
    skill = tool_input.get('skill', '')
    session_id = data.get('session_id', 'unknown')
    print(f'SKILL={shlex.quote(skill)}')
    print(f'SESSION_ID={shlex.quote(session_id)}')
except:
    print('SKILL=\"\"')
    print('SESSION_ID=\"unknown\"')
" 2>/dev/null)"

if [[ -n "$SKILL" ]]; then
    TIMESTAMP=$(date -u '+%Y-%m-%dT%H:%M:%SZ')
    python3 -c "
import json
record = {
    'ts': '$TIMESTAMP',
    'event': 'skill-invoke',
    'skill': '$SKILL',
    'source': 'tool',
    'session_id': '$SESSION_ID'
}
print(json.dumps(record))
" >> "$TELEMETRY_FILE"
    echo "--- skill-tool-telemetry $TIMESTAMP skill=$SKILL ---" >> "$DEBUG_LOG"
fi

exit 0
