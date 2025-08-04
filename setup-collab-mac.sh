#!/bin/bash
# Mac Collaboration Setup Script

echo "========================================"
echo "   Setting Up Real-Time Collaboration"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Option 1: VS Code Live Share
echo -e "${GREEN}[1] VS Code Live Share Setup${NC}"
echo "-----------------------------"

if command -v code &> /dev/null; then
    echo -e "${YELLOW}Installing Live Share extension...${NC}"
    code --install-extension MS-vsliveshare.vsliveshare
    echo -e "${GREEN}[OK] Live Share installed!${NC}"
    echo -e "${CYAN}To use: Open VS Code > Click Live Share icon > Join${NC}"
else
    echo -e "${RED}[!] VS Code not found. Install from: https://code.visualstudio.com${NC}"
fi

echo ""
echo -e "${GREEN}[2] OneDrive Sync Setup${NC}"
echo "-----------------------"

# Check if OneDrive is installed
if [ -d "/Applications/OneDrive.app" ]; then
    echo -e "${GREEN}[OK] OneDrive is installed${NC}"
    echo -e "${CYAN}To sync:${NC}"
    echo "1. Accept the shared folder invite from your colleague"
    echo "2. Let OneDrive sync the folder"
    echo "3. Open the synced folder in VS Code"
else
    echo -e "${YELLOW}OneDrive not installed. Install from:${NC}"
    echo "https://apps.apple.com/app/onedrive/id823766827"
fi

echo ""
echo -e "${GREEN}[3] Alternative: Dropbox Setup${NC}"
echo "------------------------------"

if [ -d "/Applications/Dropbox.app" ]; then
    echo -e "${GREEN}[OK] Dropbox is installed${NC}"
else
    echo "1. Install Dropbox: https://www.dropbox.com/download"
    echo "2. Accept shared folder from colleague"
    echo "3. Open in VS Code when synced"
fi

echo ""
echo -e "${GREEN}[4] Install Node.js (if needed)${NC}"
echo "-------------------------------"

if command -v node &> /dev/null; then
    echo -e "${GREEN}[OK] Node.js is installed (version: $(node -v))${NC}"
else
    echo -e "${YELLOW}Node.js not found. Install using:${NC}"
    echo "brew install node"
    echo "Or download from: https://nodejs.org"
fi

echo ""
echo -e "${GREEN}[5] Quick Setup for Shared Project${NC}"
echo "----------------------------------"
echo -e "${CYAN}Once you have the shared folder:${NC}"
echo "cd ~/OneDrive/CAG_Shared_Project  # or your sync location"
echo "npm install"
echo "npm run dev"

echo ""
echo "========================================"
echo -e "${CYAN}   Collaboration Options:${NC}"
echo "========================================"
echo "1. VS Code Live Share - Edit together in real-time"
echo "2. OneDrive/Dropbox - Auto-sync changes"
echo "3. CodeSandbox.io - Edit in browser together"

# Make script executable
chmod +x setup-collab-mac.sh