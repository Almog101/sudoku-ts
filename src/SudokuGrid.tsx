import { Grid } from "@mui/material";
import SudokuSubgrid from "./SudokuSubgrid";
import "./Sudoku.css"

const SudokuGrid = ({isGuessing}: {isGuessing: boolean}) => {
	return (
	<Grid container spacing={0} style={{width: "500px", height: "500px"}}>
	{
		Array.from(Array(9)).map((_, num) => {
			return (
				<Grid key={num} item xs={4} >
					<SudokuSubgrid isGuessing={isGuessing}/>
				</Grid>
			)
		})
	}
	</Grid>
	)
}

export default SudokuGrid;
