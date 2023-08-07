import { MutableRefObject, useEffect, useRef, useState } from "react"
import SudokuGrid from "./SudokuGrid";
import { Checkbox, FormControlLabel } from "@mui/material";
import SudokuCell from "./SudokuCell";

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

function App() {
	return (
		<>
			<div className="container">
				<SudokuGrid/>
				<GuessingCheckbox/>
			</div>
		</>
  )
}

export default App
