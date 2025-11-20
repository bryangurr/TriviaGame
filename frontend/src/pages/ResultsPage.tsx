// ResultsPage.tsx
import { useLocation, useNavigate } from "react-router-dom";

type ResultsState = { score: number; total: number };

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: ResultsState | null };

  const score = state?.score ?? 0;
  const total = state?.total ?? 0;
  const pct = total ? Math.round((score / total) * 100) : 0;

  return (
    <div className="container mt-5 text-center">
      <h2>Results</h2>
      <p className="fs-4 mt-3">
        Congratulations! You got <strong>{score}</strong> out of{" "}
        <strong>{total}</strong> correct ({pct}%).
      </p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Play Again
      </button>
    </div>
  );
}
