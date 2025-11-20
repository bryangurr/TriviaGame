import { useLocation, useNavigate } from "react-router-dom";
import type { Question } from "../types/Question";
import { useEffect, useMemo, useState } from "react";

type LocationState = { questions?: Question[] };

const QuestionPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState | null };
  const questions = state?.questions ?? [];
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correct, setCorrect] = useState<string>("");
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Redirect to home if no questions are available
  useEffect(() => {
    if (questions.length === 0) navigate("/");
  }, [questions.length, navigate]);
  // Return null if no questions
  if (questions.length === 0) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAnswer) return;
    console.log("Submit clicked");
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === q.correct_answer) {
      console.log("Correct answer!");
      setScore((s) => s + 1);
    } else {
      console.log("Wrong answer!");
    }
    if (questionNum + 1 >= questions.length) {
      setQuizFinished(true);
      // navigate("/");
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setQuestionNum((qn) => qn + 1);
  };

  const handleFinishQuiz = () => {
    navigate("/");
  };

  // Get current question
  const q = questions[questionNum];
  useEffect(() => {
    setCorrect(q.correct_answer);
  }, [q]);

  // Shuffle answers when question changes
  const answers = useMemo(() => {
    const arr = [q.correct_answer, ...q.incorrect_answers].map(decodeEntities);

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [q]);

  return (
    <>
      <h3>
        Question {questionNum + 1} of {questions.length}
      </h3>
      <form
        className="p-4 border rounded bg-light shadow-sm"
        onSubmit={handleSubmit}
      >
        <h4>{decodeEntities(q.question)}</h4>
        <div className="d-grid gap-2">
          {answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrectAnswer = answer === correct;
            const isSelectedWrong =
              isAnswered && isSelected && !isCorrectAnswer;

            const btnClass = !isAnswered
              ? isSelected
                ? "btn-primary text-white" // selected (pre-submit)
                : "btn-outline-primary" // unselected (pre-submit)
              : isCorrectAnswer
                ? "btn-success text-white" // correct (post-submit)
                : isSelectedWrong
                  ? "btn-danger text-white" // user's wrong choice (post-submit)
                  : "btn-outline-secondary";

            return (
              <button
                key={index}
                type="button"
                className={`btn ${btnClass}`}
                onClick={() => setSelectedAnswer(answer)}
                disabled={isAnswered}
              >
                {answer}
              </button>
            );
          })}
        </div>
        <br />
        <button type="submit" className="btn btn-success" hidden={isAnswered}>
          Check Answer
        </button>
        <button
          type="button"
          className="btn btn-success"
          hidden={!isAnswered || quizFinished}
          onClick={handleNext}
        >
          Next Question
        </button>
        <button
          type="button"
          className="btn btn-success"
          hidden={!quizFinished}
          onClick={handleFinishQuiz}
        >
          Submit Quiz
        </button>
      </form>
      <br />
      <h2>Score: {score}</h2>
    </>
  );
};
export default QuestionPage;

function decodeEntities(s: string) {
  const el = document.createElement("textarea");
  el.innerHTML = s;
  return el.value;
}
