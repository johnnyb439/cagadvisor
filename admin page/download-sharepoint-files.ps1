# SharePoint File Download Script
# IMPORTANT: Update credentials before running

$siteUrl = "https://miysisalliance-my.sharepoint.com"
$username = "YOUR_EMAIL@miysisalliance.com"  # UPDATE THIS
$password = "YOUR_PASSWORD"  # UPDATE THIS
$sourcePath = "/personal/developer_miysisalliance_com/Documents/Johnnys folder/AdminPage/adminpageedit"
$localPath = "."  # Current directory (admin page folder)

# Create credentials
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$credentials = New-Object System.Management.Automation.PSCredential($username, $securePassword)

# Connect to SharePoint
Connect-PnPOnline -Url $siteUrl -Credentials $credentials

# Get all files from the folder
$files = Get-PnPFolderItem -FolderSiteRelativeUrl $sourcePath -ItemType File

Write-Host "Found $($files.Count) files to download"

# Download each file
foreach ($file in $files) {
    $fileName = $file.Name
    $serverRelativeUrl = $file.ServerRelativeUrl
    
    Write-Host "Downloading: $fileName"
    Get-PnPFile -Url $serverRelativeUrl -Path $localPath -FileName $fileName -AsFile
}

# Get all subfolders
$folders = Get-PnPFolderItem -FolderSiteRelativeUrl $sourcePath -ItemType Folder

foreach ($folder in $folders) {
    $folderName = $folder.Name
    $folderPath = Join-Path $localPath $folderName
    
    # Create local folder
    New-Item -ItemType Directory -Path $folderPath -Force
    
    # Download files from subfolder
    $subFiles = Get-PnPFolderItem -FolderSiteRelativeUrl "$sourcePath/$folderName" -ItemType File
    
    foreach ($subFile in $subFiles) {
        $fileName = $subFile.Name
        $serverRelativeUrl = $subFile.ServerRelativeUrl
        
        Write-Host "Downloading: $folderName/$fileName"
        Get-PnPFile -Url $serverRelativeUrl -Path $folderPath -FileName $fileName -AsFile
    }
}

Write-Host "Download complete!"
Write-Host "Files saved to: $localPath"

# List downloaded files
Get-ChildItem -Path $localPath -Recurse | Format-Table Name, Length, LastWriteTime