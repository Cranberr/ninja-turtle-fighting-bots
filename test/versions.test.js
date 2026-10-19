'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { v1, v2, v3 } = require('../src');
const { TURTLES } = require('../src/core/turtles');

const names = TURTLES.map((t) => t.name);
const silence = (fn) => {
  const orig = console.log;
  console.log = () => {};
  try { return fn(); } finally { console.log = orig; }
};

test('v1 returns a known winner', () => {
  const w = silence(() => v1.run({ seed: 42, quiet: true }));
  assert.ok(names.includes(w.name));
});

test('v2 returns a known winner', () => {
  const w = silence(() => v2.run({ seed: 42, quiet: true }));
  assert.ok(names.includes(w.name));
});

test('v3 tournament is reproducible', () => {
  const a = silence(() => v3.run({ seed: 99, quiet: true }));
  const b = silence(() => v3.run({ seed: 99, quiet: true }));
  assert.strictEqual(a.champion, b.champion);
  assert.strictEqual(a.board.length, 4);
});
