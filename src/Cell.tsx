import { useState } from "react";

const CELL_DEFAULT_BORDER_COLOR = "#ccc";
const CELL_SELECTED_BORDER_COLOR = "#68a7ca";

const Cell = (props: { key: number }) => {
  const [isSelected, setSelected] = useState(false);
  const [guessesBitset, setGuesses] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);
	// TODO: change to global
	const is_guessing = true;

  const onKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
		var newDigit = Number(event.key);
    
		if (isNaN(newDigit)) {
      return;
    };

		if (newDigit == 0) {
			return;
		};

		if (is_guessing) { 
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
		width: '50px',
		height: '50px',
		border: '1px solid ' + CELL_DEFAULT_BORDER_COLOR,
		borderColor: isSelected ? CELL_SELECTED_BORDER_COLOR : CELL_DEFAULT_BORDER_COLOR,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		transition: 'border-color 0.3s ease',
	};

  return <div
			style={cellStyle}
      tabIndex={1}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      onKeyPress={onKeyPress}
			key={props.key}
    >
		{
			(answer == null) ?
			guessesString :
			answer
		}
    </div>
};

export default Cell;
