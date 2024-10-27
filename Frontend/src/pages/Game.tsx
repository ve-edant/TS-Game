import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewSvg from "../Components/NewSvg";
import Timer from "../Components/Timer";

const generateArrowSequence = (): string[] => {
  const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  return Array.from({ length: 6 }, () => arrows[Math.floor(Math.random() * arrows.length)]);
};

const Game: React.FC = () => {
  const { roundNumber } = useParams<{ roundNumber: string }>();
  const [sequence, setSequence] = useState<string[]>(generateArrowSequence());
  const [round, setRound] = useState<number>(1);
  const index = useRef<number>(0);
  const navigate = useNavigate();
  const [mistakes, setMistakes] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [activeArrows, setActiveArrows] = useState<boolean[]>(Array(6).fill(false));

  const arrowData: { [key: string]: string } = { 
    "ArrowUp": "up", 
    "ArrowDown": "down", 
    "ArrowRight": "right", 
    "ArrowLeft": "left" 
  };

  const basePointsPerRound = 100;
  const timeThreshold = 60;
  const mistakePenalty = 10;

  const calculatePoints = useCallback((time: number, mistakes: number) => {
    const timeFactor = time > 0 ? Math.max(1, timeThreshold / time) : timeThreshold;
    const totalPoints = (basePointsPerRound * round * timeFactor) - (mistakes * mistakePenalty);
    return Math.max(0, Math.round(totalPoints));
  }, [basePointsPerRound, round, timeThreshold, mistakePenalty]);
  

  

  const completeGame = useCallback(() => {
    setIsGameCompleted(true);
    const endTime = Date.now();
    const timeTakenMs = endTime - startTime;
    const timeTakenSec = Math.floor(timeTakenMs / 1000);
    const timeTakenMillis = timeTakenMs % 1000;
    const formattedTime = `${timeTakenSec}.${timeTakenMillis.toString().padStart(3, '0')}`;
    
    const points = calculatePoints(timeTakenSec + timeTakenMillis / 1000, mistakes);
    navigate(`/completion`, { state: { timeTaken: formattedTime, points } });
  }, [startTime, mistakes, navigate, calculatePoints]);
  
  

  const keyPressed = useCallback((e: KeyboardEvent) => {
    if (round <= 5) {
      if (sequence[index.current] === e.key) {
        setActiveArrows((prev) => {
          const newActive = [...prev];
          newActive[index.current] = true;
          return newActive;
        });
        index.current++;
  
        if (index.current === sequence.length) {
          if (round === 5) {
            completeGame();
          } else {
            navigate(`/round/${round + 1}`);
            setRound((prevRound) => prevRound + 1);
            setSequence(generateArrowSequence());
            index.current = 0;
            setActiveArrows(Array(6).fill(false));
          }
        }
      } else {
        setMistakes((prev) => prev + 1);
        index.current = 0;
        setSequence(generateArrowSequence());
        setActiveArrows(Array(6).fill(false));
      }
    }
  }, [sequence, round, navigate, completeGame]);
  
  

  useEffect(() => {
    if (!isGameCompleted) setIsTimerRunning(true);
    else setIsTimerRunning(false);
  }, [isGameCompleted]);

  useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    return () => document.removeEventListener("keydown", keyPressed);
  }, [keyPressed]);

  useEffect(() => {
    if (round === 1 && !isGameCompleted) {
      setStartTime(Date.now());
    }
  }, [round, isGameCompleted]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Round {roundNumber}</h1>
      <div className="mt-6 flex space-x-4">
        {sequence.map((arrow, index) => (
          <NewSvg key={index} direction={arrowData[arrow] as "up" | "down" | "left" | "right"} isActive={activeArrows[index]} />
        ))}
      </div>
      <p className="mt-4 text-lg">Round: {round}/5</p>
      <Timer isRunning={isTimerRunning} />
      {isGameCompleted && <p className="mt-4 text-green-500">Congratulations! You completed the game!</p>}
    </div>
  );
};

export default Game;
