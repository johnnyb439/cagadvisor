# CAG Project Backup Scripts - Mac Setup Instructions

## Overview
These shell scripts allow you to quickly save and restore checkpoints of the project on macOS. This is useful for:
- Creating backups before major changes
- Quickly reverting if something breaks
- Saving work-in-progress states

## Prerequisites
1. macOS with Terminal access
2. OneDrive for Mac installed and synced
3. Project cloned to your local machine

## Setup Steps

### 1. Update Script Paths
You'll need to modify both scripts to match your local paths:

#### In `backup-checkpoint.sh`:
```bash
# Change this line to match YOUR project location:
source="/Users/YourUsername/Development/cleared-advisory-group-website-local"

# Change this line to match YOUR OneDrive backup location:
backupRoot="/Users/YourUsername/OneDrive/Backup/31JUL25"
```

#### In `restore-checkpoint.sh`:
```bash
# Change this line to match YOUR OneDrive backup location:
backupRoot="/Users/YourUsername/OneDrive/Backup/31JUL25"

# Change this line to match YOUR project location:
destination="/Users/YourUsername/Development/cleared-advisory-group-website-local"
```

### 2. Create Backup Directory
Open Terminal and create your backup directory:
```bash
mkdir -p ~/OneDrive/Backup/31JUL25
```

### 3. Copy Scripts to Project
1. Copy both shell scripts to your project root directory
2. Make them executable:
```bash
cd /path/to/cleared-advisory-group-website-local
chmod +x backup-checkpoint.sh
chmod +x restore-checkpoint.sh
```

## Usage Instructions

### Creating a Backup
```bash
# Navigate to project directory
cd /path/to/cleared-advisory-group-website-local

# Run backup script
./backup-checkpoint.sh
```

The script will:
- Create a timestamped backup folder
- Copy entire project to OneDrive
- Display the checkpoint name (e.g., checkpoint_20250731_163838)

### Restoring from Backup
```bash
# Navigate to project directory
cd /path/to/cleared-advisory-group-website-local

# Run restore script
./restore-checkpoint.sh
```

The script will:
- Find the most recent checkpoint
- Create a safety backup of current state
- Restore the selected checkpoint
- Remind you to run `npm install`

## Command Shortcuts with Claude

When working with Claude Code, you can use these shortcuts:
- Type "SAVE CHECKPOINT" - Claude will run the backup script
- Type "RESTORE CHECKPOINT" - Claude will run the restore script

## Mac-Specific Configuration

### If Scripts Don't Run
If you get a "permission denied" error:
```bash
chmod +x backup-checkpoint.sh restore-checkpoint.sh
```

### OneDrive Path on Mac
OneDrive on Mac typically syncs to:
- Personal: `/Users/YourUsername/OneDrive`
- Business: `/Users/YourUsername/OneDrive - CompanyName`

Find your OneDrive path:
```bash
ls ~/OneDrive*
```

### Terminal Aliases (Optional)
Add to your `~/.zshrc` or `~/.bash_profile`:
```bash
alias checkpoint='./backup-checkpoint.sh'
alias restore='./restore-checkpoint.sh'
```

Then you can just type `checkpoint` or `restore` in your project directory.

## Important Notes

1. **Always commit your Git changes** before using restore
2. **Backups include node_modules** - this makes files large but ensures exact state
3. **OneDrive sync** - Allow time for OneDrive to sync large backups
4. **Disk space** - Each backup can be 500MB-1GB, monitor your space

## Troubleshooting

### "Permission denied" Error
```bash
chmod +x backup-checkpoint.sh restore-checkpoint.sh
```

### "No such file or directory" Error
- Verify all paths in the scripts match your system
- Use `pwd` to check your current directory
- Use `ls` to verify paths exist

### OneDrive Not Syncing
- Check OneDrive is running (look for icon in menu bar)
- Ensure you're signed in
- Check OneDrive preferences for sync settings

### Restore Shows "No checkpoints found"
- Check the $backupRoot path is correct
- Ensure at least one backup has been created
- Verify OneDrive has synced the backup folders

## Best Practices

1. **Before Major Changes**: Always create a checkpoint
2. **End of Day**: Create a checkpoint before closing
3. **After Successful Features**: Checkpoint working states
4. **Before Experiments**: Checkpoint stable versions
5. **Regular Cleanup**: Delete old checkpoints to save space

## Integration with Git Workflow

```bash
# Good practice workflow:
git add .
git commit -m "feat: completed authentication"
./backup-checkpoint.sh  # Extra safety backup
git push origin feature/authentication
```

## Converting from Windows Scripts

If you have existing Windows PowerShell scripts, here's the conversion:
- `.ps1` → `.sh`
- `$variable` → `$variable` (same syntax)
- `Write-Host` → `echo`
- Paths: `C:\Users\...` → `/Users/...`
- Path separators: `\` → `/`

---

For questions or issues, contact your team lead or check the project documentation.