import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Grid } from "@mui/material";
import "./Sudoku.css"

const CELL_DEFAULT_BORDER_COLOR = "#ccc";
const CELL_SELECTED_BORDER_COLOR = "#6675c9";

const GuessesGrid = (props: {guessesBitset: number}) => {
	return (
	<Grid container spacing={0} style={{height: "100%"}} >
	{
		Array.from(Array(9)).map((_, num) => {
			return (
				<Grid key={num} item xs={4} style={{height: "33.33%", fontSize: "12px", textAlign: "center", verticalAlign: "middle"}}>
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

export function calcCellRealIndex(subgridIndex: number, cellIndex: number): [number, number] {
	const startx = subgridIndex%3;
	const starty = Math.floor(subgridIndex/3);

	const cellx = cellIndex%3;
	const celly = Math.floor(cellIndex/3);

	return [startx * 3 + cellx, starty * 3 + celly];
}

const SudokuCell = forwardRef((props: {subgridIndex: number, index: number}, ref) => {
  const [isLocked, setLocked] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [guessesBitset, setGuesses] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const cellRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      setAnswer(value: number | null) {
				setAnswer(value);
      },
			getAnswer(): number | null {
				return answer;
			},
			setLocked(value: false) {
				setLocked(value);
			}
    };
  }, [answer, isLocked]);

  const handleInput = (event: React.KeyboardEvent<HTMLElement>) => {
		if (isLocked) {
			return;
		}

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
		} else { 
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
		fontSize: '24px',
		transition: 'border-color 0.3s ease',
		color: isLocked ? CELL_SELECTED_BORDER_COLOR : ''
	};

  return (<div
			className="sudoku-cell"
			style={cellStyle}
      tabIndex={1}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
			onKeyDown={handleInput}
			key={props.index}
			ref={cellRef}
    >
		{
			(answer == null) ?
			<GuessesGrid guessesBitset={guessesBitset}/> :
			answer
		}
    </div>);
});

export default SudokuCell;
