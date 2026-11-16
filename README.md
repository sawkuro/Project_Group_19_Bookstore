# Novel Bookstore

A small PERN-stack bookstore project for CS 312. Phase 1 includes a React catalog, search and genre filters, book detail pages, a persistent reading list, and an Express API backed by PostgreSQL.

## Requirements

- Node.js 20.19+ or 22.12+
- PostgreSQL 14+
- npm

## Set up PostgreSQL

Create a local database named `bookstore` (for example, with `createdb bookstore` or your PostgreSQL GUI).

Copy `backend/.env.example` to `backend/.env`, then set `DATABASE_URL` to match your local PostgreSQL username and password:

```env
PORT=3001
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/bookstore
```

From the `backend` directory, install dependencies and initialize the table and sample books:

```sh
npm install
npm run db:setup
```

## Run the app

Open two terminals from the repository folder.

Terminal 1, start the API:

```sh
cd backend
npm run dev
```

Terminal 2, start the React app:

```sh
cd frontend/Bookstore
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). Vite forwards `/api` requests to the Express server at port 3001. If the API or database is not running, the catalog uses its bundled sample books so the frontend remains browseable.

## API

| Method | Path | Result |
| --- | --- | --- |
| GET | `/api/health` | API status |
| GET | `/api/books` | List books; optional `q` and `genre` query parameters |
| GET | `/api/books/:id` | Fetch one book by ID |

## Frontend checks

```sh
cd frontend/Bookstore
npm run lint
npm run build
```

## Phase 1 scope

The reading list is stored in the browser with local storage. Checkout, accounts, review submission, and server-side reading-list storage are outside the first implementation.
