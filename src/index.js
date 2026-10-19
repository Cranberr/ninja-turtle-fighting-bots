'use strict';

module.exports = {
  v1: require('./v1'),
  v2: require('./v2'),
  v3: require('./v3'),
  createRng: require('./core/rng').createRng,
  cloneTurtles: require('./core/turtles').cloneTurtles,
};
