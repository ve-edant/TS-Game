import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import HighScores from './pages/HighScores';
import Completion from './pages/Completion';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/round/:roundNumber" element={<Game />} />
        <Route path="/highscores" element={<HighScores />} />
        <Route path="/completion" element={<Completion />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
