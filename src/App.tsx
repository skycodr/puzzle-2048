import { Puzzle, MainLayout } from "./components";
import { GameContext } from "./contexts";
import { useGameState } from "./hooks";

function App() {
  const context = useGameState();
  return (
    <GameContext.Provider value={{ ...context }}>
      <MainLayout>
        <Puzzle />
      </MainLayout>
    </GameContext.Provider>
  );
}

export default App;
