import { FORWARD } from "../../fixtures";
import { MatrixResolver, Numbers, VectorResolver } from "../../utils";

const { l2m } = MatrixResolver(4);
const { add } = VectorResolver;
const { randomRange } = Numbers;

/**
 * GameLogic
 *
 * @returns
 */
const LogicController = () => {
  /**
   * Slides a sector of tiles in an array depending on the direction
   *
   * @param tileSector {number[]} A sector of tiles in the matrix
   * @param direction {number} Direction FORWARD or REVERSE
   */
  const slideTiles = (tileSector: number[], direction = FORWARD) => {
    let startTileId = 0;
    let endTileId = tileSector.length - 1;

    if (direction === FORWARD) {
      startTileId = endTileId;
      endTileId = 0;
    }

    let firstProcessTileId = startTileId + direction;
    let lastProcessTileId = endTileId + direction;

    const slideTerminationCellId =
      direction === FORWARD ? tileSector.length : -1;

    do {
      let slidingTileId = firstProcessTileId;

      do {
        let nextTileId = slidingTileId - direction;

        if (tileSector[slidingTileId] === 0 || tileSector[nextTileId] !== 0)
          break;

        tileSector[nextTileId] = tileSector[slidingTileId];
        tileSector[slidingTileId] = 0;

        slidingTileId -= direction;
      } while (slidingTileId !== slideTerminationCellId);

      firstProcessTileId += direction;
    } while (firstProcessTileId !== lastProcessTileId);
  };

  /**
   * Merges to values in a sector of an array
   *
   * @param tileSector {numbers[]} A sector of tiles in the matrix
   * @param a {number} Index 1
   * @param b {number} Index 2
   */
  const mergeTiles = (tileSector: number[], a: number, b: number) => {
    if (tileSector[a] === tileSector[b]) {
      tileSector[a] += tileSector[b];
      tileSector[b] = 0;
    }
  };

  /**
   * Process a give section of an array with the logic
   *
   * @param tileSector {number[]} Array sector to be processed
   * @param direction {number}
   */
  const processTiles = (tileSector: number[], direction = FORWARD) => {
    let startIndex = 0,
      endIndex = tileSector.length - 1;
    if (direction === FORWARD) {
      startIndex = endIndex;
      endIndex = 0;
    }

    let firstProcessId = startIndex;
    let lastProcessId = endIndex + direction;

    do {
      slideTiles(tileSector, direction);
      mergeTiles(tileSector, firstProcessId, firstProcessId + direction);
      slideTiles(tileSector, direction);
      firstProcessId += direction;
    } while (firstProcessId !== lastProcessId);
  };

  /**
   * Get all indices with empty values in the array
   *
   * @param tiles {number[][]} The value matrix
   * @returns
   */
  const getEmptyTileIndices = (tiles: Matrix) => {
    const indices = [];
    const length = tiles.length * tiles[0].length;

    for (let i = 0; i < length; i++) {
      const [col, row] = l2m(i);
      if (tiles[row][col] === 0) {
        indices.push(i);
      }
    }

    return indices;
  };

  /**
   * Get n count of random empty tile indices
   *
   * @param emptyTiles A list of empty tiles
   * @param count No of indices to be return
   * @param indices
   * @returns
   */
  const getRandomIndices = (
    emptyTiles: number[],
    count: number,
    indices: number[] = []
  ): number[] => {
    if (!emptyTiles.length) return indices;

    while (indices.length < count) {
      const i = randomRange(0, emptyTiles.length - 1);
      indices.push(emptyTiles[i]);
      emptyTiles.splice(i, 1);
      getRandomIndices(emptyTiles, count, indices);
    }

    return indices;
  };

  /**
   * Populate the matrix no of locations (count) with random values for the given matrix.
   * Chances of 4 appearing is only 1%
   *
   * @param tiles {number[][]} The value matrix
   * @param count {number} No of tiles to be populated with a random value
   */
  const setRandomDigits = (tiles: Matrix, count: number = 1) => {
    const indices = getRandomIndices(getEmptyTileIndices(tiles), count);
    for (let i = 0; i < indices.length; i++) {
      const [col, row] = l2m(indices[i]);
      tiles[row][col] = randomRange(0, 10) > 9 ? 4 : 2;
    }
  };

  /**
   * Check if the winning condition has been reached.
   *
   * @param tiles {number[][]} The matrix
   * @param value {number} Check winning condition. This is optional as reaching 2048 is almost impossible. This is for testing purposes
   * @returns
   */
  const didWin = (tiles: Matrix, value: number = 2048) => {
    const length = tiles.length * tiles[0].length;

    for (let i = 0; i < length; i++) {
      const [col, row] = l2m(i);
      if (tiles[row][col] === value) {
        return true;
      }
    }

    return false;
  };

  /**
   * Check if any moves are left.
   *
   * @param tiles {number[][]} The matrix to be checked
   * @returns
   */
  const hasMoves = (tiles: Matrix) => {
    const adjOffsets: Vector[] = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    const length = tiles.length * tiles[0].length;

    for (let i = 0; i < length; i++) {
      const [col, row] = l2m(i);
      for (let j = 0; j < adjOffsets.length; j++) {
        const [adjRow, adjCol] = add([row, col], adjOffsets[j]);
        if (
          adjRow === -1 ||
          adjCol === -1 ||
          adjRow >= tiles.length ||
          adjCol >= tiles.length
        ) {
          continue;
        }

        if (
          tiles[row][col] === tiles[adjRow][adjCol] ||
          tiles[adjRow][adjCol] === 0
        ) {
          return true;
        }
      }
    }

    return false;
  };

  return {
    didWin,
    hasMoves,
    processTiles,
    setRandomDigits,
  };
};

export default LogicController;
