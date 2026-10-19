'use strict';

const HIT = [
  'smacks {b} with a stack overflow',
  'deploys a surprise hotfix onto {b}',
  'refactors {b} into the floor',
  'throws a null pointer at {b}',
  'rickrolls {b} into submission',
];
const MISS = [
  'swings and hits a merge conflict instead',
  'trips over an undefined variable',
  'forgets which repo they are fighting in',
];
const PIZZA = [
  'eats a slice and heals',
  'finds a deep dish in the logs',
  'downloads extra cheese',
];

const fill = (tpl, b) => tpl.replace('{b}', b);

module.exports = { HIT, MISS, PIZZA, fill };
