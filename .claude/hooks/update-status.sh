#!/bin/bash
# update-status.sh — PostToolUse hook for Claude Code
# Fires after Bash commands. If the command was a git commit,
# regenerates ## Current Status in CLAUDE.md with live repo data.
#
# Copy this script to each project's .claude/hooks/update-status.sh
# and add the PostToolUse hook config to .claude/settings.json

set -euo pipefail

# Read hook input from stdin
INPUT=$(cat)

# Extract the command that was run
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)

# Only proceed if the command was a git commit
if ! echo "$COMMAND" | grep -q 'git commit'; then
  exit 0
fi

# Find repo root
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
CLAUDE_MD="$REPO_ROOT/CLAUDE.md"

# If no CLAUDE.md, nothing to update
if [ ! -f "$CLAUDE_MD" ]; then
  exit 0
fi

# Gather live data
DATE=$(date +%Y-%m-%d)

# Recent commits (last 5)
COMMITS=""
while IFS= read -r line; do
  COMMITS="${COMMITS}- \`${line}\`
"
done < <(git log --oneline --format="%h %s (%ad)" --date=short -5 2>/dev/null)

# TODO.md progress (if exists)
TODO_LINE=""
if [ -f "$REPO_ROOT/TODO.md" ]; then
  DONE=$(grep -c '\- \[x\]' "$REPO_ROOT/TODO.md" 2>/dev/null || echo 0)
  TOTAL=$(grep -c '\- \[.\]' "$REPO_ROOT/TODO.md" 2>/dev/null || echo 0)
  if [ "$TOTAL" -gt 0 ]; then
    PCT=$(( DONE * 100 / TOTAL ))
    TODO_LINE="**TODO Progress:** ${DONE}/${TOTAL} complete (${PCT}%)"
  fi
fi

# Uncommitted changes
DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
if [ "$DIRTY" -eq 0 ]; then
  UNCOMMITTED="none"
else
  UNCOMMITTED="${DIRTY} files"
fi

# Build the new status section
STATUS_BLOCK="## Current Status
<!-- Auto-updated by .claude/hooks/update-status.sh on commit -->

**Last Updated:** ${DATE}
**Recent Commits:**
${COMMITS}
${TODO_LINE:+${TODO_LINE}
}**Uncommitted Changes:** ${UNCOMMITTED}"

# Replace the existing ## Current Status section in CLAUDE.md
# Strategy: replace everything between "## Current Status" and the next "## " heading
if grep -q '^## Current Status' "$CLAUDE_MD"; then
  # Use awk to replace the section
  awk -v new_block="$STATUS_BLOCK" '
    /^## Current Status/ { printing=0; print new_block; found=1; next }
    /^## / && found && !printing { printing=1 }
    !found || printing { print }
  ' "$CLAUDE_MD" > "${CLAUDE_MD}.tmp"
  mv "${CLAUDE_MD}.tmp" "$CLAUDE_MD"
else
  # Append the section before ## Project Notes or at the end
  if grep -q '^## Project Notes' "$CLAUDE_MD"; then
    awk -v new_block="$STATUS_BLOCK" '
      /^## Project Notes/ { print new_block; print ""; }
      { print }
    ' "$CLAUDE_MD" > "${CLAUDE_MD}.tmp"
    mv "${CLAUDE_MD}.tmp" "$CLAUDE_MD"
  else
    printf '\n%s\n' "$STATUS_BLOCK" >> "$CLAUDE_MD"
  fi
fi
