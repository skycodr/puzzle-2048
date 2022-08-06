/// <reference types="react-scripts" />

/*------------------------- Start common definitions --------------------------------*/
type Surface = CanvasRenderingContext2D;
type Vector = [number, number];
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
  size: Vector;
  padding: number;
};

type IGameController = (
  surface: Surface,
  options: GameOptions
) => {
  init: () => void;
  onKeyPress: (key: CardinalDirections) => void;
  getGameState: () => number;
};

type GameContextInterface = {
  game: ReturnType<IGameController> | null;
};

/* ------------------- Start render definitions ----------------------*/
type TextRenderOptions = {
  renderZeros: boolean;
};

type IIndexRenderer = (value: string, position: Vector) => void;
type ITextRenderer = (
  value: number,
  position: Vector,
  options?: TextRenderOptions
) => void;
type ITileShapeRenderer = (position: Vector, size: Vector, color) => void;

type ISubRenderer = (
  surface: Surface
) => IIndexRenderer | ITextRenderer | ITileShapeRenderer;

type IDrawable<T> = {
  id: () => string | number;
  draw: (value: T) => void;
};

type DrawableOptions = {
  id: string | number;
  size: Vector;
  padding: number;
};

type IBoardRenderer = (
  surface: Surface,
  options: DrawableOptions
) => IDrawable<Matrix>;

type TileSubRenderers = {
  textRenderer: ITextRenderer;
  shapeRenderer: ITileShapeRenderer;
  indexRenderer?: IIndexRenderer;
};

type ITileRenderer = (
  options: DrawableOptions,
  renders: TileSubRenderers
) => IDrawable<number>;

/* ------------------- End render definitions ----------------------*/
