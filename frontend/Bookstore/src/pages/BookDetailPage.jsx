import BookCover from "../components/BookCover";

export default function BookDetailPage({ book, wishlist, onBack, onToggle }) {
	if (!book)
		return (
			<section className="empty-state">
				<h3>That book wandered off</h3>
				<button
					className="text-button"
					onClick={onBack}
				>
					Back to the shelf
				</button>
			</section>
		);
	const saved = wishlist.includes(book.id);
	return (
		<section className="detail-section container py-4 py-md-5">
			<button
				className="back-link btn btn-link px-0"
				onClick={onBack}
			>
				← Back to the catalog
			</button>
			<div className="detail-layout row g-4 g-lg-5 align-items-center">
				<div className="detail-art-wrap col-12 col-md-5 d-flex align-items-center justify-content-center">
					<BookCover
						book={book}
						large
					/>
				</div>
				<div className="detail-copy col-12 col-md-7">
					<span className="eyebrow">
						<span className="eyebrow-line" /> {book.genre.toUpperCase()}{" "}
						<span className="detail-dot">·</span> {book.year}
					</span>
					<h1>{book.title}</h1>
					<p className="detail-byline">
						Written by <strong>{book.author}</strong>
					</p>
					<div className="detail-rating">
						<span>★ ★ ★ ★ ★</span>
						<strong>{Number(book.rating).toFixed(1)}</strong>
						<small> reader rating</small>
					</div>
					<p className="detail-description">{book.description}</p>
					<div className="detail-meta">
						<div>
							<span>FIRST PUBLISHED</span>
							<strong>{book.year}</strong>
						</div>
						<div>
							<span>Genre</span>
							<strong>{book.genre}</strong>
						</div>
						<div>
							<span>Our Price</span>
							<strong>${Number(book.price).toFixed(2)}</strong>
						</div>
					</div>
					<button
						className={`detail-save btn${saved ? " detail-saved" : ""}`}
						onClick={() => onToggle(book.id)}
					>
						{saved ? "♥  Saved to your wish list" : "♡  Add to your wish list"}
					</button>
					<p className="detail-footnote">
						Save it here to find it easily again.
					</p>
				</div>
			</div>
		</section>
	);
}
