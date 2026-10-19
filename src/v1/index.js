'use strict';
// v1.0: basic brawl. Random hits, pizza healing, last bot standing.

const { createRng } = require('../core/rng');
const { cloneTurtles } = require('../core/turtles');
const { HIT, MISS, PIZZA, fill } = require('../core/commentary');

function fight(a, b, rng, log = () => {}) {
  let round = 0;
  while (a.hp > 0 && b.hp > 0 && round < 200) {
    round++;
    for (const [x, y] of [[a, b], [b, a]]) {
      if (x.hp <= 0 || y.hp <= 0) break;
      if (rng.chance(0.1)) {
        const heal = rng.int(3, 8);
        x.hp = Math.min(x.maxHp, x.hp + heal);
        log(`${x.name} ${rng.pick(PIZZA)} (+${heal})`);
      } else if (rng.chance(0.15)) {
        log(`${x.name} ${rng.pick(MISS)}`);
      } else {
        const dmg = rng.int(1, x.power);
        y.hp -= dmg;
        log(`${x.name} ${fill(rng.pick(HIT), y.name)} (-${dmg}, ${Math.max(0, y.hp)} left)`);
      }
    }
  }
  return a.hp > 0 ? a : b;
}

function run({ seed, quiet = false } = {}) {
  const rng = createRng(seed);
  const [a, b] = rng.next() < 0.5 ? cloneTurtles().slice(0, 2) : cloneTurtles().slice(2, 4);
  const log = quiet ? () => {} : console.log;
  log(`=== v1.0 BRAWL: ${a.name} vs ${b.name} ===`);
  const winner = fight(a, b, rng, log);
  console.log(`Winner: ${winner.name} says "${winner.catchphrase}"`);
  return winner;
}

if (require.main === module) run();

module.exports = { run, fight };
