'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { createRng } = require('../src/core/rng');

test('same seed gives same sequence', () => {
  const a = createRng(7);
  const b = createRng(7);
  for (let i = 0; i < 20; i++) assert.strictEqual(a.next(), b.next());
});

test('int stays in range', () => {
  const r = createRng(1);
  for (let i = 0; i < 200; i++) {
    const n = r.int(3, 9);
    assert.ok(n >= 3 && n <= 9);
  }
});
