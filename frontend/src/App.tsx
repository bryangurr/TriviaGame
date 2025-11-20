import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Game from "./pages/GameSetup";
import Question from "./pages/QuestionPage";
import ResultsPage from "./pages/ResultsPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="game" element={<Game />} />
          <Route path="question" element={<Question />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
