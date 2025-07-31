# CAG Project Backup Scripts - Setup Instructions

## Overview
These PowerShell scripts allow you to quickly save and restore checkpoints of the project. This is useful for:
- Creating backups before major changes
- Quickly reverting if something breaks
- Saving work-in-progress states

## Prerequisites
1. Windows with PowerShell
2. OneDrive installed and synced
3. Project cloned to your local machine

## Setup Steps

### 1. Update Script Paths
You'll need to modify both scripts to match your local paths:

#### In `backup-checkpoint.ps1`:
```powershell
# Change this line to match YOUR project location:
$source = "C:\Your\Path\To\cleared-advisory-group-website-local"

# Change this line to match YOUR OneDrive backup location:
$backupRoot = "C:\Users\YourUsername\OneDrive\Backup\31JUL25"
```

#### In `restore-checkpoint.ps1`:
```powershell
# Change this line to match YOUR OneDrive backup location:
$backupRoot = "C:\Users\YourUsername\OneDrive\Backup\31JUL25"

# Change this line to match YOUR project location:
$destination = "C:\Your\Path\To\cleared-advisory-group-website-local"
```

### 2. Create Backup Directory
Make sure your backup directory exists:
```powershell
mkdir "C:\Users\YourUsername\OneDrive\Backup\31JUL25"
```

### 3. Copy Scripts to Project
Copy both PowerShell scripts to your project root directory.

## Usage Instructions

### Creating a Backup
```powershell
# Navigate to project directory
cd "C:\Your\Path\To\cleared-advisory-group-website-local"

# Run backup script
powershell -ExecutionPolicy Bypass -File backup-checkpoint.ps1
```

The script will:
- Create a timestamped backup folder
- Copy entire project to OneDrive
- Display the checkpoint name (e.g., checkpoint_20250731_163838)

### Restoring from Backup
```powershell
# Navigate to project directory
cd "C:\Your\Path\To\cleared-advisory-group-website-local"

# Run restore script
powershell -ExecutionPolicy Bypass -File restore-checkpoint.ps1
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

## Important Notes

1. **Always commit your Git changes** before using restore
2. **Backups include node_modules** - this makes files large but ensures exact state
3. **OneDrive sync** - Allow time for OneDrive to sync large backups
4. **Disk space** - Each backup can be 500MB-1GB, monitor your space

## Troubleshooting

### "Script cannot be loaded" Error
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy RemoteSigned
```

### "Path not found" Error
- Verify all paths in the scripts match your system
- Ensure backup directory exists
- Check OneDrive is running and synced

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
powershell ./backup-checkpoint.ps1  # Extra safety backup
git push origin feature/authentication
```

---

For questions or issues, contact your team lead or check the project documentation.