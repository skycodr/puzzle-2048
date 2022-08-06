import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { GameContext } from "../contexts";
import { PLAYING } from "../fixtures";

/**
 * Hook to bind the control scheme to the game.
 *
 * @param scheme Control scheme
 * @param onKeyPress Handler to bind the control scheme
 */
const useKeyboardController = (
  scheme: ControlScheme<ControlSchemes>,

  onKeyPress?: (key: CardinalDirections) => void
) => {
  const [inputScheme, setInputScheme] = useState(scheme);

  const { gameState } = useContext(GameContext);

  const onKeyPressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (gameState !== PLAYING) return;

      const key = event.key as ControlSchemes;
      if (!!inputScheme[key]) {
        onKeyPress?.(inputScheme[key]);
      }
    },
    [gameState, inputScheme, onKeyPress]
  );

  useEffect(() => {
    setInputScheme(scheme);
  }, [scheme]);

  useLayoutEffect(() => {
    window.addEventListener("keyup", onKeyPressHandler);
    return () => {
      window.removeEventListener("keyup", onKeyPressHandler);
    };
  }, [onKeyPressHandler]);
};

export default useKeyboardController;
