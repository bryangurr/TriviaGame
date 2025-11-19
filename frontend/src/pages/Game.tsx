import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <h1>You made it to the game!</h1>
      <p>
        Pick a category, difficulty, and number of questions to test your trivia
        skills. To begin, press Start below!
      </p>
      <button onClick={handleGoHome}>Home</button>
    </>
  );
}

export default Game;
