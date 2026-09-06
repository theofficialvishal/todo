# TodoApp — Project Roadmap

## Project Goal

Build a clean, modern, beginner-friendly full-stack task management application to master the complete request-response lifecycle: **React SPA Frontend → REST API Endpoints → Express Backend → MongoDB Database**.

---

## Approved Architecture

```text
┌────────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                   │
│                                                            │
│  - Presentation (Header, Sidebar, StatCards, TaskList)     │
│  - State / Context (ThemeContext)                          │
│  - API Client (services/todoService.js via Axios)          │
└─────────────────────────────┬──────────────────────────────┘
                              │
                              │ HTTP REST Requests (JSON)
                              │ e.g., GET/POST/PUT/DELETE /api/todos
                              ▼
┌────────────────────────────────────────────────────────────┐
│                  Express Backend (Node.js)                 │
│                                                            │
│  - Middleware (CORS, Express JSON Parser, Error Handler)   │
│  - Routes (/api/todos)                                     │
│  - Controllers (todoController.js)                         │
└─────────────────────────────┬──────────────────────────────┘
                              │
                              │ Mongoose ODM
                              ▼
┌────────────────────────────────────────────────────────────┐
│                      MongoDB Database                      │
│                                                            │
│  - Database: todo_db                                       │
│  - Collection: todos                                       │
└────────────────────────────────────────────────────────────┘
```

---

## Learning Goals

- **Monorepo Setup**: Structuring client and server workspaces with concurrent development tools (`concurrently`, `nodemon`).
- **Data Access & ODM**: MongoDB connection management and schema modeling with Mongoose.
- **REST API Design**: Building clean RESTful HTTP endpoints (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) with input validation and error middleware.
- **React State & Integration**: Managing asynchronous state, custom service layers, controlled forms, and reactive UI updates in React 18+.
- **Modern Styling & Responsiveness**: Implementing Tailwind CSS design tokens, light/dark theme switching, and responsive layouts matching visual design reference `design/ChatGPT Image Sep 3, 2026, 10_05_41 AM.png`.

---

## Build Strategy

> **1 Session = 1 Feature or 1 Clearly Bounded Technical Milestone**

Each session delivers a working, testable increment of the product. The progression moves logically from project setup and database models to API endpoints, UI shell, frontend integration, user actions, filtering/search, and final polish.

---

## Session Roadmap

### Session 01 — Project Setup & Monorepo Foundation

**Goal:**  
Establish the root project workspace, scaffold `client/` (React + Vite + Tailwind CSS) and `server/` (Node.js + Express), and configure concurrent local development scripts.

**Why now:**  
Provides the foundational directory structure, configuration files, and development server tooling required by all subsequent sessions.

**Prerequisites:**  
- Approved `GEMINI.md` guide.
- Installed Node.js (v18+) and npm environment.

**Frontend (`client/`):**  
- Initialize Vite + React project.
- Configure Tailwind CSS (`tailwind.config.js`, `postcss.config.js`, `index.css`).
- Install `lucide-react` for icons and `axios` for HTTP requests.

**Backend (`server/`):**  
- Initialize Node.js package (`server/package.json`).
- Install `express`, `cors`, `dotenv`, and `nodemon`.
- Create entry point `server/src/server.js` with basic CORS and body-parser middleware.

**Database:**  
- Prepare `.env.example` with `MONGODB_URI` and `PORT`.

**Infrastructure:**  
- Single-machine client-server monolith topology.

**Packages:**  
- **Root**: `concurrently` (dev)
- **Server**: `express`, `cors`, `dotenv`, `nodemon` (dev)
- **Client**: `react`, `react-dom`, `vite`, `tailwindcss`, `autoprefixer`, `postcss`, `lucide-react`, `axios`

**Testing:**  
- Verify `npm run dev` starts both Vite dev server (`http://localhost:5173`) and Express server (`http://localhost:5000`) without errors.

**Learning:**  
- Project directory organization, Vite bundler setup, Express server boilerplate, and concurrent scripts.

**Expected Outcome:**  
Both frontend and backend dev servers run concurrently and log clean startup status.

---

### Session 02 — Backend Database Connection & Todo Mongoose Model

**Goal:**  
Connect Express server to MongoDB via Mongoose, define the `Todo` schema, and implement a health check endpoint.

