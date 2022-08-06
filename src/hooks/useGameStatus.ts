import { useContext } from "react";
import { GameContext } from "../contexts";
import { LOSS, WON } from "../fixtures";

/**
 * Hook to get the label of the status
 * Todo: Externalize and use i18n for multi-language support
 *
 * @returns
 */
const useGameStatus = () => {
  const { gameState } = useContext(GameContext);

  return {
    status:
      gameState === WON
        ? "You won!!!"
        : gameState === LOSS
        ? "You lost. Restart!!!"
        : "Keep playing...",
  };
};

export default useGameStatus;
