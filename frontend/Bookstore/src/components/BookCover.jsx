export default function BookCover({ book, large = false }) {
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
