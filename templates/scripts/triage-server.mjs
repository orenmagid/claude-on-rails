/**
 * Minimal triage server — serves the triage UI and holds findings/verdicts in memory.
 *
 * Claude POSTs findings, user triages in browser, Claude GETs verdicts.
 *
 * Usage: node triage-server.mjs [--port 3457]
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.argv.find((_, i, a) => a[i - 1] === '--port') || '3457');

let currentFindings = [];
let currentVerdicts = null;

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  // Serve HTML
  if (req.method === 'GET' && url.pathname === '/') {
    try {
      const html = await readFile(join(__dirname, 'triage-ui.html'), 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(html);
    } catch (err) {
      res.writeHead(500);
      return res.end('Failed to read triage-ui.html');
    }
  }

  // POST /api/findings — Claude sends findings
  if (req.method === 'POST' && url.pathname === '/api/findings') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const data = JSON.parse(body);
      currentFindings = data.findings || data;
      currentVerdicts = null; // Reset verdicts for new batch
      console.log(`Loaded ${currentFindings.length} findings`);
      return json(res, { ok: true, count: currentFindings.length });
    } catch (err) {
      return json(res, { error: 'Invalid JSON' }, 400);
    }
  }

  // GET /api/findings — UI fetches findings
  if (req.method === 'GET' && url.pathname === '/api/findings') {
    return json(res, { findings: currentFindings });
  }

  // POST /api/verdicts — UI submits verdicts
  if (req.method === 'POST' && url.pathname === '/api/verdicts') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      currentVerdicts = JSON.parse(body);
      console.log(`Received ${currentVerdicts.triaged}/${currentVerdicts.total} verdicts`);
      return json(res, { ok: true });
    } catch (err) {
      return json(res, { error: 'Invalid JSON' }, 400);
    }
  }

  // GET /api/verdicts — Claude reads verdicts
  if (req.method === 'GET' && url.pathname === '/api/verdicts') {
    if (!currentVerdicts) {
      return json(res, { submitted: false, message: 'No verdicts submitted yet' });
    }
    return json(res, currentVerdicts);
  }

  // 404
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Triage server running at http://localhost:${PORT}`);
});
