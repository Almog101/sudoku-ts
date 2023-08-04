import { useState } from "react"
import SudokuGrid from "./SudokuGrid";
import { Checkbox, FormControlLabel } from "@mui/material";

declare global {
    interface Window { isGuessing: boolean; }
}

const GuessingCheckbox = () => {
	const [isGuessing, setGuessing] = useState(true);

	const onCheck = () => {
		window.isGuessing = isGuessing;
		setGuessing(!isGuessing);
	}
	return <FormControlLabel control={<Checkbox checked={isGuessing} onChange={onCheck}/>} label="Is Guessing"/>
}

function App() {
	window.isGuessing = true;

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
