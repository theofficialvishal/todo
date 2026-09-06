# Spec: Backend Database Connection and Todo Mongoose Model

## Overview

Establish the MongoDB database connection layer for the Express backend using Mongoose ODM, define the baseline `Todo` data model schema, implement a centralized Express error handling middleware, and expose a health check route (`GET /api/health`).

---

## Feature Summary

- Connect Express backend to MongoDB (`todo_db`) via `mongoose.connect()` using environment configuration.
- Define Mongoose `Todo` model schema with validation, defaults, categories, importance flag, and automatic timestamps.
- Implement centralized Express error handler middleware (`errorHandler.js`) for uniform JSON error responses.
- Expose `/api/health` API endpoint reporting server operational state and database connection status.

---

## Depends On

Session 01 — Project Setup & Monorepo Foundation.

---

## Non Goals

- CRUD route controllers (`/api/todos` endpoints), which will be built in Session 03.
- User authentication or authorization filters.
- Database seeding or complex migration scripts.

---

## Acceptance Criteria

- [ ] `mongoose` is added to `server/package.json` dependencies and installed.
- [ ] `server/src/config/db.js` exports an async function `connectDB()` that successfully connects to `MONGODB_URI`.
- [ ] Server startup calls `connectDB()` and logs clean connection status or error handling.
- [ ] `server/src/models/Todo.js` defines and exports the `Todo` Mongoose model matching the schema contract:
  - `title`: String, required, trimmed.
  - `description`: String, default `""`, trimmed.
  - `completed`: Boolean, default `false`.
  - `important`: Boolean, default `false`.
  - `category`: String, enum: `["Work", "Personal", "Shopping", "Learning"]`, default `"Personal"`.
  - `dueDate`: Date, default `null`.
  - Timestamps: `createdAt` and `updatedAt` managed automatically by Mongoose.
- [ ] `server/src/middleware/errorHandler.js` handles runtime exceptions, Mongoose CastErrors (invalid ID format), and ValidationError, returning consistent `{ success: false, error: message }` payloads.
- [ ] Endpoint `GET /api/health` returns `200 OK` with payload detailing `{ success: true, status: "OK", database: "connected" }`.

---

## API / Routes

| Method / Type | Route / Interface | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | Public | System health check returning API state and MongoDB connection status |

---

## Data / Storage Changes

### Existing Data Structures Affected
None.

### New Data Structures
Collection `todos` in MongoDB database `todo_db`:

| Field | Type | Required | Default | Validation / Constraints |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | — | Primary key |
| `title` | String | Yes | — | Required, trimmed, non-empty |
| `description` | String | No | `""` | Trimmed string |
| `completed` | Boolean | No | `false` | Boolean completion flag |
| `important` | Boolean | No | `false` | Starred/important task flag |
| `category` | String | No | `"Personal"` | Enum: `["Work", "Personal", "Shopping", "Learning"]` |
| `dueDate` | Date | No | `null` | Target completion date |
| `createdAt` | Date | Auto | `Date.now` | Created timestamp |
| `updatedAt` | Date | Auto | `Date.now` | Last updated timestamp |

### Indexes / Performance
- Default index on `_id`.
- Index on `category` and `completed` for upcoming filtering queries.

---

## UI Changes

No UI changes.

---

## Files to Modify

- `server/package.json`: Add `mongoose` runtime dependency.
- `server/src/server.js`: Connect to MongoDB on startup, mount `/api/health` route, and register `errorHandler` middleware.

---

## Files to Create

- `server/src/config/db.js`: MongoDB connection module using Mongoose.
- `server/src/models/Todo.js`: Mongoose `Todo` schema and model definition.
- `server/src/middleware/errorHandler.js`: Centralized Express error handler middleware.

---

## New Dependencies

| Package | Location | Purpose |
|---|---|---|
| `mongoose` | `server` | Object Data Modeling (ODM) library for MongoDB and Node.js |

---

## Risks

- Database connection failure if MongoDB process is not running locally (Mitigation: Log readable error message in `connectDB()` and respond gracefully in `/api/health`).

---

## Security Considerations

- MongoDB connection string sourced strictly from `process.env.MONGODB_URI`.
- Error handler sanitizes sensitive internal stack traces in production environments.

---

## Manual Test Plan

### Happy Path
1. Start Express server using `npm run dev:server` in `server/`.
2. Observe console logs: `[Database] MongoDB connected successfully`.
3. Send GET request to `http://localhost:5000/api/health`.
4. Verify HTTP `200 OK` response with JSON `{ success: true, status: "OK", database: "connected" }`.

### Validation Errors
1. Attempt to instantiate a `Todo` model instance without a `title`: verify Mongoose validation error is caught by schema validation.

---

## Rules for Implementation

- Follow `GEMINI.md` and all project-specific coding standards.
- Keep Express middleware and Mongoose schema clean and modular.
- Do not introduce authentication middleware in this session.

---

## Definition of Done

- [ ] `mongoose` installed in `server/package.json`.
- [ ] MongoDB connection module `server/src/config/db.js` created and functional.
- [ ] `Todo` model schema created in `server/src/models/Todo.js`.
- [ ] Error handler middleware `server/src/middleware/errorHandler.js` created.
- [ ] `GET /api/health` returns healthy status and DB connection state.
