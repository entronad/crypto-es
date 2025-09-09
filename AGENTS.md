# Repository Guidelines

This guide outlines how to build, test, and contribute to this TypeScript crypto library.

## Project Structure & Module Organization
- `src/` — library source (e.g., `aes.ts`, `sha256.ts`, `mode-ctr.ts`, `pad-ansix923.ts`); public API re-exported from `src/index.ts`.
- `__tests__/` — Vitest specs named `*.test.ts` (e.g., `aes.test.ts`).
- `dist/` — build output (ESM `*.mjs`, CJS `*.cjs`, types). Do not edit.
- Config: `tsconfig.json`, `tsdown.config.ts`, `vitest.config.ts`.

## Build, Test, and Development Commands
- `npm run dev` — watch build for local development.
- `npm run build` — compile with tsdown (ESM+CJS+d.ts) into `dist/`.
- `npm run clean` — remove `dist/`.
- `npm run test` | `test:watch` | `test:coverage` — run Vitest, watch mode, or coverage report.
- `npm run typecheck` — strict TypeScript checking without emit.
- `npm run check` — type check + run tests; use before PRs.

## Coding Style & Naming Conventions
- Language: TypeScript (Node ≥ 18), ESM-first with dual outputs.
- Files: lowercase kebab-case (e.g., `ripemd160.ts`, `mode-ecb.ts`).
- Exports: named PascalCase for classes/functions; algorithms also expose `...Algo` variants (e.g., `SHA256Algo`, `SHA256`, `HmacSHA256`).
- Formatting: 2-space indent, semicolons, single quotes. Keep modules focused and side-effect free.

## Testing Guidelines
- Place tests in `__tests__/` with `*.test.ts`. Use clear, deterministic vectors (no flaky randomness).
- Run `npm run test:coverage`; aim to maintain or improve coverage.
- Prefer Vitest globals (`describe`, `it`, `expect`). If adding features, include positive/edge cases and browser/Node-agnostic usage when relevant.

## Commit & Pull Request Guidelines
- Commits: imperative mood and concise (e.g., "add SHA3 sponge optimizations"). Conventional prefixes (`feat:`, `fix:`, `chore:`) are welcome but not required.
- PRs: include a summary, rationale, validation steps (commands/output), and linked issues. Add/adjust tests and docs as needed.
- Before opening a PR: `npm run check` must pass. If adding a module, export it in `src/index.ts` and keep filenames consistent.

## Security & Compatibility Tips
- Keep code runtime-agnostic (`platform: 'neutral'`): avoid Node-only APIs and dynamic `eval`.
- Do not log or embed secrets/keys in code or tests.
- Use fixed IVs/seeds only in tests; production examples must follow best practices.