**Why now:**  
Data schemas and database connectivity must exist before implementing REST API CRUD routes.

**Prerequisites:**  
- Session 01 complete (Express server running).
- Running local MongoDB instance or MongoDB Atlas URI.

**Backend (`server/`):**  
- Create `server/src/config/db.js` using Mongoose `connect()`.
- Create `server/src/models/Todo.js` with fields:
  - `title` (String, required, trimmed)
  - `description` (String, default `""`)
  - `completed` (Boolean, default `false`)
  - `important` (Boolean, default `false`)
  - `category` (String, enum: `["Work", "Personal", "Shopping", "Learning"]`, default `"Personal"`)
  - `dueDate` (Date, default `null`)
  - `timestamps` (`createdAt`, `updatedAt`)
- Add `GET /api/health` endpoint for connectivity verification.
- Implement centralized error handling middleware (`server/src/middleware/errorHandler.js`).

**Database:**  
- Connect to MongoDB `todo_db` database and create schema indexes.

**Packages:**  
- **Server**: `mongoose` (runtime)

**Testing:**  
- Verify MongoDB connection log on server startup.
- Test `GET http://localhost:5000/api/health` returns `200 OK` JSON response.

**Learning:**  
- Mongoose schema design, document lifecycle, database connection error handling, Express error middleware.

**Expected Outcome:**  
Server connects cleanly to MongoDB and returns healthy status on `/api/health`.

---

### Session 03 — Todo REST API Endpoints (CRUD Controllers & Routes)

**Goal:**  
Build full RESTful API routes (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) with controller logic, request validation, and query filtering.

**Why now:**  
The backend must expose functional endpoints before building frontend data fetching logic.

**Prerequisites:**  
- Session 02 complete (`Todo` Mongoose model & database connection ready).

**Backend (`server/`):**  
- Create `server/src/controllers/todoController.js`:
  - `getTodos`: Fetch all todos with optional query filters (`category`, `completed`, `important`, `search`).
  - `createTodo`: Validate title and insert new task.
  - `updateTodo`: Update existing todo by ID.
  - `deleteTodo`: Remove todo by ID.
  - `toggleTodoStatus`: Quickly toggle `completed` boolean.
- Create `server/src/routes/todoRoutes.js` mapping HTTP paths to controllers.
- Mount routes under `/api/todos` in `server.js`.

**Testing:**  
- Perform manual API testing using curl or REST client:
  - `POST /api/todos` (Create a task)
  - `GET /api/todos` (List tasks)
  - `PUT /api/todos/:id` (Edit task)
  - `PATCH /api/todos/:id/toggle` (Toggle complete)
  - `DELETE /api/todos/:id` (Delete task)

**Learning:**  
- Controller-Route separation, RESTful conventions, Mongoose query methods (`find`, `findByIdAndUpdate`, `findByIdAndDelete`), standard API error responses.

**Expected Outcome:**  
All CRUD endpoints work correctly and return consistent `{ success: true, data: ... }` JSON structures.

---

### Session 04 — Frontend UI Design System & App Shell

**Goal:**  
Build the React presentation shell, light/dark theme provider, header, sidebar, and metric summary card placeholders matching visual reference `design/ChatGPT Image Sep 3, 2026, 10_05_41 AM.png`.

**Why now:**  
Establishes the visual layout and theme context before wiring up dynamic todo data.

**Prerequisites:**  
- Session 01 complete (React + Tailwind CSS setup ready).

**Frontend (`client/`):**  
- Build `ThemeContext.jsx` with light/dark state and `localStorage` persistence.
- Build `Header.jsx` with branding logo, search input placeholder, theme toggle button, and user greeting.
- Build `Sidebar.jsx` with category list navigation (Work, Personal, Shopping, Learning) and status filters (All, Active, Completed, Important).
- Build `StatCards.jsx` displaying summary cards (Total, Completed, In Progress, Important).
- Build main layout shell in `App.jsx` with responsive grid/flex and mobile navigation.

**Packages:**  
- Uses existing `tailwindcss`, `lucide-react`.

**Testing:**  
- Verify light/dark mode toggling alters UI colors across all cards and backgrounds.
- Verify responsive layout on desktop and mobile viewport sizes.

**Learning:**  
- React Context API, Tailwind color tokens, layout hierarchy, responsive navigation patterns.

