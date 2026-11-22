## Code Style

- Use semantic HTML5 elements (header, main, section, article, etc.)
- Use modern CSS practices, Mobile-first design, CSS logical properties, and Flexbox/Grid for layout
- Use CSS Modules colocated with the component (`name.module.css`); global styles live only in `src/app/_styles/globals.css`
- Prefer modern JavaScript features like const/let, arrow functions, and template literals
- Prefer using TypeScript for type safety and better code maintainability, don't use 'any' type
- Prefer Functional Programming principles where applicable
- Prefer S.O.L.I.D. principles for Functional Programming
- Prefer functional components and React hooks for state management in React projects
- Use the `@/*` path aliases from tsconfig (`@/components`, `@/config`, `@/services`, `@/utils`, ...) instead of deep relative imports

## Naming Conventions

- Use PascalCase for component names, component folders, interfaces, and type aliases
- Use camelCase for variables, functions, methods, and module-level constants
- Reserve ALL_CAPS for rare global/service constants (e.g. `CONTENTFUL_API_URL`)
- Use kebab-case file names with a role suffix: `*.component.tsx`, `*.module.css`, `*.hook.tsx`, `*.action.ts`, `*.schema.ts`, `*.service.ts`, `*.queries.ts`, `*.types.ts`, `*.font.ts`
- No barrel `index.ts` files — import modules via direct file paths (e.g. `@/components/Bar/bar.component`)

## Code Quality

- Use meaningful variable and function names that clearly describe their purpose
- Include helpful comments for complex logic, and start comments with a capital letter (enforced by oxlint)
- Add error handling for user inputs and API calls
- Formatting and lint fixes are automated — run `pnpm fmt` and `pnpm lint:fix` instead of hand-formatting

## Next.js Context

When starting work on this Next.js project, establish context FIRST using the `next-devtools` MCP server tools:

- Call `nextjs_docs` to locate the version-accurate Next.js documentation (also vendored in `.next-docs/`, indexed above) and read the relevant guides before making changes
- Call `nextjs_index` to discover the running dev server and its runtime MCP tools (`nextjs_call` to query routes, errors, build status)

## Linting and formatting

- After making code changes, run `pnpm lint:fix`, then run `pnpm fmt`.
- Before finishing, run `pnpm exec oxlint --deny-warnings --format=agent`.
- Use the version-pinned binaries via pnpm scripts / `pnpm exec` only. Do NOT use `pnx`, `pnpm dlx`, or `npx` for oxlint/oxfmt — they resolve to the latest registry version instead of the pinned devDependencies.

## Releases

- Automated with release-please (see `.github/workflows/release-please.yml`): a `chore(main): release …` PR tracks changes on `main`; merging it tags `vX.Y.Z`, creates the GitHub Release, and updates `CHANGELOG.md` + `package.json`.
- Squash-merge PRs with a conventional-commit title — it becomes the commit on `main` that release-please parses. `feat:`/`fix:`/`perf:` (and `security:`) appear in the changelog and bump the version; `chore:`/`ci:`/`build:`/`docs:`/`style:`/`refactor:`/`test:` don't.
- Follow-ups after the first release and for 1.0.0: see comments at the top of `.github/workflows/release-please.yml`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
