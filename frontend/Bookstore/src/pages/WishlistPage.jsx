import BookGrid from "../components/BookGrid";

export default function WishlistPage({
	books,
	wishlist,
	onOpen,
	onToggle,
	onDiscover,
}) {
	const savedBooks = books.filter((book) => wishlist.includes(book.id));
	return (
		<section className="shelf-section wishlist-section container py-5">
			<div className="section-heading d-flex justify-content-between align-items-end flex-wrap gap-3">
				<div>
					<span className="eyebrow">
						<span className="eyebrow-line" /> YOUR WISH LIST
					</span>
					<h2>
						Future stories <em>here</em>
					</h2>
				</div>
				<span className="book-count">
					{savedBooks.length} BOOK{savedBooks.length === 1 ? "" : "S"} SAVED
				</span>
			</div>
			{savedBooks.length ? (
				<BookGrid
					items={savedBooks}
					wishlist={wishlist}
					onOpen={onOpen}
					onToggle={onToggle}
					onClear={() => {}}
				/>
			) : (
				<div className="empty-state">
					<span className="empty-heart">♡</span>
					<h3>Your reading list is a blank page.</h3>
					<p>
						Save a book that catches your eye, and it’ll be right here when you
						come back.
					</p>
					<button
						className="hero-cta btn btn-primary"
						onClick={onDiscover}
					>
						Find a story <span>↗</span>
					</button>
				</div>
			)}
		</section>
	);
}
