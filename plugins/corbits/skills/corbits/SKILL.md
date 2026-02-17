---
name: corbits
description: Discover Corbits API proxies, fetch OpenAPI specs, and make API calls
argument-hint: init | search | call | status | list
allowed-tools: WebFetch, Bash, AskUserQuestion, Read, webfetch, bash, question, read
---

# Corbits API Discovery

Help users discover API proxies on the Corbits platform, explore their OpenAPI specs, and make API calls.

## Base URL

`https://api.corbits.dev`

## Context file

`~/.config/corbits/context.json` persists the current proxy between invocations. Written when a proxy is selected. Format:

```json
{"id":61,"name":"openai","org_slug":null,"url":"https://openai.api.corbits.dev"}
```

## Command routing

Parse `$ARGUMENTS` and follow the matching flow:

| `$ARGUMENTS` | Flow |
|--------------|------|
| *(empty)* | **Help flow** -- show available commands |
| `init` | **Init flow** |
| `status` | **Status flow** |
| `list` | **List flow** -- show all endpoints for current proxy |
| `call` | **Call flow** -- pick from top endpoints |
| `call <filter>` | **Call flow** -- filter endpoints matching `<filter>` |
| `search <query>` | **Search flow** -- search for `<query>` |
| `search` *(no query)* | **Search flow** -- list all proxies |

---

## Precheck (for call and search flows)

Before running any flow that executes `~/.bun/bin/bun rides.ts` (call flow, search flow step 5), verify init has been completed and at least one wallet is configured.

**macOS:**
```bash
test -f ~/.config/corbits/project/rides.ts && echo "rides=ok" || echo "rides=missing"; security find-generic-password -a corbits -s corbits-solana-keypair -w >/dev/null 2>&1 && echo "sol=ok" || echo "sol=missing"; security find-generic-password -a corbits -s corbits-evm-key -w >/dev/null 2>&1 && echo "evm=ok" || echo "evm=missing"
```

**Linux:**
```bash
test -f ~/.config/corbits/project/rides.ts && echo "rides=ok" || echo "rides=missing"; ([ -n "$CORBITS_SOLANA_KEYPAIR" ] || test -s ~/.config/corbits/credentials/solana-keypair) && echo "sol=ok" || echo "sol=missing"; ([ -n "$CORBITS_EVM_KEY" ] || test -s ~/.config/corbits/credentials/evm-key) && echo "evm=ok" || echo "evm=missing"
```

Detect the platform with `uname -s` (`Darwin` = macOS, `Linux` = Linux) and run the appropriate command.

If `rides=missing`, tell the user: "Corbits is not set up yet. Run `/corbits init` first." STOP.

If both `sol=missing` and `evm=missing`, tell the user: "No wallet keys configured. Run `/corbits init` to set up at least one wallet." STOP.

---

## Help flow

Print the available commands:

```
/corbits init              Set up wallet keys and install dependencies
/corbits search <query>    Search for API proxies
/corbits search            List all available proxies
/corbits status            Show current proxy
/corbits list              Show all endpoints for the current proxy
/corbits call              Pick an endpoint and call it
/corbits call <filter>     Filter endpoints by name (e.g. /corbits call models)
```

Then read `~/.config/corbits/context.json`. If it exists, also show: "Current proxy: <name> (<url>)". If not, show: "No proxy selected. Run `/corbits search` to find one."

---

## Status flow

Read `~/.config/corbits/context.json`. If it exists, show the proxy name and URL. If not, tell the user to search for a proxy first (e.g. `/corbits search openai`).

---

## Base path extraction

When fetching an OpenAPI spec, extract the base path from the `servers` field. For example, if `servers[0].url` is `https://api.openai.com/v1`, the base path is `/v1`. All spec paths are relative to this base path. When constructing URLs, always prepend the base path: `<proxy_url><base_path><spec_path>` (e.g. `https://openai.api.corbits.dev/v1/models`). If there is no `servers` field or the server URL has no path, the base path is empty.

---

## Call flow

### Step 1. Precheck and read context

Run the precheck (see "Precheck" above). If not initialized, STOP.

```bash
cat ~/.config/corbits/context.json 2>/dev/null || echo "none"
```

If no context, tell the user to search for a proxy first. STOP.

Print the current proxy name and URL (e.g. "Calling on **open-ai** (`https://...`)"). Do NOT ask for confirmation -- just continue to step 2.

