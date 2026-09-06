# Spec: Project Setup and Monorepo Foundation

## Overview

Establish the baseline full-stack workspace structure for **TodoApp**, setting up the `server` (Node.js + Express) and `client` (React + Vite + Tailwind CSS) applications alongside root orchestration scripts. This session provides the development foundation, server boilerplate, styling configurations, and dependency definitions necessary for all subsequent feature sessions.

---

## Feature Summary

- Initialize root workspace configuration with dual-server development scripts (`concurrently`).
- Scaffold Express backend application inside `server/` with CORS, JSON body-parser, and environment configuration.
- Scaffold React single-page application inside `client/` powered by Vite, Tailwind CSS v3, Lucide React icons, and Axios.
- Configure root `.gitignore` to prevent committing `node_modules`, build output, or sensitive environment files.

---

## Depends On

None.

---

## Non Goals

- MongoDB database connection or Mongoose schema setup (scheduled for Session 02).
- REST API CRUD endpoints for todos (scheduled for Session 03).
- Full dashboard UI components, sidebar filters, or modal dialogs (scheduled for Sessions 04–08).

---

## Acceptance Criteria

- [ ] Root `package.json` exists with scripts `install:all`, `dev`, `dev:server`, and `dev:client`.
- [ ] `server/package.json` exists with dependencies `express`, `cors`, `dotenv` and devDependency `nodemon`.
- [ ] `server/src/server.js` starts an Express server listening on `PORT` (default `5000`) with CORS and `express.json()` middleware active.
- [ ] `server/.env.example` provides default configuration values for `PORT`, `MONGODB_URI`, and `CLIENT_URL`.
- [ ] `client/package.json` exists with dependencies `react`, `react-dom`, `lucide-react`, `axios` and devDependencies `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`.
- [ ] `client/tailwind.config.js` and `client/src/index.css` correctly process Tailwind CSS utility directives.
- [ ] Vite client dev server runs on port `5173` rendering a placeholder `App.jsx` layout.
- [ ] Executing `npm run dev` at project root concurrently launches both client and server development servers without errors.

---

## API / Routes

| Method / Type | Route / Interface | Access | Purpose |
|---|---|---|---|
| GET | `/` | Public | Server boilerplate health check ping returning JSON status message |

---

## Data / Storage Changes

No data or storage changes.

---

## UI Changes

Basic foundation UI setup in `client/`:
- `client/index.html` configured with Inter font and application title "TodoApp".
- `client/src/App.jsx` displaying a clean placeholder header ("TodoApp — Clean, Modern, Organized") styled with Tailwind CSS to verify Tailwind setup.

---

## Files to Modify

None.

---

## Files to Create

- `package.json`: Root package configuration with `concurrently` and project-level execution scripts.
- `.gitignore`: Workspace ignore rules for `node_modules`, `dist`, `.env`, and OS generated files.
- `server/package.json`: Express backend package configuration.
- `server/.env.example`: Environment variables template.
- `server/src/server.js`: Express application bootstrap and server entry point.
- `client/package.json`: React frontend package configuration.
- `client/vite.config.js`: Vite build configuration with React plugin.
- `client/tailwind.config.js`: Tailwind CSS content scanning and theme extensions.
- `client/postcss.config.js`: PostCSS plugin configuration for Tailwind and Autoprefixer.
- `client/index.html`: Main HTML entry document.
- `client/src/index.css`: Tailwind CSS directives and custom base styles.
- `client/src/main.jsx`: React entry point attaching `App` component to DOM.
- `client/src/App.jsx`: Main React view shell displaying boilerplate validation UI.

---

## New Dependencies

| Package | Location | Purpose |
|---|---|---|
| `concurrently` | Root | Concurrently run Vite and Nodemon scripts from root workspace |
| `express` | `server` | Web framework for Node.js REST API |
| `cors` | `server` | Cross-Origin Resource Sharing middleware |
| `dotenv` | `server` | Environment variable loader |
| `nodemon` | `server` | Server development auto-reloader |
| `react` | `client` | UI component library |
| `react-dom` | `client` | React DOM renderer |
| `vite` | `client` | Next-generation frontend build tool |
| `@vitejs/plugin-react` | `client` | Vite plugin for React JSX support |
| `tailwindcss` | `client` | Utility-first CSS styling framework |
| `postcss` | `client` | Tool for transforming CSS |
| `autoprefixer` | `client` | PostCSS plugin to parse CSS and add vendor prefixes |
| `lucide-react` | `client` | Icon library for UI elements |
| `axios` | `client` | Promise-based HTTP client |

---

## Risks

- Port conflict if port `5000` or `5173` is already occupied on local host system (Mitigation: Use `process.env.PORT` fallback in Express and standard Vite port fallback).
- Path resolution differences across Windows/POSIX shells (Mitigation: Use standard cross-platform npm script paths).

---

## Security Considerations

- CORS middleware in `server.js` configured with `origin` restriction matching `CLIENT_URL` environment variable.
- `.env` excluded from version control via `.gitignore` to prevent credential exposure.

---

## Manual Test Plan

### Happy Path
1. Run `npm run install:all` (or install dependencies in server and client).
2. Run `npm run dev` from root directory.
3. Observe terminal output: both Express server (`http://localhost:5000`) and Vite dev server (`http://localhost:5173`) start concurrently.
4. Open browser to `http://localhost:5173`: Verify placeholder TodoApp page displays cleanly with Tailwind CSS styling applied.
5. Open browser or API tool to `http://localhost:5000/`: Verify Express returns JSON ping `{ message: "TodoApp API is running" }`.

### Edge Cases
1. Missing `.env` file: Express server falls back safely to default `PORT=5000`.

---

## Rules for Implementation

- Follow `GEMINI.md` and all project-specific coding standards.
- Follow the existing project architecture and folder structure (`client/` and `server/`).
- Keep configuration minimal, clean, and explicit.
- Follow the project's documented styling (Tailwind CSS v3) and naming conventions.
- Do not introduce unrequested third-party state management libraries (e.g., Redux, Zustand) or unneeded UI frameworks.

---

## Definition of Done

- [ ] Root `package.json`, `server/package.json`, and `client/package.json` created with valid scripts and dependencies.
- [ ] Express server starts cleanly on port 5000 and responds to HTTP requests.
- [ ] Vite dev server starts cleanly on port 5173 and renders styled React placeholder.
- [ ] Tailwind CSS utility classes compile and display properly in browser.
- [ ] `.gitignore` correctly ignores `node_modules`, `client/dist`, and `.env`.
- [ ] `npm run dev` executes both servers concurrently.
