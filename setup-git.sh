#!/bin/bash

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/Mrhappybyaxzora/happycricket.git

# Push to GitHub
git push -u origin main

echo "Repository has been pushed to GitHub" 