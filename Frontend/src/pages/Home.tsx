import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Arrow Sequence Game</h1>
      <div className="flex space-x-4">
        <button 
          onClick={() => navigate('/game')}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Game
        </button>
        <button 
          onClick={() => navigate('/highscores')}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-700"
        >
          High Scores
        </button>
      </div>
    </div>
  );
};

export default Home;
