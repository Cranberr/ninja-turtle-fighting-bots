'use strict';
// v2.0: special moves, critical hits, stun, combos.

const { createRng } = require('../core/rng');
const { cloneTurtles } = require('../core/turtles');
const { HIT, MISS, PIZZA, fill } = require('../core/commentary');

const SPECIALS = {
  'Leonardo.exe': { name: 'Katana Code Review', dmg: [14, 22] },
  'Donatello.js': { name: 'npm install everything', dmg: [10, 26], selfDmg: 4 },
  RaphaelBot: { name: 'Force Push Fury', dmg: [16, 24], selfDmg: 3 },
  Michelangelo404: { name: 'Pizza Nunchuck Spin', dmg: [12, 20], heal: 5 },
};

function turn(x, y, rng, log) {
  if (x.stunned) {
    x.stunned = false;
    log(`${x.name} is stunned and staring at a loading spinner`);
    return;
  }
  const roll = rng.next();
  if (roll < 0.08) {
    const heal = rng.int(4, 10);
    x.hp = Math.min(x.maxHp, x.hp + heal);
    log(`${x.name} ${rng.pick(PIZZA)} (+${heal})`);
  } else if (roll < 0.2) {
    const s = SPECIALS[x.name];
    const dmg = rng.int(...s.dmg);
    y.hp -= dmg;
    if (s.selfDmg) x.hp -= s.selfDmg;
    if (s.heal) x.hp = Math.min(x.maxHp, x.hp + s.heal);
    y.stunned = rng.chance(0.3);
    log(`${x.name} unleashes ${s.name.toUpperCase()}! (-${dmg})${y.stunned ? ' STUNNED!' : ''}`);
  } else if (roll < 0.3) {
    log(`${x.name} ${rng.pick(MISS)}`);
  } else {
    let dmg = rng.int(2, x.power);
    const crit = rng.chance(0.12);
    if (crit) dmg *= 2;
    y.hp -= dmg;
    log(`${x.name} ${fill(rng.pick(HIT), y.name)} (-${dmg}${crit ? ' CRIT' : ''})`);
  }
}

function fight(a, b, rng, log = () => {}) {
  let round = 0;
  while (a.hp > 0 && b.hp > 0 && round < 300) {
    round++;
    turn(a, b, rng, log);
    if (b.hp > 0 && a.hp > 0) turn(b, a, rng, log);
  }
  return a.hp >= b.hp ? a : b;
}

function run({ seed, quiet = false } = {}) {
  const rng = createRng(seed);
  const [a, b] = rng.next() < 0.5 ? cloneTurtles().slice(0, 2) : cloneTurtles().slice(2, 4);
  const log = quiet ? () => {} : console.log;
  log(`=== v2.0 SPECIAL MOVES: ${a.name} vs ${b.name} ===`);
  const winner = fight(a, b, rng, log);
  console.log(`Winner: ${winner.name} says "${winner.catchphrase}"`);
  return winner;
}

if (require.main === module) run();

module.exports = { run, fight, turn, SPECIALS };
