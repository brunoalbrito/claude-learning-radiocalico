# radiocalico

## Architecture

| Layer    | Technology           | Port  |
|----------|----------------------|-------|
| Frontend | Express.js (Node.js) | 3000  |
| Backend  | Flask (Python)       | 5000  |
| Database | SQLite               | —     |

Express serves the frontend only — it has no direct database access. All data goes through the Flask backend via HTTP. Flask is the sole owner of SQLite (`data/app.db`).

Express calls Flask using native `fetch` via `src/api.js`. The base URL defaults to `http://127.0.0.1:5000` and can be overridden with the `BACKEND_URL` environment variable.

## Starting the servers

Run each in a separate terminal:

**Frontend (Express):**
```
npm start
```
Use `npm run dev` for auto-restart on file changes (nodemon).

**Backend (Flask):**
```
source venv/bin/activate
python backend/app.py
```

## Database

SQLite managed exclusively by Flask. Database file: `data/app.db` (created on first run, gitignored). Python accesses it via the stdlib `sqlite3` module (`backend/database.py`).

## Project Structure

```
server.js              # Express entry point (frontend, port 3000)
src/
  api.js               # HTTP client for calling Flask backend
  routes/              # Express route handlers
backend/
  app.py               # Flask entry point (backend API, port 5000)
  database.py          # SQLite connection helper
data/                  # SQLite files (gitignored)
venv/                  # Python virtualenv (gitignored)
requirements.txt       # Python dependencies
```
