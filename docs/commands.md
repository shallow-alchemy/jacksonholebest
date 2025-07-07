# Useful Claude Code Commands

## Generate Project Context Summary
```bash
claude-code generate context-summary \
  --output ".claude/claude-context.md" \
  --overwrite \
  --include "project-state,key-decisions,file-structure,pending-tasks,important-context"