### Step 2. Fetch OpenAPI spec or endpoint list

```
WebFetch https://api.corbits.dev/api/v1/proxies/<id>/openapi
```

If the spec is available, extract the base path from `servers[0].url` (see "Base path extraction" above).

If the OpenAPI spec is not available (404), fetch the endpoint list instead:

```
WebFetch https://api.corbits.dev/api/v1/proxies/<id>/endpoints
```

This returns `path_pattern`, `description`, `price_usdc`, and `scheme` for each endpoint. Use these as the available endpoints for the remaining steps. The base path is empty when using the endpoint list (paths like `/v1/models` are already fully qualified in `path_pattern`).

### Step 3. Pick an endpoint

If `$ARGUMENTS` is `call <filter>` (e.g. `/corbits call models`), filter the endpoints to only those whose path or summary matches the filter text (case-insensitive). If no filter was provided (`/corbits call`), use all endpoints.

Use AskUserQuestion to let the user pick from the filtered endpoints. Show up to 4 options. Label each with `METHOD <base_path><spec_path>` (e.g. `GET /v1/models`) and a short description. The user can always select "Other" to type a custom path.

### Step 4. Show pricing

If the OpenAPI spec was available, check the chosen endpoint's `x-corbits-price` or `x-402` extension fields for the per-call price. If using the endpoint list instead, use the `price_usdc` field directly.

Show the user the cost before proceeding, e.g. "This call costs **0.01 USDC**."

### Step 5. Collect required parameters

If the OpenAPI spec was available, look at the chosen endpoint's schema. If it needs a request body or required query params, use AskUserQuestion to collect the values from the user. If the endpoint has no required params (e.g. `GET /v1/models`), skip this step.

If only the endpoint list is available (no spec), ask the user for the HTTP method and any request body they want to send.

For endpoints with complex bodies (like chat completions), pre-fill sensible defaults and let the user confirm or customize via AskUserQuestion.

### Step 6. Execute the call

For GET (no body):
```bash
~/.bun/bin/bun ~/.config/corbits/project/rides.ts GET "<proxy_url><base_path><spec_path>"
```

For POST/PUT/PATCH/DELETE (with body):
```bash
~/.bun/bin/bun ~/.config/corbits/project/rides.ts <METHOD> "<proxy_url><base_path><spec_path>" '<json_body>'
```

---

## List flow

When `$ARGUMENTS` is `list`:

### Step 1. Read context

```bash
cat ~/.config/corbits/context.json 2>/dev/null || echo "none"
```

If no context, tell the user to search for a proxy first (e.g. `/corbits search openai`). STOP.

### Step 2. Fetch OpenAPI spec or endpoint list

```
WebFetch https://api.corbits.dev/api/v1/proxies/<id>/openapi
```

If the spec is available, extract the base path from `servers[0].url` (see "Base path extraction" above). Check for `x-corbits-price` or `x-402` extension fields on each endpoint for pricing.

If the OpenAPI spec is not available (404), fetch the endpoint list instead:

```
WebFetch https://api.corbits.dev/api/v1/proxies/<id>/endpoints
```

This returns `path_pattern`, `description`, `price_usdc`, and `scheme` for each endpoint.

In either case, present the available endpoints in a markdown table with columns: Path, Description, Methods, Price. Suggest a simple GET endpoint with no required parameters to try.

---

## Init flow

If `$ARGUMENTS` is `init`, run these steps in order:

### Step 1. Collect wallet keys and store credentials

Detect the platform with `uname -s` and run the appropriate command. Leaving a key empty or pressing Enter skips it.

**macOS:**

IMPORTANT: Do NOT use multi-statement AppleScript (`-e 'if ...'`). Use a single `-e` with just `text returned of result`. The "Skip" button is handled by checking if the result is empty afterward. Clicking Skip triggers an AppleScript error caught by `2>/dev/null || echo ""`.

```bash
SOL_KEY=$(osascript -e 'display dialog "Solana keypair:" with title "Corbits Setup" buttons {"Skip", "OK"} default button "OK" default answer "" with hidden answer' -e 'text returned of result' 2>/dev/null || echo "") && EVM_KEY=$(osascript -e 'display dialog "EVM private key:" with title "Corbits Setup" buttons {"Skip", "OK"} default button "OK" default answer "" with hidden answer' -e 'text returned of result' 2>/dev/null || echo ""); [ -n "$SOL_KEY" ] && security add-generic-password -a corbits -s corbits-solana-keypair -w "$SOL_KEY" -U; [ -n "$EVM_KEY" ] && security add-generic-password -a corbits -s corbits-evm-key -w "$EVM_KEY" -U; echo "sol=$([ -n "$SOL_KEY" ] && echo configured || echo skipped) evm=$([ -n "$EVM_KEY" ] && echo configured || echo skipped)"
```

