# CLAUDE.md

This file provides guidance for AI assistants (Claude and others) working on the **monarch_cash** project.

## Project Overview

**monarch_cash** is a tool that provides cash summaries for each account. The goal is to aggregate and display cash balance information across multiple accounts in a clear, actionable format.

- **License:** MIT
- **Author:** Misha Bolotski

## Repository Status

This project is in its initial stages. Only the LICENSE and README are present. As development begins, this file should be updated to reflect the chosen technology stack, architecture decisions, and conventions.

## Development Setup

> Update this section once a language/framework is chosen.

Expected setup steps will likely include:
1. Clone the repository
2. Install dependencies (command depends on chosen stack)
3. Configure API credentials or environment variables
4. Run the application

## Project Structure

> Update this section as the codebase grows.

Anticipated structure (adjust to match what is actually built):

```
monarch_cash/
├── CLAUDE.md          # AI assistant guidance (this file)
├── LICENSE            # MIT License
├── README.md          # Project overview
├── src/               # Source code
├── tests/             # Test suite
└── docs/              # Additional documentation
```

## Architecture & Key Conventions

### Language & Framework

Not yet determined. When chosen, document:
- Primary language (Python, TypeScript, Go, etc.)
- Framework or CLI library used
- External APIs integrated (e.g., Monarch Money API, Plaid, etc.)

### Code Style

Follow conventions for the chosen language. Common rules to enforce:
- Keep functions small and single-purpose
- Prefer explicit over implicit
- Validate inputs at system boundaries (user input, external APIs)
- Do not add error handling for scenarios that cannot happen
- Avoid premature abstractions — three similar lines is better than a wrong abstraction

### Environment Variables

Sensitive credentials (API keys, tokens) must be stored in environment variables, never committed to the repository.

When a `.env` file pattern is adopted, add `.env` to `.gitignore` immediately.

## Testing

> Update this section once a testing framework is chosen.

- All business logic should have unit tests
- Run tests before committing
- Tests live in a `tests/` directory mirroring the `src/` structure

## Git Workflow

### Branching

- `master` — stable, production-ready code
- `claude/<description>` — branches created by AI assistants for specific tasks
- Feature branches should be short-lived and merged via pull request

### Commit Messages

Use clear, descriptive commit messages in the imperative mood:

```
Add account balance aggregation logic
Fix off-by-one error in date range filter
Update README with setup instructions
```

Avoid vague messages like "fix", "update", or "wip".

### Push Instructions

Always push with tracking set:

```bash
git push -u origin <branch-name>
```

Branch names for AI-assisted work must start with `claude/`.

## Working with AI Assistants

### What to Document Here

Keep this file updated as the project evolves. Specifically update:
- Technology stack when chosen
- Architecture decisions and rationale
- Non-obvious conventions or constraints
- Commands to build, test, lint, and run the project
- Any external service integrations and how they are configured

### What AI Assistants Should Do

- Read this file at the start of every session
- Prefer editing existing files over creating new ones
- Keep changes minimal and focused on the task at hand
- Do not add features, comments, or refactoring beyond what is asked
- Commit and push changes to the designated branch when a task is complete
- Update this CLAUDE.md whenever a significant architectural or convention decision is made
