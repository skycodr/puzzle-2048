import { DIRECTIONS, LOSS, PLAYING, WON } from "../fixtures";
import { GameBoard } from "../structs";
import { MatrixResolver } from "../utils";

const { trn } = MatrixResolver(4);

/**
 * The main game module which processes logic. This is here to be easily
 * ported to vanilla javascript projects.
 *
 * @param surface A canvas context
 * @param options Options to be passed to the board. May bel this can change for more Dependency Inversion features
 * @returns
 */
const GameController: TGameController = (surface, options, controllers) => {
  let tiles: Matrix;

  const { draw } = GameBoard(surface, options as DrawableOptions);
  const { logicController } = controllers;

  const { setRandomDigits, processTiles, didWin, hasMoves } = logicController;

  return {
    /**
     * Initialize the game board
     */
    init: () => {
      tiles = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      setRandomDigits(tiles, 2);

      draw(tiles);
    },
    /**
     * Call upon key press to evaluate logic
     *
     * @param directions Direction of the key press
     */
    onKeyPress: (directions: CardinalDirections) => {
      const shouldTranspose = directions === "Up" || directions === "Down";

      shouldTranspose && trn(tiles);

      for (let i = 0; i < 4; i++) {
        processTiles(tiles[i], DIRECTIONS[directions]);
      }

      shouldTranspose && trn(tiles);

      setRandomDigits(tiles);

      draw(tiles);
    },

    /**
     * Retrieve the game state
     *
     * Pass a winning number to didWin  to see the result for a short game
     *
     * E.g:- didWin(tiles, 256)
     *
     * @returns
     */
    getGameState: () =>
      didWin(tiles) ? WON : hasMoves(tiles) ? PLAYING : LOSS,
  };
};

export default GameController;
