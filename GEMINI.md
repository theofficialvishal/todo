# TodoApp Project Guide

> This file provides essential project context, architecture, technology choices,
> folder structure, development commands, and coding conventions for AI coding
> assistants and developers working on the **TodoApp** repository.

---

## 1. Project Overview

**TodoApp** is a clean, modern, beginner-friendly full-stack task management application built as a learning project to master full-stack web development.

### Purpose

Provide an end-to-end full-stack web application demonstrating the complete request-response flow: React SPA frontend → REST API endpoints → Express backend → MongoDB database.

### Target Users

Developers and learners wanting to understand full-stack JavaScript architecture, REST API design, state management, and database operations.

### Core Capabilities

- **Task Management (CRUD)**: Create, view, edit, complete (toggle status), and delete tasks.
- **Categorization & Importance**: Organize tasks by categories (Work, Personal, Shopping, Learning) and flag important tasks.
- **Filtering & Search**: Filter tasks by status (All, Active/In Progress, Completed), category list, or search text query.
- **Summary Metrics**: View live counters for Total Tasks, Completed, In Progress, and Important tasks.
- **Responsive & Dynamic UI**: Light/Dark theme toggling, clean card layout, toast notifications, and responsive mobile bottom navigation.

---

## 2. Tech Stack

- **Language / Runtime**: JavaScript (ES6+ / Node.js 18+)
- **Backend Framework**: Express.js
- **Frontend Framework**: React 18+ (via Vite)
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React (`lucide-react`)
- **Database**: MongoDB
- **ORM / Data Access**: Mongoose ODM
- **API Style**: RESTful JSON over HTTP
- **HTTP Client**: Axios (or native Fetch API)
- **Build Tool**: Vite (Frontend)
- **Package Manager**: npm
- **Dev Workflow Tools**: Nodemon (backend auto-reload), Concurrently (running client & server simultaneously)

---

## 3. Directory & Folder Structure

```text
TODO/
├── client/                           # React Frontend (Vite + Tailwind CSS)
│   ├── public/                       # Static public assets
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Header.jsx            # Top header with search, theme toggle, and greeting
│   │   │   ├── Sidebar.jsx           # Category and filter navigation
│   │   │   ├── StatCards.jsx         # Summary cards (Total, Completed, In Progress, Important)
│   │   │   ├── TaskList.jsx          # List container for task items
│   │   │   ├── TaskItem.jsx          # Individual task row item
│   │   │   ├── TaskModal.jsx         # Create/Edit task modal dialog
│   │   │   └── Toast.jsx             # Action feedback notifications
│   │   ├── context/
│   │   │   └── ThemeContext.jsx      # Light / Dark theme state provider
│   │   ├── services/
│   │   │   └── todoService.js        # API service layer (Axios API calls)
│   │   ├── App.jsx                   # Main layout and view container
│   │   ├── index.css                 # Tailwind directives and custom design tokens
│   │   └── main.jsx                  # React application entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                           # Express Backend (Node.js + MongoDB)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection setup via Mongoose
│   │   ├── controllers/
│   │   │   └── todoController.js     # Route controller logic for Todos CRUD
│   │   ├── models/
│   │   │   └── Todo.js               # Mongoose Todo schema definition
│   │   ├── routes/
│   │   │   └── todoRoutes.js         # REST API endpoint routes (/api/todos)
│   │   ├── middleware/
│   │   │   └── errorHandler.js       # Express centralized error handling middleware
│   │   └── server.js                 # Server entry point and middleware configuration
│   ├── .env.example                  # Environment variable template
│   └── package.json
│
├── design/
│   └── ChatGPT Image Sep 3, 2026, 10_05_41 AM.png   # Approved UI design reference image
│
├── GEMINI.md                         # Project source of truth guide
└── package.json                      # Root package configuration for concurrent running
```

### Important Directories

- `client/src/components/` — UI presentation components and state management.
- `client/src/services/` — Asynchronous API service calls communicating with backend REST endpoints.
- `server/src/controllers/` — Request handlers encapsulating business logic for REST endpoints.
- `server/src/models/` — Data schemas defining document structures stored in MongoDB.
- `server/src/routes/` — Endpoint definitions linking HTTP paths and methods to controllers.

---

## 4. Common Commands & Workflows

### Setup & Installation

```bash
# Install all dependencies (root, client, and server)
npm run install:all

# Or install manually per directory:
cd server && npm install
cd ../client && npm install
```

### Development

