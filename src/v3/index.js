'use strict';
// v3.0: full tournament bracket, leaderboard, seeded RNG.

const { createRng } = require('../core/rng');
const { cloneTurtles } = require('../core/turtles');
const { fight } = require('../v2');

function tournament(seed, log = () => {}) {
  const rng = createRng(seed);
  const board = {};
  const bots = cloneTurtles();
  bots.forEach((b) => (board[b.name] = { wins: 0, fights: 0 }));

  // round robin: everyone fights everyone
  for (let i = 0; i < bots.length; i++) {
    for (let j = i + 1; j < bots.length; j++) {
      const [a, b] = cloneTurtles().filter((t) => t.name === bots[i].name || t.name === bots[j].name);
      const w = fight(a, b, rng);
      board[a.name].fights++;
      board[b.name].fights++;
      board[w.name].wins++;
      log(`${a.name} vs ${b.name} -> ${w.name} wins`);
    }
  }

  const ranked = Object.entries(board).sort((x, y) => y[1].wins - x[1].wins || x[0].localeCompare(y[0]));

  // final between top two
  const [fa, fb] = [ranked[0][0], ranked[1][0]].map((n) => cloneTurtles().find((t) => t.name === n));
  const champ = fight(fa, fb, rng);
  log(`FINAL: ${fa.name} vs ${fb.name} -> ${champ.name}`);
  return { board: ranked, champion: champ.name };
}

function run({ seed, quiet = false } = {}) {
  const log = quiet ? () => {} : console.log;
  log('=== v3.0 TOURNAMENT OF THE SEWERS ===');
  const result = tournament(seed, log);
  console.log('\nLeaderboard:');
  result.board.forEach(([n, s], i) => console.log(`${i + 1}. ${n} - ${s.wins}/${s.fights} wins`));
  console.log(`\nChampion: ${result.champion}. Pizza party unlocked.`);
  return result;
}

if (require.main === module) run();

module.exports = { run, tournament };
