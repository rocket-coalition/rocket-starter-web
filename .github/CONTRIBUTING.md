# Contributing to Rocket Starter Web

## Workflow

All work happens in feature branches. Use the naming convention `feature/{topic}` (e.g., `feature/add-dark-mode`). Open a Pull Request to `main` when ready. Link PRs to Issues when applicable. All merges use squash merge to keep history clean.

## Code Standards

- Never edit `rocket-ui.css` directly (shared framework file)
- Add custom styles to `site/assets/css/input.css`
- Use semantic tokens (`var(--surface)`, `var(--fg)`) instead of hardcoded colors
- Test with `npm run dev` before committing
- Ensure theme switching works (`data-theme` attribute)

## Questions?

Open an issue or start a discussion.
