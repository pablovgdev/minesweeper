import React, { useContext } from "react";
import "../styles/Body.scss";
import Button from "./Button";
import GameContext from "./Context";

const Body: React.FC = () => {
  const { cells } = useContext(GameContext);

  return (
    <div className="Body">
      {
        cells.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            return (
              <Button
                key={`${rowIndex}-${colIndex}`}
                state={cell.state}
                value={cell.value}
                row={rowIndex}
                col={colIndex}
              />
            )
          });
        })
      }
    </div >
  )
}

export default Body;