```bash
# Run both client (Vite) and server (Nodemon) concurrently from project root
npm run dev

# Run backend server only
npm run dev:server

# Run frontend client only
npm run dev:client
```

### Production Build

```bash
# Build frontend client for production
cd client && npm run build
```

---

## 5. Architecture & Design Patterns

### High-Level Monolithic REST Architecture

```text
┌──────────────────────────────────────────────────────────┐
│                   React Frontend (Vite)                   │
│  - Presentation Components (TaskList, Sidebar, Header)  │
│  - State Management & Custom Hooks                        │
│  - API Client Layer (services/todoService.js)             │
└────────────────────────────┬─────────────────────────────┘
                             │ HTTP / REST (JSON)
                             ▼
┌──────────────────────────────────────────────────────────┐
│                 Express Backend (Node.js)                │
│  - CORS & Body Parser Middleware                         │
│  - Routes (/api/todos)                                   │
│  - Controllers (todoController.js)                       │
│  - Error Handling Middleware                             │
└────────────────────────────┬─────────────────────────────┘
                             │ Mongoose ODM
                             ▼
┌──────────────────────────────────────────────────────────┐
│                     MongoDB Database                     │
│  - Database: todo_db                                     │
│  - Collection: todos                                     │
└────────────────────────────┴─────────────────────────────┘
```

### Layer Responsibilities

1. **Client Layer**: Manages user interaction, renders UI state, sends asynchronous HTTP requests, handles loading/error feedback.
2. **Controller Layer**: Extracts request parameters/body, executes CRUD operations via Mongoose, handles errors, and returns JSON responses with HTTP status codes.
3. **Data Access Layer**: Mongoose schema (`Todo.js`) enforces field validation (title required, default category, boolean completion status).

### Architectural Rules

- Keep business logic inside controllers or service modules, not in route definition files.
- Return consistent JSON response structures from API endpoints (e.g., `{ success: true, data: [...] }`).
- Never perform direct database calls inside React frontend components; all database operations must go through the Express API layer.

---

## 6. Data & Storage

### Database Schema (`todos` collection)

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | — | Unique identifier generated by MongoDB |
| `title` | String | Yes | — | Short title of the task |
| `description` | String | No | `""` | Detailed notes or summary |
| `completed` | Boolean | No | `false` | Completion status flag |
| `important` | Boolean | No | `false` | Starred/important task flag |
| `category` | String | No | `"Personal"` | Category (`"Work"`, `"Personal"`, `"Shopping"`, `"Learning"`) |
| `dueDate` | Date | No | `null` | Target completion date |
| `createdAt` | Date | Auto | `Date.now` | Creation timestamp |
| `updatedAt` | Date | Auto | `Date.now` | Last update timestamp |

### Important Data Rules

- Data persistence relies entirely on MongoDB.
- All IDs exposed to client are strings representing `_id`.

---

## 7. Authentication & Authorization

### Authentication

- **Not Applicable** for current scope. The application is intentionally single-user for beginner full-stack learning clarity.

### Authorization & Ownership

- All tasks in the MongoDB collection belong to the global application pool.

---

## 8. UI & Design Conventions

### Visual Language

- **Personality**: Clean, modern, productive, organized.
- **Surface Style**: White/Dark cards, soft borders (`border-slate-200` / `border-slate-800`), subtle shadow elevation (`shadow-sm`, `shadow-md`).
- **Shape Language**: Rounded corners (`rounded-lg` 8px to `rounded-xl` 14px), rounded buttons.

### Visual Reference

**Approved Reference Image**: `design/ChatGPT Image Sep 3, 2026, 10_05_41 AM.png`

Treat reference as visual direction for layout composition, metric cards, sidebar structure, color palette, task item formatting, and light/dark contrast.

### Design Tokens

#### Colors

| Role | Token / Tailwind Class | Hex / Value |
|---|---|---|
| Primary | `indigo-500` | `#6366F1` |
| Primary Hover | `indigo-600` | `#4F46E5` |
| Background (Light) | `slate-50` | `#F8FAFC` |
| Surface / Card (Light) | `white` | `#FFFFFF` |
| Background (Dark) | `slate-900` | `#0F172A` |
| Text Primary | `slate-900` | `#0F172A` |
| Text Secondary | `slate-500` | `#64748B` |
| Border | `slate-200` | `#E2E8F0` |
| Success | `emerald-500` | `#22C55E` |
| Warning | `amber-500` | `#F59E0B` |
| Danger | `red-500` | `#EF4444` |
| Info | `blue-500` | `#3B82F6` |

