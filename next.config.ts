import { execSync } from "node:child_process";
import type { NextConfig } from "next";

// When the code this copy runs was last changed (its newest commit), for "A new version of broke is ready".
let builtFrom = "";
try {
  builtFrom = execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
} catch {
  /* no git (a download without history): the update check stays quiet */
}

// The GitHub repo this copy was built from ("owner/name"), for the links in Settings on an online copy.
let repo = "";
try {
  repo = execSync("git remote get-url origin", { stdio: ["ignore", "pipe", "ignore"] }).toString().match(/github\.com[:/]([\w.-]+\/[\w.-]+?)(?:\.git)?\s*$/)?.[1] ?? "";
} catch {
  /* no git remote: Settings shows the steps without links */
}

const nextConfig: NextConfig = {
  devIndicators: false,
  distDir: process.env.NEXT_DIST_DIR || ".next", // a production build can sit beside the running dev server
  serverExternalPackages: ["pg"],
  env: { BROKE_BUILT_FROM: builtFrom, BROKE_REPO: repo },
  // Keep pages you visited for 3 min, so going back or switching tabs is instant. Every edit calls router.refresh(),
  // which drops the cache, so changes still show at once.
  experimental: { staleTimes: { dynamic: 180 } },
};

export default nextConfig;
