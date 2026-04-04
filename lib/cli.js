const prompts = require('prompts');
const path = require('path');
const fs = require('fs');
const { copyTemplates } = require('./copy');
const { mergeSettings } = require('./settings-merge');
const { create: createMetadata, read: readMetadata } = require('./metadata');
const { setupDb } = require('./db-setup');

const VERSION = require('../package.json').version;

const MODULES = {
  'session-loop': {
    name: 'Session Loop (orient + debrief)',
    description: 'Context continuity between sessions. Claude starts informed, ends by recording what happened.',
    mandatory: true,
    templates: ['skills/orient', 'skills/debrief', 'skills/menu', 'hooks/stop-hook.md'],
  },
  'hooks': {
    name: 'Git Guardrails + Telemetry',
    description: 'Block destructive git ops (force push, hard reset). Track skill usage via JSONL telemetry.',
    mandatory: false,
    default: true,
    templates: ['hooks/git-guardrails.sh', 'hooks/skill-telemetry.sh', 'hooks/skill-tool-telemetry.sh'],
  },
  'work-tracking': {
    name: 'Work Tracking (pib-db)',
    description: 'Lightweight SQLite task/project tracker. Gives orient something to scan, debrief something to close.',
    mandatory: false,
    default: true,
    templates: ['scripts/pib-db.js', 'scripts/pib-db-schema.sql'],
    needsDb: true,
  },
  'planning': {
    name: 'Planning + Execution (plan + execute)',
    description: 'Structured implementation planning with perspective critique and execution checkpoints.',
    mandatory: false,
    default: true,
    templates: ['skills/plan', 'skills/execute', 'skills/investigate'],
  },
  'compliance': {
    name: 'Compliance Stack (rules + enforcement)',
    description: 'Scoped instructions that load by path. Enforcement pipeline for promoting patterns to rules.',
    mandatory: false,
    default: true,
    templates: ['rules/enforcement-pipeline.md', 'memory/patterns/_pattern-template.md', 'memory/patterns/pattern-intelligence-first.md'],
  },
  'audit': {
    name: 'Audit Loop (audit + triage + perspectives)',
    description: 'Periodic expert-perspective analysis with structured triage. Most compute-intensive module.',
    mandatory: false,
    default: true,
    templates: [
      'skills/audit', 'skills/pulse', 'skills/triage-audit',
      'skills/perspectives',
      'scripts/merge-findings.js', 'scripts/load-triage-history.js',
      'scripts/triage-server.mjs', 'scripts/triage-ui.html',
      'scripts/finding-schema.json',
    ],
  },
  'lifecycle': {
    name: 'Lifecycle (onboard + seed + upgrade)',
    description: 'Conversational onboarding, capability seeding from tech signals, upgrade merges.',
    mandatory: false,
    default: true,
    templates: ['skills/onboard', 'skills/seed', 'skills/upgrade'],
  },
  'validate': {
    name: 'Validate',
    description: 'Structural validation checks with unified summary. Define your own validators.',
    mandatory: false,
    default: true,
    templates: ['skills/validate'],
  },
};

