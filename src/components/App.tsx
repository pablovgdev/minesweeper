import React, { useState } from "react";
import "../styles/App.scss";
import { generateCells } from "../utils/cells-setup";
import { Cell, Faces, NUMBER_OF_MINES } from "../utils/types";
import Body from "./Body";
import GameContext from "./Context";
import Face from "./Face";
import NumberDisplay from "./NumberDisplay";
import Timer from "./Timer";

const App: React.FC = () => {
  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [mines, setMines] = useState<number>(NUMBER_OF_MINES);
  const [face, setFace] = useState<Faces>(Faces.smile);
  const [time, setTime] = useState<number>(0);

  const context = {
    start, setStart,
    end, setEnd,
    cells, setCells,
    mines, setMines,
    face, setFace,
    time, setTime
  };

  return (
    <div className="App">
      <GameContext.Provider value={context}>
        <div className="Header">
          <NumberDisplay value={context.mines} />
          <Face />
          <Timer />
        </div>
        <Body />
      </GameContext.Provider>
    </div>
  )
}

export default App;