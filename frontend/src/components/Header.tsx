import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-primary text-white py-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0">Trivia Trek</h1>
        <nav>
          <Link to="/" className="text-white text-decoration-none mx-2">
            Home
          </Link>
          <Link to="/game" className="text-white text-decoration-none mx-2">
            Play
          </Link>
        </nav>
      </div>
    </header>
  );
}
