#!/usr/bin/env bash
set -euo pipefail

cat << 'BANNER'

 ██████╗ ██████╗ ██████╗ ██████╗ ██╗████████╗███████╗
██╔════╝██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝██╔════╝
██║     ██║   ██║██████╔╝██████╔╝██║   ██║   ███████╗
██║     ██║   ██║██╔══██╗██╔══██╗██║   ██║   ╚════██║
╚██████╗╚██████╔╝██║  ██║██████╔╝██║   ██║   ███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝   ╚══════╝

          https://api.corbits.dev

BANNER

SKILL_DIR="$HOME/.claude/skills/corbits"
REPO="https://github.com/corbits-infra/corbits-skill.git"

if [ -d "$SKILL_DIR" ]; then
  echo "Updating corbits skill..."
  git -C "$SKILL_DIR" pull --ff-only
else
  echo "Installing corbits skill..."
  mkdir -p "$HOME/.claude/skills"
  git clone "$REPO" "$SKILL_DIR"
fi

VERSION=$(cat "$SKILL_DIR/VERSION" 2>/dev/null || echo "unknown")

echo ""
echo "Installed corbits skill v$VERSION to $SKILL_DIR"
echo ""
echo "Usage:"
echo "  /corbits init              Set up wallet keys"
echo "  /corbits search <query>    Find API proxies"
echo "  /corbits call              Make an API call"
echo ""
echo "Run /corbits init in Claude Code to get started."
