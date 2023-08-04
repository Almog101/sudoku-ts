import { Grid } from "@mui/material";
import SudokuCell from "./SudokuCell";
import "./Sudoku.css"

const SudokuSubgrid = ({isGuessing}: {isGuessing: boolean}) => {
	return (
	<Grid container spacing={0} style={{height: "100%", border: "1px solid #999"}}>
	{
		Array.from(Array(9)).map((_, num) => {
			return (
			<Grid key={num} item xs={4} >
				<SudokuCell num={num} isGuessing={isGuessing}/>
			</Grid>
			)
		})
	}
	</Grid>
	)
}

export default SudokuSubgrid;
