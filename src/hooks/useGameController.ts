import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { GameContext } from "../contexts";
import { LogicController, GameController } from "../controllers";
/**
 * Hook for the handling the game.
 * Todo: May be options can be DI ed.
 *
 * @returns
 */
const useGameController = () => {
  const [controller, setController] =
    useState<ReturnType<TGameController> | null>(null);

  const ref = useRef<HTMLCanvasElement>(null);

  const { setGameState } = useContext(GameContext);

  useLayoutEffect(() => {
    const surface = ref.current?.getContext("2d");
    surface &&
      setController(
        GameController(
          surface,
          { size: [480, 480], padding: 8 },
          { logicController: LogicController() }
        )
      );
  }, []);

  useEffect(() => {
    controller?.init();
  }, [controller]);

  return {
    ref,
    onKeyPress: (key: CardinalDirections) => {
      controller?.onKeyPress(key);
      setGameState?.(controller?.getGameState() as number);
    },
  };
};

export default useGameController;
