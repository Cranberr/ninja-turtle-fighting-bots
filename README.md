# Ninja Turtle Fighting Bots

Cowabunga! A Node.js battle simulator where four code-obsessed turtle bots fight over pizza. No dependencies, just Node 18+.

## Versions

| Version | Run | What's new |
|---|---|---|
| v1.0 | `npm run v1` | Basic brawl: random hits, pizza healing |
| v2.0 | `npm run v2` | Special moves, combos, critical hits, status effects |
| v3.0 | `npm run v3` | Tournament bracket, seeded RNG, leaderboard, CLI flags |

## Quick start

```bash
npm start -- --version 3 --seed 42
npm test
```

## CLI flags

- `--version 1|2|3` pick the engine (default 3)
- `--seed N` reproducible chaos
- `--quiet` only print the winner

## The bots

- **Leonardo.exe** the disciplined one, never skips a code review
- **Donatello.js** fights with 47 npm packages and zero confidence
- **RaphaelBot** commits straight to main, angrily
- **Michelangelo404** fight not found, but pizza found

See [CHANGELOG.md](CHANGELOG.md) for the version history.
