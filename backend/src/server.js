import "dotenv/config";
import cors from "cors";
import express from "express";
import pg from "pg";

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 3001);
const pool = process.env.DATABASE_URL
	? new Pool({ connectionString: process.env.DATABASE_URL })
	: null;

app.use(cors());
app.use(express.json());

function shapeBook(row) {
	return {
		id: row.id,
		title: row.title,
		author: row.author,
		genre: row.genre,
		year: row.publication_year,
		rating: Number(row.rating),
		price: Number(row.price),
		cover: row.cover,
		description: row.description,
	};
}

app.get("/api/health", (_request, response) => response.json({ status: "ok" }));

app.get("/api/books", async (request, response, next) => {
	if (!pool)
		return response
			.status(503)
			.json({
				error: "Database is not configured. Set DATABASE_URL in backend/.env.",
			});
	try {
		const { q = "", genre = "" } = request.query;
		const result = await pool.query(
			`SELECT id, title, author, genre, publication_year, rating, price, cover, description
       FROM books
       WHERE ($1 = '' OR title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1)
         AND ($2 = '' OR genre ILIKE $2)
       ORDER BY id`,
			[`%${String(q).trim()}%`, String(genre).trim()],
		);
		response.json(result.rows.map(shapeBook));
	} catch (error) {
		next(error);
	}
});

app.get("/api/books/:id", async (request, response, next) => {
	if (!pool)
		return response
			.status(503)
			.json({
				error: "Database is not configured. Set DATABASE_URL in backend/.env.",
			});
	const id = Number(request.params.id);
	if (!Number.isInteger(id) || id < 1)
		return response
			.status(400)
			.json({ error: "Book ID must be a positive integer." });
	try {
		const result = await pool.query(
			`SELECT id, title, author, genre, publication_year, rating, price, cover, description
       FROM books WHERE id = $1`,
			[id],
		);
		if (!result.rowCount)
			return response.status(404).json({ error: "Book not found." });
		response.json(shapeBook(result.rows[0]));
	} catch (error) {
		next(error);
	}
});

app.use((error, _request, response, _next) => {
	console.error(error);
	response
		.status(500)
		.json({ error: "Something went wrong while fetching books." });
});

const server = app.listen(port, () =>
	console.log(`Bookstore API listening at http://localhost:${port}`),
);

async function shutdown() {
	server.close();
	if (pool) await pool.end();
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
