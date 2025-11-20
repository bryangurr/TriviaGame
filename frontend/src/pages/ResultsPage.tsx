// ResultsPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

type ResultsState = { score: number; total: number };

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: ResultsState | null };

  const score = state?.score ?? 0;
  const total = state?.total ?? 0;
  const pct = total ? Math.round((score / total) * 100) : 0;
  let title = "";

  if (score < 5) {
    title = "novice";
  } else if (score < 7) {
    title = "Pro";
  } else {
    title = "Trivia Master";
  }

  return (
    <>
      <div className="container mt-5 text-center">
        <h2>Results: You are a {title}</h2>
        <p className="fs-4 mt-3">
          Congratulations! You got <strong>{score}</strong> out of{" "}
          <strong>{total}</strong> correct ({pct}%).
        </p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Play Again
        </button>
      </div>
    </>
  );
}
