import { createContext } from "react";
import { PLAYING } from "../fixtures";

const GameContext = createContext<GameStateContext>({
  gameState: PLAYING,
  setGameState: null,
});

export default GameContext;
