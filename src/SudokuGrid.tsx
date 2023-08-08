import { Grid } from "@mui/material";
import SudokuSubgrid from "./SudokuSubgrid";
import "./Sudoku.css"

const SudokuGrid = () => {
	return (
	<Grid container spacing={0} style={{width: "500px", height: "500px", margin: "10px"}}>
	{
		Array.from(Array(9)).map((_, subgridIndex) => {
			return (
				<Grid key={subgridIndex} item xs={4} >
					<SudokuSubgrid index={subgridIndex}/>
				</Grid>
			)
		})
	}
	</Grid>
	)
}

export default SudokuGrid;