**Linux:**

Collect both keys from the user using AskUserQuestion (or equivalent prompt tool). Each key is optional — if the user skips or leaves it empty, that key is not configured. Then write the non-empty keys:

```bash
mkdir -p ~/.config/corbits/credentials && chmod 700 ~/.config/corbits/credentials
```

For each key the user provided, write it:
```bash
printf '%s' '<solana_keypair_value>' > ~/.config/corbits/credentials/solana-keypair && chmod 600 ~/.config/corbits/credentials/solana-keypair
```
```bash
printf '%s' '<evm_key_value>' > ~/.config/corbits/credentials/evm-key && chmod 600 ~/.config/corbits/credentials/evm-key
```

Then check what was configured:
```bash
echo "sol=$(test -f ~/.config/corbits/credentials/solana-keypair && echo configured || echo skipped) evm=$(test -f ~/.config/corbits/credentials/evm-key && echo configured || echo skipped)"
```

On macOS, keys are stored in Keychain. On Linux, keys are stored in `~/.config/corbits/credentials/` with restricted permissions (700 directory, 600 files). The `rides.ts` script reads from the appropriate backend at call time.

### Step 2. Check that at least one key was configured

If the output from step 1 shows both `sol=skipped` and `evm=skipped`, STOP here. Tell the user: "No wallet keys were configured. Run `/corbits init` again to set up at least one wallet." Do NOT continue to steps 3-6.

### Step 3. Install bun if needed

```bash
command -v bun >/dev/null 2>&1 || curl -fsSL https://bun.sh/install | bash
```

After install, source the shell profile or use the full path (`~/.bun/bin/bun`).

### Step 4. Scaffold bun project

```bash
mkdir -p ~/.config/corbits/project && ~/.bun/bin/bun init -y --cwd ~/.config/corbits/project && ~/.bun/bin/bun add @faremeter/rides --cwd ~/.config/corbits/project
```

### Step 5. Write `~/.config/corbits/project/rides.ts`

```typescript
import { payer } from "@faremeter/rides";
import { execSync } from "child_process";
import { readFileSync, writeFileSync, unlinkSync, mkdtempSync } from "fs";
import { join } from "path";
import { tmpdir, platform, homedir } from "os";

const ENV_NAMES: Record<string, string> = {
  "solana-keypair": "CORBITS_SOLANA_KEYPAIR",
  "evm-key": "CORBITS_EVM_KEY",
};

function getCredential(service: string): string | null {
  const envName = ENV_NAMES[service];
  if (envName) {
    const envVal = process.env[envName];
    if (envVal) return envVal.trim();
  }
  try {
    if (platform() === "darwin") {
      return execSync(
        `security find-generic-password -a corbits -s corbits-${service} -w`,
        { encoding: "utf-8" }
      ).trim();
    }
    return readFileSync(
      join(homedir(), ".config", "corbits", "credentials", service),
      { encoding: "utf-8" }
    ).trim();
  } catch {
    return null;
  }
}

const tempFiles: string[] = [];

function cleanup() {
  for (const f of tempFiles) {
    try { unlinkSync(f); } catch {}
  }
}

process.on("exit", cleanup);
process.on("SIGINT", () => { cleanup(); process.exit(1); });
process.on("SIGTERM", () => { cleanup(); process.exit(1); });

const solKeypair = getCredential("solana-keypair");
if (solKeypair) {
  if (solKeypair.startsWith("[")) {
    const dir = mkdtempSync(join(tmpdir(), "corbits-"));
    const tmpFile = join(dir, "keypair.json");
    writeFileSync(tmpFile, solKeypair, { mode: 0o600 });
    tempFiles.push(tmpFile);
    await payer.addLocalWallet(tmpFile);
  } else {
    await payer.addLocalWallet(solKeypair);
  }
}

const evmPrivateKey = getCredential("evm-key");
if (evmPrivateKey) await payer.addLocalWallet(evmPrivateKey);

const method = process.argv[2]?.toUpperCase();
const url = process.argv[3];

if (!method || !url) {
  console.error("Usage: bun rides.ts <METHOD> <URL> [JSON_BODY]");
  process.exit(1);
}

const options: RequestInit = { method };

const body = process.argv[4];
if (body) {
  options.headers = { "Content-Type": "application/json" };
  options.body = body;
}

const res = await payer.fetch(url, options);
console.log(res.status, await res.text());
```

