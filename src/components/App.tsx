import React, { useEffect, useState } from "react";
import "../styles/App.scss";
import { Cell, CellState, CellValue, Face, MAX_COLS, MAX_ROWS, NUMBER_OF_MINES } from "../types";
import { generateCells, openBlankCells } from "../utils/cells-setup";
import Button from "./Button";
import NumberDisplay from "./NumberDisplay";

const App: React.FC = () => {
	const [cells, setCells] = useState<Cell[][]>(generateCells());
	const [face, setFace] = useState<Face>(Face.smile);
	const [time, setTime] = useState<number>(0);
	const [live, setLive] = useState<boolean>(false);
	const [lost, setLost] = useState<boolean>(false);
	const [minesCount, setMinesCount] = useState<number>(NUMBER_OF_MINES);

	useEffect(() => {
		const handleMouseDown = () => {
			if (!lost && live) {
				setFace(Face.careful);
			}
		}
		const handleMouseUp = () => {
			if (!lost && live) {
				setFace(Face.smile);
			}
		}

		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
		}
	}, [live, lost])

	useEffect(() => {
		if (live) {
			const interval = setInterval(() => setTime(Math.min(time + 1, 999)), 1000);
			return () => clearInterval(interval);
		}
	}, [live, time])

	const handleCellClick = (row: number, col: number) => (): void => {
		if (!lost) {
			if (!live) {
				setLive(true);
			}

			if (cells[row][col].state !== CellState.hidden) {
				return;
			}

			if (cells[row][col].value === CellValue.mine) {
				for (let r = 0; r < MAX_ROWS; r++) {
					for (let c = 0; c < MAX_COLS; c++) {
						cells[r][c].state = CellState.visible;
					}
				}
				setCells(cells);
				setFace(Face.lost);
				setLive(false);
				setLost(true);
			} else {
				if (cells[row][col].value === CellValue.none) {
					setCells(openBlankCells(cells, row, col));
				} else {
					cells[row][col].state = CellState.visible;
					setCells(cells);
				}

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
					setLive(false);
					setFace(Face.won);
					setLost(true);
				}
			}
		}
	}

	const handleCellRightClick = (
		row: number,
		col: number
	) => (
		e: React.MouseEvent
	): void => {
			e.preventDefault();

			if (!live || minesCount === 0) {
				return;
			}

			if (cells[row][col].state === CellState.visible) {
				return;
			} else if (cells[row][col].state === CellState.hidden) {
				cells[row][col].state = CellState.flagged;
				setCells(cells);
				setMinesCount(minesCount - 1);
			} else if (cells[row][col].state === CellState.flagged) {
				cells[row][col].state = CellState.hidden;
				setCells(cells);
				setMinesCount(minesCount + 1);
			}
		}

	const handleFaceClick = () => {
		setCells(generateCells());
		setTime(0);
		setLive(false);
		setLost(false);
		setMinesCount(NUMBER_OF_MINES);
	}

	const renderCells = (): React.ReactNode => {
		return cells.map((row, rowIndex) => {
			return row.map((cell, colIndex) => {
				return (
					<Button
						key={`${rowIndex}-${colIndex}`}
						state={cell.state}
						value={cell.value}
						row={rowIndex}
						col={colIndex}
						onClick={handleCellClick}
						onContext={handleCellRightClick}
					/>
				)
			});
		});
	}

	return (
		<div className="App">
			<div className="Header">
				<NumberDisplay value={minesCount} />
				<div className="Face" onClick={handleFaceClick}>
					<span role="img" aria-label="face">{face}</span>
				</div>
				<NumberDisplay value={time} />
			</div>
			<div className="Body">{renderCells()}</div>
		</div>
	)
}

export default App;