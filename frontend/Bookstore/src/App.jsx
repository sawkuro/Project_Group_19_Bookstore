import { useEffect, useState } from "react";
import { seedBooks } from "./data/books";
import CatalogPage from "./pages/CatalogPage";
import BookDetailPage from "./pages/BookDetailPage";
import WishlistPage from "./pages/WishlistPage";
import "./App.css";

function App() {
	const [books, setBooks] = useState(seedBooks);
	const [page, setPage] = useState("catalog");
	const [selectedId, setSelectedId] = useState(null);
	const [wishlist, setWishlist] = useState(() =>
		JSON.parse(localStorage.getItem("bookshop-wishlist") || "[]"),
	);
	const [notice, setNotice] = useState("");

	useEffect(() => {
		fetch("/api/books")
			.then((response) => (response.ok ? response.json() : null))
			.then((data) => {
				if (Array.isArray(data) && data.length) setBooks(data);
			})
			.catch(() => {});
	}, []);

	useEffect(() => {
		localStorage.setItem("bookshop-wishlist", JSON.stringify(wishlist));
	}, [wishlist]);

	function toggleWishlist(id) {
		const wasSaved = wishlist.includes(id);
		setWishlist((current) =>
			current.includes(id)
				? current.filter((item) => item !== id)
				: [...current, id],
		);
		setNotice(
			wasSaved
				? "Removed from your reading list"
				: "Added to your reading list",
		);
		window.setTimeout(() => setNotice(""), 2200);
	}

	function navigate(nextPage) {
		setPage(nextPage);
		if (nextPage !== "detail") setSelectedId(null);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function openBook(id) {
		setSelectedId(id);
		navigate("detail");
	}

	const selectedBook = books.find((book) => book.id === selectedId);

	return (
		<div className="app-shell min-vh-100 d-flex flex-column">
			<div className="announcement text-center py-2">
				<span className="announcement-dot" /> Find your next chapter{" "}
				<span className="announcement-arrow">✦</span>
			</div>
			<header className="site-header container-fluid py-3">
				<div className="row align-items-center">
				<div className="col">
				<button
					className="wordmark"
					onClick={() => navigate("catalog")}
					aria-label="Novel home"
				>
					<span className="wordmark-icon">n</span>
					<span>
						novel<span className="wordmark-period">.</span>
					</span>
				</button>
				</div>
				<nav
					className="main-nav col-auto d-flex gap-3"
					aria-label="Main navigation"
				>
					<button
						className={page === "catalog" ? "nav-active" : ""}
						onClick={() => navigate("catalog")}
					>
						Discover
					</button>
					<button
						className={page === "wishlist" ? "nav-active" : ""}
						onClick={() => navigate("wishlist")}
					>
						Reading list <span className="nav-count">{wishlist.length}</span>
					</button>
				</nav>
				<div className="col d-flex justify-content-end"><button
					className="header-note"
					onClick={() => navigate("wishlist")}
				>
					<span className="header-note-icon">♡</span>
					<span>
						Your next favorite
						<br />
						<strong>is waiting.</strong>
					</span>
					<span className="header-note-arrow">↗</span>
				</button></div>
				</div>
			</header>
			<main className="flex-grow-1">
				{page === "catalog" && (
					<CatalogPage
						books={books}
						wishlist={wishlist}
						onOpen={openBook}
						onToggle={toggleWishlist}
					/>
				)}
				{page === "detail" && (
					<BookDetailPage
						book={selectedBook}
						wishlist={wishlist}
						onBack={() => navigate("catalog")}
						onToggle={toggleWishlist}
					/>
				)}
				{page === "wishlist" && (
					<WishlistPage
						books={books}
						wishlist={wishlist}
						onOpen={openBook}
						onToggle={toggleWishlist}
						onDiscover={() => navigate("catalog")}
					/>
				)}
			</main>
			<footer className="site-footer container-fluid py-3 mt-auto">
				<div className="row align-items-center">
				<div className="col">
				<button
					className="wordmark footer-mark"
					onClick={() => navigate("catalog")}
				>
					<span className="wordmark-icon">n</span>
					<span>
						novel<span className="wordmark-period">.</span>
					</span>
				</button></div>
				<div className="col text-end"><span className="footer-right">Novel 2026</span></div>
				</div>
			</footer>
			{notice && (
				<div
					className="toast"
					role="status"
				>
					{notice}
				</div>
			)}
		</div>
	);
}

export default App;
