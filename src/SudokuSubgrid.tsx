import { Grid } from "@mui/material";
import SudokuCell, { calcCellRealIndex } from "./SudokuCell";
import "./Sudoku.css"
import { useRef } from "react";

const SudokuSubgrid = (props: { index: number }) => {
	return (
	<Grid container spacing={0} style={{height: "100%", border: "1px solid #999"}}>
	{
		Array.from(Array(9)).map((_, cellIndex) => {
			const cellRef = useRef(null);
			const [x, y] = calcCellRealIndex(props.index, cellIndex);
			window.board[y][x] = cellRef;

			return (
			<Grid key={cellIndex} item xs={4} >
				<SudokuCell ref={cellRef} index={cellIndex} subgridIndex={props.index}/>
			</Grid>
			)
		})
	}
	</Grid>
	)
}

export default SudokuSubgrid;
