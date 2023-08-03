import { useState } from "react";
import './SudokuCell.css';

const CELL_DEFAULT_BORDER_COLOR = "#ccc";
const CELL_SELECTED_BORDER_COLOR = "#68a7ca";

const GuessesGrid = (props: {guessesBitset: number}) => {
	return (
				<div className="grid-container">
					{[1, 2, 3].map((row) => (
						<div key={`row-${row}`} className="grid-row">
							{[1, 2, 3].map((col) => {
								const num = (col - 1) * 3 + row;
								return (
									<div
										key={`col-${col}`}
										className={`grid-item`}
									>
									{
										(props.guessesBitset & (1 << num)) ?
										num :
										' '
									}
									</div>
								);
							})}
						</div>
					))}
				</div>
	)
}

const Cell = (props: {row: number, column: number, isGuessing: boolean}) => {
  const [isSelected, setSelected] = useState(false);
  const [guessesBitset, setGuesses] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);
	const key = props.row * 3 + props.column;

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

		if (props.isGuessing) { 
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
		width: '100px',
		height: '100px',
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
			key={key}
    >
		{
			(answer == null) ?
			<GuessesGrid guessesBitset={guessesBitset}/> :
			answer
		}
    </div>
};

export default Cell;
