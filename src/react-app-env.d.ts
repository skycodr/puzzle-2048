/// <reference types="react-scripts" />

/*------------------------- Start common definitions --------------------------------*/
type Surface = CanvasRenderingContext2D;
type Point = [number, number];

type Matrix = number[][];
/*------------------------- End common definitions --------------------------------*/

/*------------------------- Start keyboard scheme maps ------------------------------*/

type ControlScheme_A = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
type ControlScheme_B = "w" | "s" | "a" | "d";
type CardinalDirections = "Up" | "Down" | "Left" | "Right";
type TileSlideDirection = {
  [k in CardinalDirections]: number;
};

type ControlSchemes = ControlScheme_A | ControlScheme_B;

type ControlScheme<T extends ControlSchemes> = Record<T, CardinalDirections>;

/*------------------------- End keyboard scheme maps ------------------------------*/

/*------------------------- Start component props ------------------------------*/
type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

type GameStatusProps = {
  status: string;
};

/*------------------------- End component props ------------------------------*/

type GameStateContext = {
  gameState: number;
  setGameState: React.Dispatch<React.SetStateAction<number>> | null;
};

type GameOptions = {
  id?: string;
  size: Point;
  padding: number;
};

type TGameController = (
  surface: Surface,
  options: GameOptions,
  controllers: {
    logicController: ReturnType<TLogicController>;
  }
) => {
  init: () => void;
  onKeyPress: (key: CardinalDirections) => void;
  getGameState: () => number;
};

type TLogicController = () => {
  didWin: (tiles: Matrix, value: number = 2048) => boolean;
  hasMoves: (tiles: Matrix) => boolean;
  processTiles: (sector: number[], direction: number = -1) => void;
  setRandomDigits: (tiles: Matrix, count: number = 1) => void;
};

type GameContextInterface = {
  game: ReturnType<TGameController> | null;
};

/* ------------------- Start render definitions ----------------------*/
type TextRenderOptions = {
  renderZeros: boolean;
};

type IIndexRenderer = (value: string, position: Point) => void;
type ITextRenderer = (
  value: number,
  position: Point,
  options?: TextRenderOptions
) => void;
type ITileShapeRenderer = (position: Point, size: Point, color) => void;

type ISubRenderer = (
  surface: Surface
) => IIndexRenderer | ITextRenderer | ITileShapeRenderer;

type Drawable<T> = {
  id: () => string | number;
  draw: (value: T) => void;
};

type DrawableOptions = {
  id: string | number;
  size: Point;
  padding: number;
};

type Board = (surface: Surface, options: DrawableOptions) => Drawable<Matrix>;

type TileSubRenderers = {
  textRenderer: ITextRenderer;
  shapeRenderer: ITileShapeRenderer;
  indexRenderer?: IIndexRenderer;
};

type Tile = (
  options: DrawableOptions,
  renders: TileSubRenderers
) => Drawable<number>;

/* ------------------- End render definitions ----------------------*/
