CAG PROJECT BACKUP SCRIPTS
=========================

This folder contains backup scripts for creating and restoring project checkpoints.

FILES INCLUDED:

FOR WINDOWS:
- backup-checkpoint.ps1 - Creates timestamped backups (PowerShell)
- restore-checkpoint.ps1 - Restores from most recent backup (PowerShell)
- SETUP_INSTRUCTIONS.md - Windows setup guide

FOR MAC:
- backup-checkpoint.sh - Creates timestamped backups (Shell script)
- restore-checkpoint.sh - Restores from most recent backup (Shell script)
- SETUP_INSTRUCTIONS_MAC.md - Mac setup guide

QUICK START:

WINDOWS:
1. Read SETUP_INSTRUCTIONS.md
2. Update paths in .ps1 files
3. Run with: powershell -ExecutionPolicy Bypass -File [script-name].ps1

MAC:
1. Read SETUP_INSTRUCTIONS_MAC.md
2. Update paths in .sh files
3. Make executable: chmod +x *.sh
4. Run with: ./[script-name].sh

IMPORTANT: You MUST update the paths in the scripts before using them!

PASSPHRASE FOR CLAUDE CODE:
When using Claude Code, you can use these magic phrases:
- "SAVE CHECKPOINT" - Claude will run the backup script
- "RESTORE CHECKPOINT" - Claude will run the restore script

These are the exact phrases to use - Claude is configured to recognize them.

For detailed instructions, see the appropriate SETUP_INSTRUCTIONS file for your OS.