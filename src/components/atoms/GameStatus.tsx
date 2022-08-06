import { FC } from "react";

const GameStatus: FC<GameStatusProps> = ({ status }) => {
  return <div className="game-status" >{status}</div>;
};

export default GameStatus;
