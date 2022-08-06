import { forwardRef } from "react";

const GameBoard = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ width = 480, height = 480, ...other }, ref) => (
    <canvas ref={ref} width={width} height={height} {...other} />
  )
);

export default GameBoard;
