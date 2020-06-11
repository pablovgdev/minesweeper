import React, { useContext } from "react";
import "../styles/Face.scss";
import { generateCells } from "../utils/cells-setup";
import { Faces, NUMBER_OF_MINES } from "../utils/types";
import GameContext from "./Context";

const Face: React.FC = () => {
  const {
    setStart,
    setEnd,
    setCells,
    face,
    setFace,
    setTime,
    setMines
  } = useContext(GameContext);

  const handleFaceClick = () => {
    setCells(generateCells());
    setStart(false);
    setEnd(false);
    setMines(NUMBER_OF_MINES);
    setFace(Faces.smile);
    setTime(0);
  }

  return (
    <div className="Face" onClick={handleFaceClick}>
      <span role="img" aria-label="face">{face}</span>
    </div>
  )
}

export default Face;