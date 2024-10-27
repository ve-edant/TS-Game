import React, { useEffect, useState } from "react";

interface HighScore {
  name: string;
  timeTaken: number;
  points: number;
}

const HighScores: React.FC = () => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const response = await fetch("http://localhost:5000/getScores");
        if (!response.ok) {
          throw new Error("Error fetching high scores");
        }
        const data = await response.json();
        setHighScores(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">High Scores</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {highScores.length > 0 ? (
            highScores.map((score, index) => (
              <li key={index}>
                {score.name}: {Number(score.points)} points - Time Taken:{" "}
                {score.timeTaken ? Number(score.timeTaken).toFixed(3) : "N/A"}{" "}
                seconds
              </li>
            ))
          ) : (
            <p>No high scores available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default HighScores;