**Expected Outcome:**  
A polished static dashboard layout adhering to the approved visual design system.

---

### Session 05 — Frontend API Integration & Todo List Display

**Goal:**  
Connect React components to backend REST endpoints via `todoService.js` to fetch and render dynamic todo items with loading and empty states.

**Why now:**  
Brings backend data to the user interface.

**Prerequisites:**  
- Session 03 complete (Backend CRUD endpoints ready).
- Session 04 complete (Frontend UI layout ready).

**Frontend (`client/`):**  
- Create `client/src/services/todoService.js` wrapping Axios REST calls.
- Build `TaskList.jsx` to manage fetch lifecycle (`loading`, `error`, `data`).
- Build `TaskItem.jsx` rendering single task row with:
  - Completion checkbox
  - Category badge (with distinct category colors)
  - Due date tag
  - Importance star icon
  - Actions menu placeholder
- Add loading skeleton component and empty state messaging ("No tasks yet! Add a task to get started").

**Testing:**  
- Verify tasks created via backend API appear dynamically on React page load.
- Verify loading skeleton and empty state when database is cleared.

**Learning:**  
- Asynchronous data fetching in React (`useEffect`, `useState`), service layer abstraction, loading/error UI states.

**Expected Outcome:**  
Frontend dynamically fetches todos from MongoDB through the Express backend and displays formatted task rows.

---

### Session 06 — Todo Creation & Editing Modal Component

**Goal:**  
Implement task creation and editing via interactive modal dialog (`TaskModal.jsx`).

**Why now:**  
Enables users to add and modify tasks directly from the user interface.

**Prerequisites:**  
- Session 05 complete (Task list display and API service ready).

**Frontend (`client/`):**  
- Build `TaskModal.jsx`:
  - Controlled inputs for `title`, `description`, `category`, `dueDate`, `important`.
  - Input validation (highlight missing title).
  - Mode switching between "Create Task" and "Edit Task".
- Connect "+ Add Task" button in `Header` and sidebar to open creation modal.
- Connect edit action on `TaskItem` to open modal pre-populated with task data.
- Trigger API call (`createTodo` / `updateTodo`) on form submit and update React state.

**Testing:**  
- Create a new task via modal and verify immediate list update.
- Edit an existing task's title/category and verify database persistence.

**Learning:**  
- React controlled components, modal dialog accessibility, form validation, optimistic UI updates vs re-fetching.

**Expected Outcome:**  
Users can seamlessly create new tasks and edit existing tasks using a clean modal overlay.

---

### Session 07 — Interactive Task Actions & Toast Notifications

**Goal:**  
Add complete interactive actions (instant completion toggle, star important toggle, delete task with confirmation) and toast feedback popups (`Toast.jsx`).

**Why now:**  
Completes individual task item interaction cycle and user feedback loops.

**Prerequisites:**  
- Session 06 complete (Create and edit workflows functional).

**Frontend (`client/`):**  
- Wire up completion checkbox in `TaskItem.jsx` to invoke `PATCH /api/todos/:id/toggle`.
- Wire up star button to toggle `important` status.
- Wire up delete action with confirm dialog triggering `DELETE /api/todos/:id`.
- Build `Toast.jsx` notification component for action feedback ("Task completed!", "Task deleted successfully!").

**Testing:**  
- Click completion checkbox: verify task styling updates immediately (strikethrough) and state persists on reload.
- Delete a task: verify removal from UI and success toast display.

**Learning:**  
- Optimistic state updates, UI feedback patterns, event propagation handling in task cards.

**Expected Outcome:**  
All individual task actions operate smoothly with instant visual feedback and toast notifications.

---

### Session 08 — Filtering, Search, & Live Metric Counters

**Goal:**  
Wire up live metrics cards and implement real-time category filtering and text search across the task list.

**Why now:**  
Elevates the task management experience from basic list views to an organized productivity dashboard.

**Prerequisites:**  
- Session 07 complete (All task CRUD operations functional).

**Frontend & Backend Integration:**  
- Calculate dynamic metric counters for `StatCards.jsx`:
  - Total Tasks
  - Completed Tasks
  - In Progress Tasks (`completed === false`)
  - Important Tasks (`important === true`)
- Connect `Sidebar` category clicks (Work, Personal, Shopping, Learning) to filter task list.
- Connect `Sidebar` status filters (All, Active, Completed, Important).
- Connect search bar in `Header` to perform real-time client/server search query filtering.

