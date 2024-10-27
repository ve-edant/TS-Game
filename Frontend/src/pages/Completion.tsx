import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Completion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { timeTaken, points } = location.state || { timeTaken: "0.000", points: 0 };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // Submission success state

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setIsSubmitted(false); // Reset submission status when popup closes
    setName(''); // Reset name input when popup closes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setIsLoading(true); // Set loading to true when submission starts
    try {
      await axios.post('http://localhost:5000/api/highscores', { name, timeTaken, points });
      setIsLoading(false);
      setIsSubmitted(true); // Set to true after successful submission

      // Navigate to home after a short delay to show "Submitted" message
      setTimeout(() => {
        closePopup();
        navigate('/', { replace: true });
      }, 1500); // Delay in ms to display the "Submitted" status before navigating
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("There was an error submitting your score.");
      setIsLoading(false); // Set loading to false if submission fails
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Game Completed!</h1>
      <p className="text-lg">Thank you for playing!</p>
      <div className="mt-4 text-center">
        <p className="text-2xl">Time Taken: <span className="font-semibold">{timeTaken} seconds</span></p>
        <p className="text-2xl mt-2">Points: <span className="font-semibold">{points}</span></p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Home
      </button>
      <button
        onClick={openPopup}
        className="mt-4 bg-green-500 px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Score
      </button>

      {/* Popup for name input */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Enter Your Name</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4 text-black"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700 flex items-center justify-center"
                disabled={isLoading || isSubmitted} // Disable button during loading or after submission
              >
                {isLoading ? 'Submitting...' : isSubmitted ? 'Submitted' : 'Submit'} {/* Update button text */}
              </button>
              <button onClick={closePopup} type="button" className="ml-2 bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-700">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Completion;
