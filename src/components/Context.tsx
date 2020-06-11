import React from "react";
import { Cell, Faces } from "../utils/types";

export interface IGameContext {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  end: boolean;
  setEnd: React.Dispatch<React.SetStateAction<boolean>>;
  cells: Cell[][];
  setCells: React.Dispatch<React.SetStateAction<Cell[][]>>;
  mines: number;
  setMines: React.Dispatch<React.SetStateAction<number>>;
  face: Faces;
  setFace: React.Dispatch<React.SetStateAction<Faces>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = React.createContext({} as IGameContext);

export default GameContext;