#### Typography

- **Font Family**: Inter, sans-serif
- Display: `text-3xl font-bold`
- Heading 1: `text-2xl font-semibold`
- Heading 2: `text-xl font-semibold`
- Body Large: `text-base font-normal`
- Body: `text-sm font-normal`
- Small / Caption: `text-xs font-normal`

#### Border Radius

| Role | Tailwind Class | Value |
|---|---|---|
| Small | `rounded-md` | `6px` |
| Medium | `rounded-lg` | `10px` |
| Large | `rounded-xl` | `14px` |
| Pill | `rounded-full` | `9999px` |

### Components & Interaction

- **Buttons**: Primary indigo button with subtle hover transition (`transition-colors duration-150`).
- **Inputs**: Text inputs with focus ring (`focus:ring-2 focus:ring-indigo-500`).
- **Toasts**: Floating temporary notification popups for success/error feedback.
- **Empty States**: Clear messaging when list is empty ("No tasks yet! Add a task to get started").

---

## 9. Coding Standards & Guidelines

### JavaScript / Node.js

- Use modern ES6+ syntax (`const`/`let`, arrow functions, async/await).
- Use proper HTTP status codes:
  - `200 OK` — Successful fetch, update, delete
  - `201 Created` — Successful resource creation
  - `400 Bad Request` — Validation errors / missing fields
  - `404 Not Found` — Resource missing
  - `500 Internal Server Error` — Server exception
- Handle asynchronous operations cleanly using `try/catch` blocks and pass errors to Express `next(err)`.

### React / UI

- Component names in PascalCase (`TaskItem.jsx`, `StatCards.jsx`).
- Utility functions / services in camelCase (`todoService.js`).
- Prefer functional components with React Hooks (`useState`, `useEffect`, `useContext`).
- Keep components small and focused on a single presentation responsibility.

---

## 10. Git Commit Conventions

Standard semantic commit message format:

```text
feat: add todo creation modal component
fix: resolve MongoDB connection retry handling
docs: update API setup instructions
style: refine light/dark mode color tokens
```

---

## 11. Testing Conventions

- **Manual API Testing**: Use Postman, Bruno, or VS Code REST Client to test endpoints (`GET /api/todos`, `POST /api/todos`, `PUT /api/todos/:id`, `DELETE /api/todos/:id`).
- **Frontend State Verification**: Ensure UI updates immediately or re-fetches after mutations.

---

## 12. Environment & Configuration

### Environment Variables (`server/.env`)

| Variable | Purpose | Required | Default / Example |
|---|---|---|---|
| `PORT` | Express backend server port | No | `5000` |
| `MONGODB_URI` | MongoDB connection connection string | Yes | `mongodb://localhost:27017/todo_db` |
| `CLIENT_URL` | Allowed CORS origin for frontend | No | `http://localhost:5173` |

> **Security Rule**: Never commit `.env` files to git. Include a clean `.env.example`.

---

## 13. Protected Files & Areas

- `design/ChatGPT Image Sep 3, 2026, 10_05_41 AM.png` — Visual reference asset; must not be removed or overwritten.

---

## 14. Project Invariants

1. All data changes must persist to MongoDB via backend REST API routes.
2. The application architecture must remain single-service client-server monolith without unrequested infrastructure complexity.
3. No secrets or connection credentials must ever be hardcoded into source code or committed to git.
4. Primary color system and UI layout must maintain consistency with the approved design reference.

---

## 15. Current Project Status

### Current Phase

Initialization Complete (Architecture & GEMINI.md established).

### Current Focus

Setting up root project directory structure, `client` React app with Tailwind CSS, and `server` Express backend with Mongoose.

---

## 16. Documentation & Source of Truth

Use the following priority when information conflicts:

1. Explicit user requirements for the current task
2. This `GEMINI.md` file for project-wide conventions and architecture
3. Existing implementation and code
4. Visual design reference (`design/ChatGPT Image Sep 3, 2026, 10_05_41 AM.png`)

---

## 17. AI Development Rules

AI coding assistants working in this repository must:

- Read `GEMINI.md` before making architectural or implementation decisions.
- Follow the documented technology stack (React, Tailwind CSS, Express, MongoDB/Mongoose).
- For UI work, align with the documented design tokens and visual reference image.
- Avoid adding unneeded dependencies or infrastructure abstractions.
- Validate changes by verifying client and server workflows.
