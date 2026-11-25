export default function BookCover({ book, large = false }) {
	if (book.image) {
		return (
			<img 
				src={book.image}
				alt={`Cover of ${book.title}`}
				className={`book-cover book-cover-img${large ? " book-cover-large" : ""}`}
			/>
		);
	}
	
	
	
	return (
		<div
			className={`book-cover cover-${book.cover}${large ? " book-cover-large" : ""}`}
			aria-label={`Cover art for ${book.title}`}
			role="img"
		>
			<span className="cover-kicker">{book.genre}</span>
			<span className="cover-title">{book.title}</span>
			<span className="cover-author">{book.author}</span>
		</div>
	);
}
