# Plan: Backend Database Connection and Todo Mongoose Model

## Goal

Connect the Express server to MongoDB using Mongoose ODM, define the `Todo` schema model, create a centralized error handler middleware, and expose a system health endpoint (`GET /api/health`).

## Specification

[`.agents/specs/02-backend-db-connection-and-todo-model.md`](file:///C:/Users/theof/OneDrive/Desktop/TODO/.agents/specs/02-backend-db-connection-and-todo-model.md)

## Implementation Strategy

1. **Dependency Installation**: Add `mongoose` dependency to `server/package.json` and install.
2. **Database Helper (`server/src/config/db.js`)**: Create connection function using `mongoose.connect()` logging connection status.
3. **Mongoose Model (`server/src/models/Todo.js`)**: Define `Todo` schema contract (title, description, completed, important, category, dueDate, timestamps).
4. **Error Handler (`server/src/middleware/errorHandler.js`)**: Create Express middleware to handle Mongoose and HTTP errors consistently.
5. **Server Integration (`server/src/server.js`)**: Connect to MongoDB on startup, expose `/api/health`, and attach error handler middleware.
6. **Verification**: Verify MongoDB connection logs and test `/api/health` endpoint.

---

## Tasks

### Task 1 — Add Mongoose Dependency

**Objective**  
Install `mongoose` in the `server` workspace package.

**Files / Areas**  
- `server/package.json` — Add `"mongoose": "^8.3.2"` to dependencies.

**Implementation**  
- Update `server/package.json` dependencies section.
- Run `npm install` inside `server/`.

**Depends On**  
None

**Verification**  
- `server/node_modules/mongoose` exists and `server/package.json` lists `mongoose`.

---

### Task 2 — Create MongoDB Connection Module (`server/src/config/db.js`)

**Objective**  
Create a reusable connection helper function to connect Mongoose to MongoDB.

**Files / Areas**  
- `server/src/config/db.js` — Create connection module.

**Implementation**  
- Import `mongoose`.
- Create `connectDB` async function connecting to `process.env.MONGODB_URI`.
- Log success message `[Database] MongoDB connected successfully to ${conn.connection.host}`.
- Catch connection errors, log message, and exit process gracefully or throw.

**Depends On**  
Task 1

**Verification**  
- Execute connection module test.

---

### Task 3 — Define Todo Mongoose Model (`server/src/models/Todo.js`)

**Objective**  
Define the `Todo` schema and Mongoose model conforming to the project data rules.

**Files / Areas**  
- `server/src/models/Todo.js` — Create Todo model schema.

**Implementation**  
- Import `mongoose`.
- Create `todoSchema`:
  - `title`: `{ type: String, required: [true, 'Title is required'], trim: true }`
  - `description`: `{ type: String, default: '', trim: true }`
  - `completed`: `{ type: Boolean, default: false }`
  - `important`: `{ type: Boolean, default: false }`
  - `category`: `{ type: String, enum: ['Work', 'Personal', 'Shopping', 'Learning'], default: 'Personal' }`
  - `dueDate`: `{ type: Date, default: null }`
  - `{ timestamps: true }`
- Export `mongoose.model('Todo', todoSchema)`.

**Depends On**  
Task 1

**Verification**  
- Import model in server script and verify schema instantiation.

---

### Task 4 — Create Centralized Error Handling Middleware (`server/src/middleware/errorHandler.js`)

**Objective**  
Provide Express middleware for uniform JSON error payloads.

**Files / Areas**  
- `server/src/middleware/errorHandler.js` — Create error middleware.

**Implementation**  
- Export middleware `(err, req, res, next)`:
  - Handle `CastError` (invalid ObjectId format) with status 400.
  - Handle Mongoose `ValidationError` with status 400.
  - Return status code (err.statusCode || 500) and payload `{ success: false, error: message }`.

**Depends On**  
None

**Verification**  
- Verify error handler function signature.

---

### Task 5 — Server Integration & Health Check Route (`server/src/server.js`)

**Objective**  
Wire database connection, health check route, and error handler into the Express application.

**Files / Areas**  
- `server/src/server.js` — Modify server setup.

**Implementation**  
- Import `connectDB` from `./config/db.js`.
- Import `errorHandler` from `./middleware/errorHandler.js`.
- Call `connectDB()` before or during `app.listen()`.
- Register route `GET /api/health` returning JSON `{ success: true, status: 'OK', database: 'connected' }`.
- Register `app.use(errorHandler)` as final Express middleware.

**Depends On**  
Tasks 2, 3, and 4

**Verification**  
- Run server and issue HTTP GET request to `http://localhost:5000/api/health`.

---

## Implementation Order

1. Task 1 — Add Mongoose Dependency
2. Task 2 — Create MongoDB Connection Module (`server/src/config/db.js`)
3. Task 3 — Define Todo Mongoose Model (`server/src/models/Todo.js`)
4. Task 4 — Create Centralized Error Handling Middleware (`server/src/middleware/errorHandler.js`)
5. Task 5 — Server Integration & Health Check Route (`server/src/server.js`)

---

## Files to Modify

- `server/package.json` — Add `mongoose` dependency.
- `server/src/server.js` — Integrate `connectDB()`, `/api/health` endpoint, and `errorHandler`.

---

## Files to Create

- `server/src/config/db.js` — Database connection helper.
- `server/src/models/Todo.js` — Todo schema definition.
- `server/src/middleware/errorHandler.js` — Centralized Express error handler.

---

## New Dependencies

- `mongoose`: MongoDB Object Data Modeling library.

---

## Risks & Edge Cases

- **MongoDB Service Offline**: If MongoDB is not running locally when the server starts, `connectDB()` logs an error instead of crashing silently.

---

## Validation Strategy

- Run `npm run dev:server` in `server/` to confirm clean connection log `[Database] MongoDB connected`.
- Perform GET request to `http://localhost:5000/api/health` and verify `200 OK` JSON response.

---

## Definition of Done

- [ ] `mongoose` installed in `server/package.json`.
- [ ] Connection helper `server/src/config/db.js` created.
- [ ] Mongoose schema `server/src/models/Todo.js` defined.
- [ ] Error handler `server/src/middleware/errorHandler.js` created.
- [ ] Server initializes database connection and responds to `/api/health`.
