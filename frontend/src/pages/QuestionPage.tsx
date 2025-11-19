import { useLocation, useNavigate } from "react-router-dom";
import type { Question } from "../types/Question";
import { useState } from "react";

type LocationState = { questions?: Question[] };

const QuestionPage = () => {
  // const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState | null };
  const questions = state?.questions ?? [];
  const [questionNum, setQuestionNum] = useState<number>(0);

  console.log("Question component rendered");
  console.log(questions);
  setQuestionNum(0);
  return (
    <>
      <div>
        <h1>Question:</h1>
      </div>
    </>
  );
};
export default QuestionPage;