### Step 6. Confirm

Print summary of what wallets were configured and how to use `/corbits` to discover and call APIs.

---

## Search flow

`$ARGUMENTS` starts with `search`. The query is everything after `search ` (e.g. `/corbits search openai` -> query is `openai`).

### Step 1. Search or list proxies

If a query was provided, search for it:

```
WebFetch https://api.corbits.dev/api/v1/search?q=<query>
```

If no query was provided (`/corbits search`), list available proxies (use cursor pagination if needed to show more):

```
WebFetch https://api.corbits.dev/api/v1/proxies
```

### Step 2. Present results and select a proxy

Show the user the matching proxies with their name, url, tags, and pricing. For search results, also show matching endpoints with their path_pattern and description. If there are multiple proxy matches, use AskUserQuestion to let them pick one.

### Step 3. Save context

After a proxy is selected, write the context file:

```bash
echo '{"id":<id>,"name":"<name>","org_slug":<org_slug_or_null>,"url":"<url>"}' > ~/.config/corbits/context.json
```

### Step 4. Fetch the OpenAPI spec

```
WebFetch https://api.corbits.dev/api/v1/proxies/<proxy-id>/openapi
```

Extract the base path from `servers[0].url` (see "Base path extraction" above). Present the available endpoints with their full paths (`<base_path><spec_path>`), methods, and descriptions in a markdown table with columns: Path, Description, Methods. The spec contains the complete request/response schemas, query parameters, request body definitions, and auth requirements needed to construct API calls.

After the table, suggest a simple GET endpoint with no required parameters (e.g. `GET /v1/models`) so the user can quickly test the proxy without constructing a request body.

### Step 5. Help make API calls

When the user picks an endpoint and wants to make a call, use the endpoints route to get pricing details:

```
WebFetch https://api.corbits.dev/api/v1/proxies/<proxy-id>/endpoints
```

Run the precheck (see "Precheck" above). If not initialized, tell the user to run `/corbits init` and STOP.

Then execute the call using the bun project which handles x402 payment automatically:

For GET (no body):
```bash
~/.bun/bin/bun ~/.config/corbits/project/rides.ts GET "<proxy_url><base_path><spec_path>"
```

For POST/PUT/PATCH/DELETE (with body):
```bash
~/.bun/bin/bun ~/.config/corbits/project/rides.ts <METHOD> "<proxy_url><base_path><spec_path>" '<json_body>'
```

---

## Discovery API reference

### `GET /api/v1/search?q=<query>` - Search proxies and endpoints

No pagination. Returns up to 20 proxies and 50 endpoints. Empty or whitespace-only query returns empty arrays.

### `GET /api/v1/proxies` - List proxies

Cursor-based pagination. Query params: `cursor` (last item ID), `limit` (default 20, max 100).

### `GET /api/v1/proxies/:id` - Proxy detail

Returns proxy with `endpoint_count`. Errors: 400 (invalid ID), 404 (not found).

### `GET /api/v1/proxies/:id/openapi` - OpenAPI spec

Returns the proxy's OpenAPI spec. Errors: 400 (invalid ID), 404 (not found or no spec).

Response: `{ "data": { "id": 1, "name": "open-ai", "spec": { <OpenAPI object> } } }`

### `GET /api/v1/proxies/:id/endpoints` - List proxy endpoints

Cursor-based pagination. Query params: `cursor` (last item ID), `limit` (default 20, max 100). Returns 404 if proxy not found/inactive.

### Key details

- The `url` field is computed: `https://{name}.api.corbits.dev` or `https://{name}.{org_slug}.api.corbits.dev` when org_slug is present
- `backend_url` is internal and never returned in API responses
- All responses only include active proxies (`is_active=true`, `status='active'`)
- Prices are stored as micro-USDC integers. To display in USDC, multiply by `10e-6` (e.g. `10000` = `$0.01 USDC`)
- Always use the proxy's `url` field as the base URL for API calls, not the discovery API URL
- The `x-402` extension in specs indicates endpoints with payment requirements - `rides.ts` handles these automatically via `@faremeter/rides`
