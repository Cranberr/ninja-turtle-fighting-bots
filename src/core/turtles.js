'use strict';

const TURTLES = [
  { name: 'Leonardo.exe', weapon: 'twin katanas', hp: 100, power: 12, catchphrase: 'Merging with approval only.' },
  { name: 'Donatello.js', weapon: 'bo staff of 47 dependencies', hp: 95, power: 11, catchphrase: 'It works on my machine.' },
  { name: 'RaphaelBot', weapon: 'angry sai', hp: 105, power: 13, catchphrase: 'git push --force!' },
  { name: 'Michelangelo404', weapon: 'nunchucks (pizza not found)', hp: 100, power: 10, catchphrase: 'Cowabunga, dude!' },
];

const cloneTurtles = () => TURTLES.map((t) => ({ ...t, maxHp: t.hp, stunned: false }));

module.exports = { TURTLES, cloneTurtles };
