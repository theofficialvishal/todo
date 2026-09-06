# Plan: Project Setup and Monorepo Foundation

## Goal

Scaffold the root monorepo project structure, backend Express app (`server/`), frontend React app (`client/`), Tailwind CSS styling configurations, and root dev scripts (`concurrently`) to establish the baseline workspace for **TodoApp**.

## Specification

[`.agents/specs/01-project-setup-and-monorepo-foundation.md`](file:///C:/Users/theof/OneDrive/Desktop/TODO/.agents/specs/01-project-setup-and-monorepo-foundation.md)

## Implementation Strategy

We will build the workspace structure incrementally in 4 focused tasks:
1. **Workspace Root Configuration**: Set up root `package.json` with `concurrently` dev runner scripts and root `.gitignore`.
2. **Backend Server Setup (`server/`)**: Scaffold Express server package, environment variable template `.env.example`, and Express application bootstrap (`server.js`) with CORS and JSON parsing.
3. **Frontend React & Tailwind Setup (`client/`)**: Scaffold Vite React application package, Tailwind CSS + PostCSS configuration, entry HTML/CSS, and validation placeholder component (`App.jsx`).
4. **Dependency Installation & Concurrent Execution Verification**: Install dependencies across workspaces and verify concurrent dev servers (`npm run dev`).

---

## Tasks

### Task 1 — Workspace Root Configuration

**Objective**  
Create root package manifest and workspace `.gitignore` file.

**Files / Areas**  
- `package.json` — Create root workspace package manifest with execution scripts.
- `.gitignore` — Create git ignore rules for node modules, build outputs, and environment secrets.

**Implementation**  
- Create `package.json` at project root with scripts:
  - `"install:all": "npm install && cd server && npm install && cd ../client && npm install"`
  - `"dev": "concurrently \"npm run dev:server\" \"npm run dev:client\""`
  - `"dev:server": "cd server && npm run dev"`
  - `"dev:client": "cd client && npm run dev"`
  - Add `devDependencies`: `"concurrently": "^8.2.2"`.
- Create `.gitignore` ignoring:
  - `node_modules/`
  - `dist/`
  - `.env`
  - `.DS_Store`

**Depends On**  
None

**Verification**  
- Validate `package.json` syntax with `npm pkg get scripts`.

---

### Task 2 — Express Backend Setup (`server/`)

**Objective**  
Scaffold Express backend application in `server/` with CORS, JSON body-parser, environment template, and server entry point.

**Files / Areas**  
- `server/package.json` — Create backend package configuration.
- `server/.env.example` — Create environment variable template.
- `server/src/server.js` — Create Express server entry point.

**Implementation**  
- Create `server/package.json` with:
  - `"name": "todo-server"`
  - `"scripts": { "dev": "nodemon src/server.js", "start": "node src/server.js" }`
  - `"dependencies"`: `express`, `cors`, `dotenv`
  - `"devDependencies"`: `nodemon`
- Create `server/.env.example`:
  - `PORT=5000`
  - `MONGODB_URI=mongodb://localhost:27017/todo_db`
  - `CLIENT_URL=http://localhost:5173`
- Create `server/src/server.js`:
  - Configure `dotenv.config()`.
  - Initialize Express app.
  - Mount `cors()` with origin from `process.env.CLIENT_URL`.
  - Mount `express.json()`.
  - Add root route `GET /` returning `{ success: true, message: "TodoApp API is running" }`.
  - Start listening on `process.env.PORT || 5000`.

**Depends On**  
Task 1

**Verification**  
- Verify `server/src/server.js` syntax and structure.

---

### Task 3 — React Frontend & Tailwind CSS Setup (`client/`)

**Objective**  
Scaffold React SPA application in `client/` using Vite bundler, Tailwind CSS v3 styling, Lucide icons, and Axios HTTP client.

**Files / Areas**  
- `client/package.json` — Create frontend package configuration.
- `client/vite.config.js` — Create Vite build config.
- `client/tailwind.config.js` — Create Tailwind CSS config.
- `client/postcss.config.js` — Create PostCSS config.
- `client/index.html` — Create main HTML template.
- `client/src/index.css` — Create CSS with `@tailwind` directives.
- `client/src/main.jsx` — Create React DOM entry point.
- `client/src/App.jsx` — Create main App validation layout.

**Implementation**  
- Create `client/package.json` with:
  - `"name": "todo-client"`, `"type": "module"`
  - `"scripts"`: `{ "dev": "vite", "build": "vite build", "preview": "vite preview" }`
  - `"dependencies"`: `react`, `react-dom`, `lucide-react`, `axios`
  - `"devDependencies"`: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`
- Create `client/vite.config.js` configuring React plugin and port `5173`.
- Create `client/tailwind.config.js` targeting `./index.html` and `./src/**/*.{js,jsx}` with custom theme colors (`indigo-500`, `slate-900`, `slate-50`).
- Create `client/postcss.config.js` registering `tailwindcss` and `autoprefixer`.
- Create `client/index.html` loading Inter font and `<div id="root"></div>`.
- Create `client/src/index.css` with `@tailwind base; @tailwind components; @tailwind utilities;`.
- Create `client/src/main.jsx` rendering `App` into `#root`.
- Create `client/src/App.jsx` rendering a styled header ("TodoApp") and subtext ("Clean, Modern, Organized") to confirm Tailwind CSS compilation.

**Depends On**  
Task 1

**Verification**  
- Verify `client/src/App.jsx` and config file syntax.

---

### Task 4 — Dependency Installation & Verification

**Objective**  
Install npm dependencies for root, server, and client workspaces, and verify concurrent execution of dev servers (`npm run dev`).

**Files / Areas**  
- `package.json` / `server/package.json` / `client/package.json` — Dependency resolution and locking.

**Implementation**  
- Run `npm run install:all` (or install dependencies per workspace).
- Run `npm run dev` to verify concurrent server execution.
- Perform HTTP check against `http://localhost:5000/` and verify Vite server running on `http://localhost:5173`.

**Depends On**  
Tasks 1, 2, and 3

**Verification**  
- `npm run dev` launches dual servers cleanly without crash or missing package errors.

---

## Implementation Order

1. Task 1 — Workspace Root Configuration
2. Task 2 — Express Backend Setup (`server/`)
3. Task 3 — React Frontend & Tailwind CSS Setup (`client/`)
4. Task 4 — Dependency Installation & Verification

---

## Files to Modify

None.

---

## Files to Create

- `package.json` — Root workspace package configuration with `concurrently` scripts.
- `.gitignore` — Workspace git ignore rules.
- `server/package.json` — Express backend package configuration.
- `server/.env.example` — Environment template.
- `server/src/server.js` — Express entry point.
- `client/package.json` — React frontend package configuration.
- `client/vite.config.js` — Vite build configuration.
- `client/tailwind.config.js` — Tailwind CSS content & theme configuration.
- `client/postcss.config.js` — PostCSS configuration.
- `client/index.html` — HTML entry point.
- `client/src/index.css` — Tailwind directives and base styles.
- `client/src/main.jsx` — React DOM entry point.
- `client/src/App.jsx` — Validation placeholder layout.

---

## New Dependencies

- **Root**: `concurrently`
- **Server**: `express`, `cors`, `dotenv`, `nodemon` (dev)
- **Client**: `react`, `react-dom`, `lucide-react`, `axios`, `vite` (dev), `@vitejs/plugin-react` (dev), `tailwindcss` (dev), `postcss` (dev), `autoprefixer` (dev)

---

## Risks & Edge Cases

- **Port conflicts**: Port 5000 or 5173 occupied by another process on host system. (Mitigation: Use fallback environment variables).
- **PowerShell script execution**: Scripts must use standard cross-platform npm syntax.

---

## Validation Strategy

- Run `npm run install:all` to ensure all packages install without peer dependency errors.
- Run `npm run dev` to verify concurrent startup.
- Send GET request to `http://localhost:5000/` and verify `{ success: true, message: "TodoApp API is running" }`.
- Open `http://localhost:5173` and verify styled TodoApp placeholder renders in browser.

---

## Definition of Done

- [ ] `package.json`, `.gitignore`, `server/package.json`, and `client/package.json` are created and valid.
- [ ] Dependencies installed successfully in all workspaces.
- [ ] Express server starts on port 5000 and responds to GET requests.
- [ ] Vite React client starts on port 5173 and renders styled Tailwind components.
- [ ] `npm run dev` executes both servers concurrently.
