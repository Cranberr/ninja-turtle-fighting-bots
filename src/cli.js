#!/usr/bin/env node
'use strict';

const args = process.argv.slice(2);
const get = (flag, def) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};

const version = get('--version', '3');
const seedRaw = get('--seed');
const seed = seedRaw !== undefined ? Number(seedRaw) : undefined;
const quiet = args.includes('--quiet');

if (!['1', '2', '3'].includes(version)) {
  console.error('Unknown version. Use --version 1, 2, or 3.');
  process.exit(1);
}

require(`./v${version}`).run({ seed, quiet });
