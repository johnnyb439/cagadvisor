#!/bin/bash

echo "🚀 Pushing to GitHub..."
echo "Repository: https://github.com/beatitbud/Cleard-Advisory.git"
echo ""

# Set the remote if not already set
git remote set-url origin https://github.com/beatitbud/Cleard-Advisory.git 2>/dev/null || git remote add origin https://github.com/beatitbud/Cleard-Advisory.git

# Push to GitHub
echo "Pushing code to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Your code should now be on GitHub."
echo "Visit: https://github.com/beatitbud/Cleard-Advisory"