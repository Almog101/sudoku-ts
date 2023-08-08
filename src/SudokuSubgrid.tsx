import { Grid } from "@mui/material";
import SudokuCell, { calcCellRealIndex } from "./SudokuCell";
import "./Sudoku.css"
import { useRef } from "react";
import { grey } from "@mui/material/colors";

const SudokuSubgrid = (props: { index: number }) => {
	return (
	<Grid container spacing={0} style={{height: "100%", border: "1px solid" + grey[500]}}>
	{
		Array.from(Array(9)).map((_, cellIndex) => {
			const cellRef = useRef(null);
			const [x, y] = calcCellRealIndex(props.index, cellIndex);
			window.board[y][x] = cellRef;

			return (
			<Grid key={cellIndex} style={{height: "33.33%"}} item xs={4} >
				<SudokuCell ref={cellRef} index={cellIndex} subgridIndex={props.index}/>
			</Grid>
			)
		})
	}
	</Grid>
	)
}

export default SudokuSubgrid;
