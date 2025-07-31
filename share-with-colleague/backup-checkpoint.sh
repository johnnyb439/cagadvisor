#!/bin/bash
# Backup Checkpoint Script for Mac
# Usage: Just type "SAVE CHECKPOINT" and I'll run this script

timestamp=$(date +"%Y%m%d_%H%M%S")
source="/Users/YourUsername/Development/cleared-advisory-group-website-local"
backupRoot="/Users/YourUsername/OneDrive/Backup/31JUL25"
destination="$backupRoot/checkpoint_$timestamp"

echo -e "\033[32mCreating backup checkpoint at: $destination\033[0m"
cp -R "$source" "$destination"
echo -e "\033[32mBackup completed successfully!\033[0m"
echo -e "\033[36mCheckpoint saved as: checkpoint_$timestamp\033[0m"