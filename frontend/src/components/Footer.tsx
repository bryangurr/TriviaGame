export default function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-4 border-top">
      <p className="mb-0 text-muted">
        © {new Date().getFullYear()} Trivia Trek
      </p>
    </footer>
  );
}
