import { useMemo, useState } from "react";
import BookGrid from "../components/BookGrid";

export default function CatalogPage({ books, wishlist, onOpen, onToggle }) {
	const [query, setQuery] = useState("");
	const [genre, setGenre] = useState("All books");
	const [sort, setSort] = useState("Featured");
	const genres = ["All books", ...new Set(books.map((book) => book.genre))];
	const visibleBooks = useMemo(() => {
		const term = query.trim().toLowerCase();
		const result = books.filter(
			(book) =>
				(genre === "All books" || book.genre === genre) &&
				(!term ||
					`${book.title} ${book.author} ${book.genre}`
						.toLowerCase()
						.includes(term)),
		);
		if (sort === "Top rated") result.sort((a, b) => b.rating - a.rating);
		if (sort === "Newest") result.sort((a, b) => b.year - a.year);
		if (sort === "Title A–Z")
			result.sort((a, b) => a.title.localeCompare(b.title));
		return result;
	}, [books, genre, query, sort]);
	const clearSearch = () => {
		setQuery("");
		setGenre("All books");
	};

	return (
		<>
			<section className="hero-section">
				<div className="hero-copy">
					<span className="eyebrow">
						<span className="eyebrow-line" /> YOUR NEXT CHAPTER STARTS HERE
					</span>
					<h1>Find a book</h1>
					<p className="hero-description">
						Follow the clouds to a new world. Browse, wonder, and see where the
						next page takes you.
					</p>
					<button
						className="hero-cta"
						onClick={() =>
							document
								.getElementById("shelf")
								?.scrollIntoView({ behavior: "smooth" })
						}
					>
						Explore our catalogue <span>↓</span>
					</button>
				</div>
			</section>
			<section
				className="shelf-section"
				id="shelf"
			>
				<div className="section-heading">
					<div>
						<span className="eyebrow">
							<span className="eyebrow-line" /> Popular Books
						</span>
						<h2>
							<em>Explore</em> our shelf.
						</h2>
					</div>
					<span className="book-count">
						{visibleBooks.length} BOOKS TO EXPLORE
					</span>
				</div>
				<div className="catalog-toolbar">
					<label className="search-box">
						<span>⌕</span>
						<input
							aria-label="Search books"
							placeholder="Title, Genere, Author"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
						/>
					</label>
					<div className="toolbar-right">
						<label className="sort-control">
							<span>Sort</span>
							<select
								aria-label="Sort books"
								value={sort}
								onChange={(event) => setSort(event.target.value)}
							>
								<option>Featured</option>
								<option>Top rated</option>
								<option>Newest</option>
								<option>Title A–Z</option>
							</select>
						</label>
					</div>
				</div>
				<div
					className="genre-row"
					aria-label="Filter by genre"
				>
					{genres.map((item) => (
						<button
							key={item}
							className={`genre-chip${genre === item ? " chip-active" : ""}`}
							onClick={() => setGenre(item)}
						>
							{item}
						</button>
					))}
				</div>
				<BookGrid
					items={visibleBooks}
					wishlist={wishlist}
					onOpen={onOpen}
					onToggle={onToggle}
					onClear={clearSearch}
				/>
			</section>
		</>
	);
}
