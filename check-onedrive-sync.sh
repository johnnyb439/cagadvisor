#!/bin/bash

# OneDrive sync checker script
ONEDRIVE_PATH="/Users/tone/Library/CloudStorage/OneDrive-MiysisAlliance/Johnnys folder/AdminPage"

echo "Monitoring OneDrive sync status..."
echo "Checking: $ONEDRIVE_PATH"
echo "========================================="

while true; do
    # Count files in each admin folder
    EDIT_COUNT=$(find "$ONEDRIVE_PATH/adminpageedit" -type f -name "*.tsx" -o -name "*.ts" -o -name "*.json" 2>/dev/null | wc -l)
    ORIGINAL_COUNT=$(find "$ONEDRIVE_PATH/adminpageoriginal" -type f -name "*.tsx" -o -name "*.ts" -o -name "*.json" 2>/dev/null | wc -l)
    DONTTOUCH_COUNT=$(find "$ONEDRIVE_PATH/adminpagedonttouch" -type f -name "*.tsx" -o -name "*.ts" -o -name "*.json" 2>/dev/null | wc -l)
    
    TOTAL_COUNT=$((EDIT_COUNT + ORIGINAL_COUNT + DONTTOUCH_COUNT))
    
    echo -ne "\r$(date '+%H:%M:%S') - Files found: adminpageedit($EDIT_COUNT) adminpageoriginal($ORIGINAL_COUNT) adminpagedonttouch($DONTTOUCH_COUNT) Total: $TOTAL_COUNT"
    
    if [ $TOTAL_COUNT -gt 0 ]; then
        echo ""
        echo ""
        echo "✅ FILES SYNCED! Found $TOTAL_COUNT files"
        echo "========================================="
        echo "adminpageedit: $EDIT_COUNT files"
        echo "adminpageoriginal: $ORIGINAL_COUNT files"
        echo "adminpagedonttouch: $DONTTOUCH_COUNT files"
        echo "========================================="
        
        # List some sample files
        echo ""
        echo "Sample files found:"
        find "$ONEDRIVE_PATH" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.json" \) 2>/dev/null | head -10
        
        break
    fi
    
    sleep 5
done