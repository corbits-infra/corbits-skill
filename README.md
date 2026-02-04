```
 ██████╗ ██████╗ ██████╗ ██████╗ ██╗████████╗███████╗
██╔════╝██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝██╔════╝
██║     ██║   ██║██████╔╝██████╔╝██║   ██║   ███████╗
██║     ██║   ██║██╔══██╗██╔══██╗██║   ██║   ╚════██║
╚██████╗╚██████╔╝██║  ██║██████╔╝██║   ██║   ███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝   ╚══════╝

          https://api.corbits.dev
```

# Corbits Skill for Claude Code

Discover and call paid API proxies on the [Corbits](https://api.corbits.dev) platform directly from Claude Code.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/corbits-infra/corbits-skill/main/install.sh | bash
```

Or clone manually:

```bash
git clone https://github.com/corbits-infra/corbits-skill ~/.claude/skills/corbits
```

Then in Claude Code, run `/corbits init` to set up your wallet keys.

## Update

The skill checks for updates automatically once per day. When a new version is available, it will offer to update in place.

To update manually, re-run the install command.

## Usage

```
/corbits init              Set up wallet keys and install dependencies
/corbits search <query>    Search for API proxies
/corbits search            List all available proxies
/corbits status            Show current proxy
/corbits list              Show all endpoints for the current proxy
/corbits call              Pick an endpoint and call it
/corbits call <filter>     Filter endpoints by name (e.g. /corbits call models)
```

## Uninstall

```bash
rm -rf ~/.claude/skills/corbits ~/.config/corbits
```

To also remove wallet keys from Keychain:

```bash
security delete-generic-password -a corbits -s corbits-solana-keypair
security delete-generic-password -a corbits -s corbits-evm-key
```
