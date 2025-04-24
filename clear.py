#!/usr/bin/env python3
"""
Clear Project - A script to clean up a Next.js project for sharing.

This script removes files and directories that can be easily recreated
after npm install and npm run build commands are executed.

Usage:
    python clear.py

"""

import os
import shutil
import sys
from pathlib import Path

def print_colored(text, color_code):
    """Print colored text in the terminal."""
    print(f"\033[{color_code}m{text}\033[0m")

def print_success(text):
    """Print success message in green."""
    print_colored(text, "32")

def print_warning(text):
    """Print warning message in yellow."""
    print_colored(text, "33")

def print_error(text):
    """Print error message in red."""
    print_colored(text, "31")


def print_info(text):
    """Print info message in blue."""
    print_colored(text, "34")


def get_confirmation():
    """Ask user for confirmation before proceeding."""
    response = input("Do you want to proceed? (y/n): ").lower().strip()
    return response == 'y' or response == 'yes'


def safe_remove(path):
    """Remove a file or directory safely."""
    try:
        if os.path.isfile(path):
            os.remove(path)
            print_success(f"Removed file: {path}")
        elif os.path.isdir(path):
            shutil.rmtree(path)
            print_success(f"Removed directory: {path}")
        else:
            print_warning(f"Path does not exist: {path}")
    except Exception as e:
        print_error(f"Error removing {path}: {e}")


def clear_project():
    """Clear files and directories that can be recreated."""
    # Get current directory
    current_dir = Path.cwd()
    
    # Paths to delete (files and directories that can be recreated)
    paths_to_delete = [
        # Build directories
        ".next",               # Next.js build output
        "dist",                # Common build output
        "build",               # Common build output
        
        # Dependencies
        "node_modules",        # Node.js dependencies
        
        # Cache directories
        ".cache",              # Cache directory
        ".eslintcache",        # ESLint cache
        
        # Log files
        "npm-debug.log",       # NPM logs
        "yarn-error.log",      # Yarn logs
        "yarn-debug.log",      # Yarn logs
        ".pnpm-debug.log",     # PNPM logs
        
        # Lock files (optional, but can be recreated)
        # "package-lock.json",   # NPM lock file (uncomment if you want to delete)
        # "yarn.lock",           # Yarn lock file (uncomment if you want to delete)
        
        # Environment files (don't delete if they contain sensitive info)
        # ".env.local",          # Local environment variables
        # ".env.development",    # Development environment variables
        # ".env.production",     # Production environment variables
        
        # Editor-specific directories
        ".vscode",             # VS Code settings
        ".idea",               # JetBrains IDE settings
        
        # TypeScript cache
        ".tsbuildinfo",        # TypeScript build info
        
        # Other system files
        ".DS_Store",           # macOS folder attributes
        "Thumbs.db",           # Windows folder attributes
    ]
    
    # Print warning
    print_warning("This script will delete the following files and directories:")
    for path in paths_to_delete:
        full_path = current_dir / path
        if full_path.exists():
            print(f"  - {path}")
    
    print_info("\nThese files can be recreated by running:")
    print("  npm install")
    print("  npm run build\n")
    
    # Get confirmation
    if not get_confirmation():
        print_info("Operation cancelled.")
        sys.exit(0)
    
    # Delete paths
    print_info("\nDeleting files and directories...\n")
    for path in paths_to_delete:
        full_path = current_dir / path
        if full_path.exists():
            safe_remove(full_path)
    
    print_success("\nClean-up complete!")
    print_info("To rebuild the project, run:")
    print("  npm install")
    print("  npm run build")


if __name__ == "__main__":
    try:
        clear_project()
    except KeyboardInterrupt:
        print_info("\nOperation cancelled by user.")
        sys.exit(0) 