async function run() {
  console.log('');
  console.log('  🚂 Claude on Rails v' + VERSION);
  console.log('  Opinionated process scaffolding for Claude Code projects');
  console.log('');

  const targetDir = process.argv[2] || '.';
  const projectDir = path.resolve(targetDir);

  // Check for existing installation
  const existing = readMetadata(projectDir);
  if (existing) {
    console.log(`  Found existing installation (v${existing.version}, installed ${existing.installedAt.split('T')[0]})`);
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: 'Update existing installation?',
      initial: true,
    });
    if (!proceed) {
      console.log('  Cancelled.');
      return;
    }
  }

  // Quick mode: install everything?
  const { installAll } = await prompts({
    type: 'confirm',
    name: 'installAll',
    message: 'Install everything? (Y skips individual module questions)',
    initial: true,
  });

  let selectedModules = [];
  let skippedModules = [];
  let includeDb = true;

  if (installAll) {
    selectedModules = Object.keys(MODULES);
    console.log(`\n  Installing all ${selectedModules.length} modules.\n`);
  } else {
    // Walk through each module
    for (const [key, mod] of Object.entries(MODULES)) {
      if (mod.mandatory) {
        console.log(`  ✓ ${mod.name} (mandatory)`);
        selectedModules.push(key);
        continue;
      }

      const { include } = await prompts({
        type: 'confirm',
        name: 'include',
        message: `${mod.name}\n    ${mod.description}`,
        initial: mod.default !== false,
      });

      if (include) {
        selectedModules.push(key);
      } else {
        skippedModules.push(key);
      }
    }

    // DB prompt (only if work-tracking was selected)
    if (selectedModules.includes('work-tracking')) {
      const { db } = await prompts({
        type: 'confirm',
        name: 'db',
        message: 'Set up work tracking database? (requires better-sqlite3)',
        initial: true,
      });
      includeDb = db;
    } else {
      includeDb = false;
    }
  }

  console.log('\n  Setting up Claude on Rails...\n');

  // 1. Copy template files for selected modules
  const templateRoot = path.join(__dirname, '..', 'templates');
  const claudeDir = path.join(projectDir, '.claude');

  let totalCopied = 0;
  let totalSkipped = 0;
  let totalOverwritten = 0;

  for (const modKey of selectedModules) {
    const mod = MODULES[modKey];
    for (const tmpl of mod.templates) {
      const srcPath = path.join(templateRoot, tmpl);
      if (!fs.existsSync(srcPath)) {
        console.log(`  ⚠ Template not found: ${tmpl}`);
        continue;
      }

      // Determine destination based on template type
      let destPath;
      if (tmpl.startsWith('skills/') || tmpl.startsWith('hooks/') || tmpl.startsWith('rules/')) {
        destPath = path.join(claudeDir, tmpl);
      } else if (tmpl.startsWith('scripts/')) {
        destPath = path.join(projectDir, tmpl);
      } else if (tmpl.startsWith('memory/')) {
        destPath = path.join(claudeDir, tmpl);
      } else {
        destPath = path.join(claudeDir, tmpl);
      }

      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()) {
        const results = await copyTemplates(srcPath, destPath);
        totalCopied += results.copied.length;
        totalSkipped += results.skipped.length;
        totalOverwritten += results.overwritten.length;
      } else {
        // Single file
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        if (fs.existsSync(destPath)) {
          const existing = fs.readFileSync(destPath, 'utf8');
          const incoming = fs.readFileSync(srcPath, 'utf8');
          if (existing === incoming) {
            totalSkipped++;
            continue;
          }

          const response = await prompts({
            type: 'select',
            name: 'action',
            message: `File exists: ${tmpl}`,
            choices: [
              { title: 'Keep existing', value: 'keep' },
              { title: 'Overwrite with template', value: 'overwrite' },
            ],
          });

          if (response.action === 'overwrite') {
            fs.copyFileSync(srcPath, destPath);
            totalOverwritten++;
          } else {
            totalSkipped++;
          }
        } else {
          fs.copyFileSync(srcPath, destPath);
          totalCopied++;
        }
      }
    }
  }

  console.log(`  📁 Files: ${totalCopied} copied, ${totalOverwritten} overwritten, ${totalSkipped} unchanged`);

  // 2. Make hook scripts executable
  const hooksDir = path.join(claudeDir, 'hooks');
  if (fs.existsSync(hooksDir)) {
    const hookFiles = fs.readdirSync(hooksDir).filter(f => f.endsWith('.sh'));
    for (const f of hookFiles) {
      fs.chmodSync(path.join(hooksDir, f), 0o755);
    }
    if (hookFiles.length > 0) {
      console.log(`  🔧 Made ${hookFiles.length} hook scripts executable`);
    }
  }

  // 3. Merge hooks into settings.json
  if (selectedModules.includes('hooks')) {
    const settingsPath = mergeSettings(projectDir, { includeDb });
    console.log(`  ⚙️  Merged hooks into ${path.relative(projectDir, settingsPath)}`);
  }

  // 4. Set up database
  if (includeDb && selectedModules.includes('work-tracking')) {
    try {
      const dbResults = setupDb(projectDir);
      for (const r of dbResults) console.log(`  🗄️  ${r}`);
    } catch (err) {
      console.log(`  ⚠ Database setup failed: ${err.message}`);
      console.log('    You can set it up later: node scripts/pib-db.js init');
    }
  }

  // 5. Write metadata
  createMetadata(projectDir, {
    modules: selectedModules,
    skipped: skippedModules,
    version: VERSION,
  });
  console.log('  📝 Created .pibrc.json');

  // 6. Summary
  console.log('\n  ✅ Claude on Rails installed!\n');
  console.log('  Next steps:');
  console.log('  1. Run /onboard in Claude Code to generate your project context');
  console.log('  2. Start a session with /orient');
  console.log('  3. End a session with /debrief');
  if (skippedModules.length > 0) {
    console.log(`\n  Skipped modules: ${skippedModules.join(', ')}`);
    console.log('  Re-run npx create-claude-rails to add them later.');
  }
  console.log('');
}

module.exports = { run, MODULES };
