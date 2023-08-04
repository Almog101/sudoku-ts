import { useState } from "react"
import SudokuGrid from "./SudokuGrid";
import { Checkbox, FormControlLabel } from "@mui/material";

function App() {
	const [isGuessing, setGuessing] = useState(true);

	const onCheck = () => {
		setGuessing(!isGuessing);
	}

	return (
		<>
			<div className="container">
				<SudokuGrid isGuessing={isGuessing}/>
				<FormControlLabel control={<Checkbox defaultChecked={isGuessing} onChange={onCheck}/>} label="Is Guessing"/>
			</div>
		</>
  )
}

export default App
