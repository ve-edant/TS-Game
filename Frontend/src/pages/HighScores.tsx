import React, { useEffect, useState } from "react";

interface HighScore {
  name: string;
  timeTaken: number;
  points: number;
}

const HighScores: React.FC = () => {
  const [rawScores, setRawScores] = useState<HighScore[]>([]);
  const [processedScores, setProcessedScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const response = await fetch("http://localhost:5000/getScores");
        if (!response.ok) {
          throw new Error("Error fetching high scores");
        }
        const data: HighScore[] = await response.json();
        setRawScores(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
  }, []);

  useEffect(() => {
    if (rawScores.length > 0) {
      const processed = rawScores
        .map((score) => ({
          ...score,
          timeTaken: Number(score.timeTaken) || 0, 
        }))
        .sort((a, b) => b.points - a.points); 

      setProcessedScores(processed);
    }
  }, [rawScores]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      {/* Home Button */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        High Scores
      </h1>

      {/* Score Display Buttons */}
      <div className="flex space-x-2 sm:space-x-4 mb-6">
        {[10, 20, 50].map((count) => (
          <button
            key={count}
            className={`px-3 sm:px-4 py-2 rounded-md transition text-sm sm:text-base ${
              displayCount === count
                ? "bg-green-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setDisplayCount(count)}
          >
            {count}
          </button>
        ))}
      </div>

      {/* High Score Table */}
      {loading ? (
        <p>Loading...</p>
      ) : processedScores.length > 0 ? (
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-center text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-2 sm:px-4 py-2">Rank</th>
                <th className="border border-gray-700 px-2 sm:px-4 py-2">Name</th>
                <th className="border border-gray-700 px-2 sm:px-4 py-2">Points</th>
                <th className="border border-gray-700 px-2 sm:px-4 py-2">Time Taken</th>
              </tr>
            </thead>
            <tbody>
              {processedScores.slice(0, displayCount).map((score, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="border border-gray-700 px-2 sm:px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-700 px-2 sm:px-4 py-2">
                    {score.name}
                  </td>
                  <td className="border border-gray-700 px-2 sm:px-4 py-2">
                    {Number(score.points)}
                  </td>
                  <td className="border border-gray-700 px-2 sm:px-4 py-2">
                    {score.timeTaken ? score.timeTaken.toFixed(3) : "N/A"} sec
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No high scores available.</p>
      )}
    </div>
  );
};

export default HighScores;
