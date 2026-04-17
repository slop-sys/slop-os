#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const submissionsDir = path.join(repoRoot, 'submissions');
const schemaPath = path.join(repoRoot, 'community-sites', 'community-site.schema.json');

const MAX_HTML_BYTES = 200_000;
const MAX_ASSET_BYTES = 1_500_000;
const MAX_FILES_PER_SITE = 30;

const bannedHtmlPatterns = [
  /<script\b/i,
  /\bon\w+\s*=\s*/i,
  /javascript\s*:/i,
  /<iframe\b/i,
  /<object\b/i,
  /<embed\b/i,
  /<link\b[^>]*rel\s*=\s*["']?preload["']?/i,
  /<meta\b[^>]*http-equiv\s*=\s*["']?refresh["']?/i
];

function fail(message) {
  console.error(`VALIDATION ERROR: ${message}`);
  process.exitCode = 1;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateManifestShape(manifest) {
  const required = ['id', 'name', 'slug', 'author', 'description', 'entry', 'tags', 'version'];
  for (const key of required) {
    if (!(key in manifest)) fail(`manifest missing required field: ${key}`);
  }

  const idRe = /^[a-z0-9-]{3,40}$/;
  const entryRe = /^sites\/[a-z0-9-]+\/index\.html$/;
  const iconRe = /^sites\/[a-z0-9-]+\/assets\/[a-z0-9._-]+\.(png|jpg|jpeg|gif|webp|svg)$/;

  if (!idRe.test(manifest.id)) fail(`invalid id: ${manifest.id}`);
  if (!idRe.test(manifest.slug)) fail(`invalid slug: ${manifest.slug}`);
  if (manifest.id !== manifest.slug) fail(`id and slug must match: ${manifest.id} vs ${manifest.slug}`);
  if (!entryRe.test(manifest.entry)) fail(`invalid entry path: ${manifest.entry}`);
  if (manifest.icon && !iconRe.test(manifest.icon)) fail(`invalid icon path: ${manifest.icon}`);

  if (!Array.isArray(manifest.tags) || manifest.tags.length === 0 || manifest.tags.length > 8) {
    fail(`tags must contain 1-8 items`);
  }

  const tagRe = /^[a-z0-9-]{2,20}$/;
  const unique = new Set();
  for (const tag of manifest.tags || []) {
    if (!tagRe.test(tag)) fail(`invalid tag: ${tag}`);
    if (unique.has(tag)) fail(`duplicate tag: ${tag}`);
    unique.add(tag);
  }
}

function scanSiteFiles(siteRoot) {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else {
        files.push(full);
      }
    }
  }
  walk(siteRoot);
  return files;
}

function validateHtmlSecurity(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  for (const pattern of bannedHtmlPatterns) {
    if (pattern.test(content)) {
      fail(`${path.relative(repoRoot, filePath)} contains banned pattern: ${pattern}`);
    }
  }
}

function validateSubmission(submissionDir) {
  const manifestPath = path.join(submissionDir, 'site.json');
  if (!fs.existsSync(manifestPath)) {
    fail(`${path.relative(repoRoot, submissionDir)} missing site.json`);
    return;
  }

  const manifest = readJson(manifestPath);
  if (!isObject(manifest)) {
    fail(`${path.relative(repoRoot, manifestPath)} must contain a JSON object`);
    return;
  }

  validateManifestShape(manifest);

  const siteRoot = path.join(submissionDir, 'sites', manifest.slug);
  if (!fs.existsSync(siteRoot) || !fs.statSync(siteRoot).isDirectory()) {
    fail(`missing site directory: ${path.relative(repoRoot, siteRoot)}`);
    return;
  }

  const entryPath = path.join(submissionDir, manifest.entry);
  if (!fs.existsSync(entryPath)) {
    fail(`entry file not found: ${manifest.entry}`);
    return;
  }

  const files = scanSiteFiles(siteRoot);
  if (files.length > MAX_FILES_PER_SITE) {
    fail(`${manifest.id}: too many files (${files.length}), max ${MAX_FILES_PER_SITE}`);
  }

  for (const file of files) {
    const stats = fs.statSync(file);
    const ext = path.extname(file).toLowerCase();
    const relative = path.relative(repoRoot, file);

    if (ext === '.html') {
      if (stats.size > MAX_HTML_BYTES) fail(`${relative} too large (${stats.size} bytes)`);
      validateHtmlSecurity(file);
    } else {
      if (stats.size > MAX_ASSET_BYTES) fail(`${relative} too large (${stats.size} bytes)`);
    }
  }

  console.log(`OK: ${manifest.id}`);
}

function main() {
  if (!fs.existsSync(schemaPath)) {
    fail(`schema not found: ${path.relative(repoRoot, schemaPath)}`);
    return;
  }

  if (!fs.existsSync(submissionsDir)) {
    fail(`submissions directory not found: ${path.relative(repoRoot, submissionsDir)}`);
    return;
  }

  const dirs = fs
    .readdirSync(submissionsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(submissionsDir, d.name));

  if (dirs.length === 0) {
    console.log('No submissions found.');
    return;
  }

  for (const dir of dirs) {
    validateSubmission(dir);
  }
}

main();

if (process.exitCode && process.exitCode !== 0) {
  process.exit(process.exitCode);
}
