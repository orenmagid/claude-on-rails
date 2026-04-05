#!/usr/bin/env node
// CoR Drift Check — detect modified upstream-managed files
//
// Compares current file hashes against .corrc.json manifest hashes.
// Reports files that have been modified since install (drift).
//
// Usage:
//   node scripts/cor-drift-check.js          # exit 0 if clean, 1 if drift
//   node scripts/cor-drift-check.js --json   # output JSON for programmatic use
//   node scripts/cor-drift-check.js --fix    # show what /cor-upgrade would fix

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectRoot = findProjectRoot();
if (!projectRoot) {
  console.error('No .corrc.json found — not a CoR project.');
  process.exit(2);
}

const metadataPath = path.join(projectRoot, '.corrc.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const manifest = metadata.manifest || {};

function findProjectRoot() {
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, '.corrc.json'))) return dir;
    dir = path.dirname(dir);
  }
  return null;
}

function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

const drifted = [];
const missing = [];
const clean = [];

for (const [relPath, expectedHash] of Object.entries(manifest)) {
  const fullPath = path.join(projectRoot, relPath);

  if (!fs.existsSync(fullPath)) {
    missing.push(relPath);
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const currentHash = hashContent(content);

  if (currentHash !== expectedHash) {
    drifted.push(relPath);
  } else {
    clean.push(relPath);
  }
}

const args = process.argv.slice(2);

if (args.includes('--json')) {
  console.log(JSON.stringify({ drifted, missing, clean: clean.length }, null, 2));
} else {
  if (drifted.length === 0 && missing.length === 0) {
    console.log(`All ${clean.length} CoR-managed files match upstream hashes.`);
  } else {
    if (drifted.length > 0) {
      console.log(`Drifted (${drifted.length} files modified from upstream):`);
      for (const f of drifted) console.log(`  ${f}`);
    }
    if (missing.length > 0) {
      console.log(`Missing (${missing.length} files deleted):`);
      for (const f of missing) console.log(`  ${f}`);
    }
    console.log(`\nClean: ${clean.length} files match.`);
    if (args.includes('--fix')) {
      console.log('\nRun /cor-upgrade to restore drifted files to upstream versions.');
    }
  }
}

process.exit(drifted.length > 0 || missing.length > 0 ? 1 : 0);
