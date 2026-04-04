const fs = require('fs');
const path = require('path');

const METADATA_FILE = '.pibrc.json';

function metadataPath(projectDir) {
  return path.join(projectDir, METADATA_FILE);
}

function read(projectDir) {
  const file = metadataPath(projectDir);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function write(projectDir, data) {
  const file = metadataPath(projectDir);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function create(projectDir, { modules, skipped, version }) {
  const data = {
    version,
    installedAt: new Date().toISOString(),
    modules: {},
  };

  for (const mod of modules) {
    data.modules[mod] = { installed: true, installedAt: new Date().toISOString() };
  }
  for (const mod of skipped) {
    data.modules[mod] = { installed: false, skippedAt: new Date().toISOString() };
  }

  write(projectDir, data);
  return data;
}

module.exports = { read, write, create, metadataPath, METADATA_FILE };
