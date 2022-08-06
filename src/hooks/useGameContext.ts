import { useState } from "react";
import { PLAYING } from "../fixtures";

const useGameState = () => {
  const [gameState, setGameState] = useState<number>(PLAYING);

  const gameStateContext: GameStateContext = {
    gameState,
    setGameState,
  };

  return gameStateContext;
};

export default useGameState;
