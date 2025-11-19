import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Game from "./pages/GameSetup";
import Question from "./pages/Question";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/question" element={<Question />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
