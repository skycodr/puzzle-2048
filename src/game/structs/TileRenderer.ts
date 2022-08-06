import { TILE_COLORS } from "../../fixtures";
import { MatrixResolver, VectorResolver } from "../../utils";

const { l2m } = MatrixResolver(4);
const { add, mul, sub } = VectorResolver;

/**
 * Render individual tiles in the game
 * 
 * @param options Rendering options
 * @param renderers Sub renders
 * @returns 
 */
const TileRenderer: ITileRenderer = (options, renderers) => {
  const { id, size, padding } = options;
  const { shapeRenderer, textRenderer, indexRenderer } = renderers;

  const [col, row] = l2m(id as number);

  const hP = padding >> 1;

  const [x, y] = add(mul([col, row], size), [hP, hP]);
  const [w, h] = sub(size, [padding, padding]);
  const [cx, cy] = add([x, y], [w >> 1, h >> 1]);
  const [ex, ey] = sub(add([x, y], [w, h]), [2, 2]);

  return {
    id: () => id,
    draw: (value) => {
      shapeRenderer([x, y], [w, h], TILE_COLORS[value]);
      textRenderer(value, [cx, cy]);
      indexRenderer?.(`(${[row, col].toString()})`, [ex, ey]);
    },
  };
};

export default TileRenderer;
