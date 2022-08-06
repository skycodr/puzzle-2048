import { KEYBOARD_SCHEME_A } from "../../fixtures";
import {
  useGameController,
  useGameStatus,
  useKeyboardController,
} from "../../hooks";
import GameBoard from "../atoms/GameBoard";
import GameStatus from "../atoms/GameStatus";

/**
 * Component to control the core of the game
 *
 * @returns
 */
const Puzzle = () => {
  const { ref, onKeyPress } = useGameController();
  useKeyboardController(
    KEYBOARD_SCHEME_A as ControlScheme<ControlSchemes>,
    onKeyPress
  );
  const { status } = useGameStatus();

  return (
    <>
      <GameStatus status={status} />
      <GameBoard ref={ref} />
    </>
  );
};

export default Puzzle;
