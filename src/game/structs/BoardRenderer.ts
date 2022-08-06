import { MatrixResolver } from "../../utils";
import {
  ITextRenderer,
  ITileShapeRenderer
} from "../renderers";
import TileRenderer from "./TileRenderer";

const { l2m } = MatrixResolver(4);
/**
 * The controller to do drive the rendering of the board
 * Todo: Add debugging options
 *
 * @param surface Context to draw the canvas
 * @param options Board options
 * @returns
 */
const BoardRenderer: IBoardRenderer = (surface, options) => {
  const {
    id,
    size: [w, h],
    padding,
  } = options;

  const tiles: IDrawable<number>[] = [];
  const tileWidth = w >> 2;
  const tileHeight = h >> 2;

  const renderers: TileSubRenderers = {
    shapeRenderer: ITileShapeRenderer(surface) as ITileShapeRenderer,
    textRenderer: ITextRenderer(surface) as ITextRenderer,
    // Todo: May be with debugging options, this can be added.
    // indexRenderer: IIndexRenderer(surface) as IIndexRenderer,
  };

  for (let i = 0; i < 16; i++) {
    tiles.push(
      TileRenderer({ id: i, size: [tileWidth, tileHeight], padding }, renderers)
    );
  }

  return {
    id: () => id,
    draw: (matrix) => {
      surface.clearRect(0, 0, w, h);
      for (let tile of tiles) {
        const [col, row] = l2m(tile.id() as number);
        tile.draw(matrix[row][col]);
      }
    },
  };
};

export default BoardRenderer;
