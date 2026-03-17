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
if (res.status >= 400 && res.status !== 402) process.exit(1);
