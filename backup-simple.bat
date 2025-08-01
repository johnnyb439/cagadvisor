@echo off
echo Creating local backup...
set timestamp=%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%
set backupdir=backups\checkpoint_%timestamp%

echo Creating backup directory: %backupdir%
mkdir "%backupdir%" 2>nul

echo Copying files...
xcopy *.* "%backupdir%\" /Y >nul
xcopy app "%backupdir%\app\" /E /I /Y >nul
xcopy components "%backupdir%\components\" /E /I /Y >nul
xcopy hooks "%backupdir%\hooks\" /E /I /Y >nul
xcopy lib "%backupdir%\lib\" /E /I /Y >nul
xcopy public "%backupdir%\public\" /E /I /Y >nul
xcopy types "%backupdir%\types\" /E /I /Y >nul
xcopy utils "%backupdir%\utils\" /E /I /Y >nul
xcopy docs "%backupdir%\docs\" /E /I /Y >nul

echo Backup completed: %backupdir%