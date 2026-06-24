#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const data = {};
for (let i = 0; i < args.length; i += 1) {
  const key = args[i];
  if (!key.startsWith('--')) continue;
  const name = key.slice(2);
  const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : '';
  data[name] = value;
}

for (const key of ['province', 'score', 'gender', 'family']) {
  if (!data[key]) {
    console.error(`Missing --${key}`);
    process.exit(1);
  }
}

const score = Number(data.score);
if (!Number.isFinite(score) || score <= 0) {
  console.error('--score must be a positive number');
  process.exit(1);
}

const payload = {
  province: String(data.province),
  score,
  gender: String(data.gender),
  family: String(data.family),
};
if (data.extra) payload.extra = String(data.extra);
if (data.rank) payload.rank = Number(data.rank);
if (data.subjects) payload.subjects = String(data.subjects);

mkdirSync('data', { recursive: true });
const out = resolve('data/current-run.json');
writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`);
console.log(out);
