#!/bin/bash
# Restore Checkpoint Script for Mac
# Usage: Just type "RESTORE CHECKPOINT" and I'll run this script

backupRoot="/Users/YourUsername/OneDrive/Backup/31JUL25"
destination="/Users/YourUsername/Development/cleared-advisory-group-website-local"

# Get the most recent checkpoint
latestCheckpoint=$(ls -d "$backupRoot"/checkpoint_* 2>/dev/null | sort -r | head -n 1)

if [ -n "$latestCheckpoint" ]; then
    checkpointName=$(basename "$latestCheckpoint")
    
    echo -e "\033[36mFound latest checkpoint: $checkpointName\033[0m"
    echo -e "\033[33mRestoring from: $latestCheckpoint\033[0m"
    
    # Create a backup of current state before restoring
    preRestoreBackup="$backupRoot/pre_restore_$(date +"%Y%m%d_%H%M%S")"
    echo -e "\033[90mCreating safety backup of current state...\033[0m"
    cp -R "$destination" "$preRestoreBackup"
    
    # Restore the checkpoint
    echo -e "\033[32mRestoring checkpoint...\033[0m"
    cp -R "$latestCheckpoint/"* "$destination/"
    
    echo -e "\033[32mRestore completed successfully!\033[0m"
    echo -e "\033[90mPrevious state backed up to: pre_restore_*\033[0m"
    echo ""
    echo -e "\033[36mNext steps:\033[0m"
    echo -e "\033[37m1. Run 'npm install' to update dependencies\033[0m"
    echo -e "\033[37m2. Run 'npm run dev' to start the development server\033[0m"
else
    echo -e "\033[31mNo checkpoints found in $backupRoot\033[0m"
fi