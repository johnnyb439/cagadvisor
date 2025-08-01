# Secure Backup Script Instructions

## Overview
This PowerShell script creates secure backups of the CAG website project with passphrase protection.

## Features
- **Passphrase Protection**: Requires correct passphrase to run
- **Dual Backup**: Backs up to both OneDrive and local directory
- **Smart Rotation**:
  - OneDrive: Deletes every third backup to save space
  - Local: Deletes all previous backups (keeps only latest)
- **GitHub Integration**: Optional force push to replace entire repository

## Default Passphrase
```
BACKUPNOW
```
⚠️ **IMPORTANT**: Change this passphrase in the script before using in production!

## Usage

### 1. Test Mode (Recommended First)
```powershell
.\test-backup.ps1
```
This runs the script in test mode - shows what would happen without making changes.

### 2. Run Actual Backup
```powershell
.\secure-backup.ps1
```
Enter the passphrase when prompted.

### 3. Backup Locations
- **OneDrive**: `C:\Users\JohnnyBeast\OneDrive - Miysis Alliance\Backup\1AUG25`
- **Local**: `C:\0_1_A_Dev\Backup`

## GitHub Push
When running the script, you'll be asked if you want to push to GitHub.
- Repository: https://github.com/johnnyb439/cagadvisor
- Type `YES_REPLACE_GITHUB` to confirm
- This will FORCE PUSH and replace EVERYTHING in the repository

## Backup Naming
Backups are named with timestamp: `cag_backup_YYYYMMDD_HHMMSS`

## What's Excluded
- node_modules/
- .next/
- .git/
- *.log files

## Security Notes
1. The passphrase is stored in plain text in the script - use environment variables for production
2. The script uses secure string handling for the passphrase input
3. Force push to GitHub is destructive - use with caution

## Troubleshooting
- If the script fails, check you have write permissions to backup directories
- Ensure Git is installed and configured for GitHub pushes
- Run PowerShell as Administrator if you encounter permission issues