**Testing:**  
- Filter by "Work" category: verify only work tasks appear.
- Type in search bar: verify list filters matching tasks in real time.
- Verify stat counters update dynamically when tasks are added, completed, or deleted.

**Learning:**  
- Derived state in React, array filtering/searching, query parameter state management.

**Expected Outcome:**  
Filter tabs, category sidebar, search input, and summary stat cards update dynamically and accurately.

---

### Session 09 — Final Polish, Responsiveness & Verification

**Goal:**  
Perform end-to-end testing, audit mobile responsive layout, verify production build pipelines, and complete full-stack quality review.

**Why now:**  
Final verification ensures the application is bug-free, fully responsive, and ready for showcase.

**Prerequisites:**  
- Sessions 01 through 08 complete.

**Tasks:**  
- Audit visual design against reference image `design/ChatGPT Image Sep 3, 2026, 10_05_41 AM.png`.
- Verify mobile viewport responsiveness (bottom navigation, drawer toggles, modal touch targets).
- Test backend error edge cases (e.g. database connection drop, invalid IDs).
- Execute frontend production build (`npm run build` in `client/`).

**Testing:**  
- Run full manual regression check across all CRUD actions, filters, search, light/dark themes, and screen sizes.

**Learning:**  
- Production building, full-stack debugging, UI polish, edge case resilience.

**Expected Outcome:**  
A production-ready, fully functional full-stack Todo application matching design specifications.

---

## Package / Dependency Inventory

| Package | Workspace/Service | Purpose | Type | Introduced In |
|---|---|---|---|---|
| `concurrently` | Root | Run client and server simultaneously | devDependency | Session 01 |
| `express` | `server` | Web framework for REST API | runtime | Session 01 |
| `cors` | `server` | Enable cross-origin requests from client | runtime | Session 01 |
| `dotenv` | `server` | Load environment variables from `.env` | runtime | Session 01 |
| `nodemon` | `server` | Auto-restart server on file edits | devDependency | Session 01 |
| `mongoose` | `server` | MongoDB object modeling and schema validation | runtime | Session 02 |
| `react` | `client` | UI view framework | runtime | Session 01 |
| `react-dom` | `client` | DOM rendering for React | runtime | Session 01 |
| `vite` | `client` | Frontend dev server and production bundler | devDependency | Session 01 |
| `tailwindcss` | `client` | Utility-first CSS styling framework | devDependency | Session 01 |
| `autoprefixer` | `client` | PostCSS plugin for browser prefixes | devDependency | Session 01 |
| `postcss` | `client` | Tool for transforming CSS with Tailwind | devDependency | Session 01 |
| `lucide-react` | `client` | Icon system for UI elements | runtime | Session 01 |
| `axios` | `client` | HTTP client for REST API communication | runtime | Session 01 |

---

## Infrastructure Progression

- **Topology**: Single-machine client-server monolith.
- **Client**: Vite dev server on port `5173`.
- **Server**: Express Node.js process on port `5000`.
- **Database**: MongoDB running locally on `mongodb://localhost:27017/todo_db` or via cloud connection string.

---

## Authentication Progression

- **Not Applicable**: The scope is intentionally single-user to maximize clarity for learning full-stack REST API and database CRUD principles without authentication complexity.

---

## Frontend Progression

- **Session 01**: Vite + React + Tailwind CSS foundation setup.
- **Session 04**: Layout shell, ThemeContext, Header, Sidebar, StatCards presentation components.
- **Session 05**: TaskList & TaskItem component rendering dynamic backend data.
- **Session 06**: TaskModal component for task creation and editing forms.
- **Session 07**: Interactive action handlers and floating Toast feedback popup.
- **Session 08**: Client-side search, category filter integration, and live metric counts.
- **Session 09**: Mobile navigation responsiveness and final visual polish.

---

## Completion Criteria

The project is complete when:
1. Both client and server run seamlessly with `npm run dev`.
2. Tasks can be created, viewed, edited, completed, and deleted, with all changes persisting to MongoDB.
3. Summary stats, category filters, and search bar update task displays dynamically.
4. Light/Dark theme switching works flawlessly.
5. The application visuals align with reference image `design/ChatGPT Image Sep 3, 2026, 10_05_41 AM.png`.
