import BookCover from "./BookCover";

export default function BookGrid({
	items,
	wishlist,
	onOpen,
	onToggle,
	onClear,
}) {
	if (!items.length)
		return (
			<div className="empty-state col-12">
				<span>⌕</span>
				<h3>No books found</h3>
				<p>Try another title, author, or genre.</p>
				<button
					className="text-button"
					onClick={onClear}
				>
					Clear search
				</button>
			</div>
		);

	return (
		<div className="book-grid row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
			{items.map((book, index) => (
				<article
					className="book-card col"
					key={book.id}
					style={{ "--delay": `${index * 45}ms` }}
				>
					<div className="card h-100 border-0 bg-transparent">
						<div
							className="book-card-art card-img-top position-relative d-flex align-items-center justify-content-center"
							onClick={() => onOpen(book.id)}
							role="button"
							tabIndex={0}
							onKeyDown={(event) => event.key === "Enter" && onOpen(book.id)}
						>
							<BookCover book={book} />
							<button
								className={`save-button btn${wishlist.includes(book.id) ? " is-saved" : ""}`}
								aria-label={
									wishlist.includes(book.id)
										? "Remove from reading list"
										: "Add to reading list"
								}
								onClick={(event) => {
									event.stopPropagation();
									onToggle(book.id);
								}}
							>
								{wishlist.includes(book.id) ? "♥" : "♡"}
							</button>
						</div>
						<div className="book-card-info card-body px-0">
							<span className="book-genre">
								{book.genre} <span>·</span> {book.year}
							</span>
							<button
								className="book-title-link"
								onClick={() => onOpen(book.id)}
							>
								{book.title}
							</button>
							<p className="book-author">by {book.author}</p>
							<div className="book-card-bottom">
								<span className="rating">
									<span>★</span> {Number(book.rating).toFixed(1)}
								</span>
								<span className="book-price">
									${Number(book.price).toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}
