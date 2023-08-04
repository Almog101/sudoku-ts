import { useState } from "react";
import { Grid } from "@mui/material";
import "./Sudoku.css"

const CELL_DEFAULT_BORDER_COLOR = "#ccc";
const CELL_SELECTED_BORDER_COLOR = "#68a7ca";

const GuessesGrid = (props: {guessesBitset: number}) => {
	return (
	<Grid container spacing={0} style={{height: "100%"}} >
	{
		Array.from(Array(9)).map((_, num) => {
			return (
				<Grid key={num} item xs={4} style={{height: "33.33%", fontSize: "10px", textAlign: "center", verticalAlign: "middle"}}>
					{
						(props.guessesBitset & (1 << (num+1))) ?
						num + 1 :
						' '
					}
				</Grid>
				)
		})
	}
	</Grid>
	)
}

const SudokuCell = (props: {num: number}) => {
  const [isSelected, setSelected] = useState(false);
  const [guessesBitset, setGuesses] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);

  const handleInput = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key == "Backspace" && answer != null) {
			setAnswer(null);
			return;
		}

		var newDigit = Number(event.key);
		if (isNaN(newDigit)) {
      return;
    };

		if (newDigit == 0) {
			return;
		};

		if (window.isGuessing) { 
			setGuesses(guessesBitset ^ (1 << newDigit)); 
		}
		else { 
			setAnswer(newDigit) 
		}
  }

	var guessesString = "";
	for (let i = 0; i <= 9; i++) {
	  if (guessesBitset & (1 << i)) {
		  guessesString += i + " ";
		}
	}

	const cellStyle = {
		height: '100%',
		border: '1px solid ' + CELL_DEFAULT_BORDER_COLOR,
		borderColor: isSelected ? CELL_SELECTED_BORDER_COLOR : CELL_DEFAULT_BORDER_COLOR,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		transition: 'border-color 0.3s ease',
	};

  return <div
			className="sudoku-cell"
			style={cellStyle}
      tabIndex={1}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
			onKeyDown={handleInput}
			key={props.num}
    >
		{
			(answer == null) ?
			<GuessesGrid guessesBitset={guessesBitset}/> :
			answer
		}
    </div>
};

export default SudokuCell;
