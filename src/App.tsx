import { MutableRefObject, useEffect, useRef, useState } from "react"
import SudokuGrid from "./SudokuGrid";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import SudokuCell from "./SudokuCell";
import { generateBoard, removeCellsFromBoard } from "./sudoku";

declare global {
    interface Window { 
			isGuessing: boolean; 
			board: MutableRefObject<any>[][];
		}
}

const GuessingCheckbox = () => {
	const [isGuessing, setGuessing] = useState(true);

	const onCheck = () => {
		window.isGuessing = !isGuessing;
		setGuessing(!isGuessing);
	}
	return <FormControlLabel control={<Checkbox checked={isGuessing} onChange={onCheck}/>} label="Is Guessing"/>
}

window.isGuessing = true;
window.board = Array(9);
for(var i: number = 0; i < 9; i++) {
		window.board[i] = Array(9);
}

function fillBoard() {
		let board = generateBoard();
		removeCellsFromBoard(board, 60);

		for (let y = 0; y<9; y++) {
			for (let x = 0; x<9; x++) {
				window.board[y][x].current.reset();

				if (board[y][x] !== 0) {
					window.board[y][x].current.setAnswer(board[y][x]);
					window.board[y][x].current.setLocked(true);
				}
			}
		}
}

function App() {
	useEffect(fillBoard, []);

	return (
		<>
			<div className="main-container">
				<SudokuGrid/>
				<div className="control-container">
					<GuessingCheckbox/>
					<Button className="" onClick={fillBoard} variant="contained">Generate</Button>
					<Button variant="contained">Solve</Button>
				</div>
			</div>
		</>
  )
}

export default App
