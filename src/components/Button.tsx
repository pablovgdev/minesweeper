import React, { useContext } from "react";
import "../styles/Button.scss";
import { openBlankCells } from "../utils/cells-setup";
import { CellState, CellValue, Faces, MAX_COLS, MAX_ROWS } from "../utils/types";
import GameContext from "./Context";

interface ButtonProps {
  state: CellState;
  value: CellValue;
  row: number;
  col: number;
}

const Button: React.FC<ButtonProps> = ({ state, value, row, col }) => {
  const {
    start, setStart,
    end, setEnd,
    cells, setCells,
    mines, setMines,
    setFace
  } = useContext(GameContext);

  const checkWin = () => {
    let allVisible = true;

    for (let r = 0; r < MAX_ROWS; r++) {
      for (let c = 0; c < MAX_COLS; c++) {
        if (cells[r][c].state === CellState.hidden) {
          allVisible = false;
          break;
        }
      }

      if (!allVisible) {
        break;
      }
    }

    if (allVisible) {
      setStart(false);
      setFace(Faces.won);
      setEnd(true);
    }
  }

  const handleLeftClick = (row: number, col: number) => (e: React.MouseEvent): void => {
    e.preventDefault();

    const newCells = [...cells];

    if (!end) {
      if (newCells[row][col].state !== CellState.hidden) {
        return;
      }

      if (!start) {
        setStart(true);
      }

      if (newCells[row][col].value === CellValue.mine) {
        for (let r = 0; r < MAX_ROWS; r++) {
          for (let c = 0; c < MAX_COLS; c++) {
            newCells[r][c].state = CellState.visible;
          }
        }

        setCells(newCells);
        setFace(Faces.lost);
        setStart(false);
        setEnd(true);
      } else {
        newCells[row][col].state = CellState.visible;

        if (newCells[row][col].value === CellValue.none) {
          setCells(openBlankCells(newCells, row, col));
        } else {
          setCells(newCells);
        }

        checkWin();
      }
    }
  }

  const handleRightClick = (row: number, col: number) => (e: React.MouseEvent): void => {
    e.preventDefault();

    if (!start || mines === 0) {
      return;
    }

    if (cells[row][col].state === CellState.hidden) {
      cells[row][col].state = CellState.flagged;
      setCells(cells);
      setMines(mines - 1);
    } else if (cells[row][col].state === CellState.flagged) {
      cells[row][col].state = CellState.hidden;
      setCells(cells);
      setMines(mines + 1);
    }

    checkWin();
  }

  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.mine) {
        return <span role="img" aria-label="face">💣</span>
      } else if (value === CellValue.none) {
        return null;
      } else {
        return value;
      }
    } else if (state === CellState.flagged) {
      return <span role="img" aria-label="face">🚩</span>
    }

    return null;
  }

  const stateClass = state === CellState.visible ? "visible" : "";
  const valueClass = `value-${value}`;

  return (
    <div
      className={`Button ${stateClass} ${valueClass}`}
      onClick={handleLeftClick(row, col)}
      onContextMenu={handleRightClick(row, col)}
    >
      {renderContent()}
    </div >
  )
}

export default Button;