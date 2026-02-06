```
 ██████╗ ██████╗ ██████╗ ██████╗ ██╗████████╗███████╗
██╔════╝██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝██╔════╝
██║     ██║   ██║██████╔╝██████╔╝██║   ██║   ███████╗
██║     ██║   ██║██╔══██╗██╔══██╗██║   ██║   ╚════██║
╚██████╗╚██████╔╝██║  ██║██████╔╝██║   ██║   ███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝   ╚══════╝

          https://api.corbits.dev
```

# Corbits Plugin for Claude Code

Discover and call paid API proxies on the [Corbits](https://api.corbits.dev) platform directly from Claude Code.

## Install

Add the marketplace to Claude Code:

```
/plugin marketplace add corbits-infra/corbits-skill
```

Then install the plugin:

```
/plugin install corbits
```

Then run `/corbits init` to set up your wallet keys.

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

```
/plugin uninstall corbits
```

To also remove wallet keys from Keychain:

```bash
security delete-generic-password -a corbits -s corbits-solana-keypair
security delete-generic-password -a corbits -s corbits-evm-key
```
