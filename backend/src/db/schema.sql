CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  publication_year INTEGER NOT NULL CHECK (publication_year > 0),
  rating NUMERIC(2, 1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  price NUMERIC(8, 2) NOT NULL CHECK (price >= 0),
  cover TEXT NOT NULL DEFAULT 'midnight',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS books_title_idx ON books (LOWER(title));
CREATE INDEX IF NOT EXISTS books_author_idx ON books (LOWER(author));
CREATE INDEX IF NOT EXISTS books_genre_idx ON books (LOWER(genre));
