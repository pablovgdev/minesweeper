import React, { useEffect, useState } from "react";
import { Cell, Face, CellState, NUMBER_OF_MINES } from "../../types";
import { generateCells } from "../../util";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";
import "./App.scss";

const App: React.FC = () => {
	const [cells, setCells] = useState<Cell[][]>(generateCells());
	const [face, setFace] = useState<Face>(Face.smile);
	const [time, setTime] = useState<number>(0);
	const [live, setLive] = useState<boolean>(false);
	const [minesCount, setMinesCount] = useState<number>(NUMBER_OF_MINES);

	useEffect(() => {
		const handleMouseDown = () => setFace(Face.careful);
		const handleMouseUp = () => setFace(Face.smile);

		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
		}
	}, [])

	useEffect(() => {
		if (live) {
			const interval = setInterval(() => setTime(Math.min(time + 1, 999)), 1000)
			return () => clearInterval(interval);
		}
	}, [live, time])

	const handleCellClick = (row: number, col: number) => (): void => {
		if (!live) {
			setLive(true);
		}
	}

	const handleCellRightClick = (
		row: number,
		col: number
	) => (
		e: React.MouseEvent
	): void => {
			e.preventDefault();

			console.log("right click");

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
		if (live) {
			setCells(generateCells());
			setTime(0);
			setLive(false);
		}
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