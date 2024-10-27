// Components/Round.tsx
import React from "react";
import { useParams } from "react-router-dom";
import Game from "../pages/Game"; // Import the Game component

// Define the props interface
interface RoundProps {
  round: number; // Define the round prop
}

const Round: React.FC<RoundProps> = () => {
  const { roundNumber } = useParams<{ roundNumber: string }>();
  const round = Number(roundNumber); // Convert to number

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Round {round}</h1>
      <Game round={round} /> {/* Pass the round number to the Game component */}
    </div>
  );
};

export default Round;
