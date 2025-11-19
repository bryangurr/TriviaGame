import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchQuestions } from "../api/TriviaAPI";
import { useEffect, useState } from "react";
import type { Category } from "../types/Category";

type FormData = {
  category: string;
  difficulty: string;
};
// Game Setup Page Component
function GameSetup() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    difficulty: "",
  });

  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");

  // Fetch categories on component mount
  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      if (!Array.isArray(data.trivia_categories)) {
        throw new Error("Invalid categories data");
      }
      setCategories(data.trivia_categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const questions = await fetchQuestions({
        amount: 10,
        category: formData.category || undefined,
        difficulty: formData.difficulty,
      });
      console.log("Questions fetched:", questions);
      navigate("/question", { state: { questions } });
    } catch (err: any) {
      setError(err?.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>You made it to the game!</h1>
      <p>
        Pick a category, difficulty, and number of questions to test your trivia
        skills. To begin, press Start below!
      </p>

      <form className="form-group" onSubmit={handleSubmit}>
        <h2>Game Setup</h2>
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <select
          id="category"
          name="category"
          className="form-select"
          value={formData.category}
          onChange={(e) =>
            setFormData((s) => ({ ...s, category: e.target.value }))
          }
        >
          <option value="">Any Category</option>
          {categories.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="difficulty" className="form-label">
          Difficulty:
        </label>
        <select
          id="difficulty"
          name="difficulty"
          className="form-select"
          value={formData.difficulty}
          onChange={(e) =>
            setFormData((s) => ({ ...s, difficulty: e.target.value }))
          }
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit" className="btn btn-success mt-3">
          Start Game
        </button>
      </form>
      <br />

      <button onClick={handleGoHome} className="btn btn-primary">
        Home
      </button>
      {loading && <p className="text-center mt-3">Loading questions...</p>}
      {error && <p className="text-danger text-center mt-3">Error: {error}</p>}
    </>
  );
}

export default GameSetup;
