import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const handleBeginGame = () => {
    navigate("/game");
  };

  return (
    <>
      <h1>Welcome To Trivia!</h1>
      <p>
        Pick a category, difficulty, and number of questions to test your trivia
        skills. To begin, press Start below!
      </p>
      <button onClick={handleBeginGame}>Start</button>
    </>
  );
}

export default HomePage;
