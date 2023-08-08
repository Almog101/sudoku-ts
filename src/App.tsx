import { MutableRefObject, useEffect,  useState } from "react"
import SudokuGrid from "./SudokuGrid";
import { Button, Checkbox, Stack, Tooltip } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { generateBoard, removeCellsFromBoard } from "./sudoku";

import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';

declare global {
    interface Window { 
			isGuessing: boolean; 
			board: MutableRefObject<any>[][];
		}
}

const GuessingCheckbox = () => {
	const [isGuessing, setGuessing] = useState(true);

	const onCheck = () => {
		window.isGuessing = !isGuessing;
		setGuessing(!isGuessing);
	}
	return (
		<Tooltip title="When enabled, the entered digit will be placed in the 'Guesses.' If disabled, the digit will be set as the final answer for the cell.">
			<Checkbox
        icon={<EditIcon />}
        checkedIcon={<EditIcon/>}
				checked={isGuessing}
				onChange={onCheck}
				/>
		</Tooltip>
	)
}

window.isGuessing = true;
window.board = Array(9);
for(var i: number = 0; i < 9; i++) {
		window.board[i] = Array(9);
}

function fillBoard() {
		let board = generateBoard();
		removeCellsFromBoard(board, 60);

		for (let y = 0; y<9; y++) {
			for (let x = 0; x<9; x++) {
				window.board[y][x].current.reset();

				if (board[y][x] !== 0) {
					window.board[y][x].current.setAnswer(board[y][x]);
					window.board[y][x].current.setLocked(true);
				}
			}
		}
}

const SolveButton = () => {
  const [isSolving, setIsSolving] = useState(false);

	let curr = 0;
	useEffect(() => {
		if (!isSolving)
			return;

    const intervalId = setInterval(() => {
			if (curr >= 80 ) {
				clearInterval(intervalId);
				setIsSolving(false);
				return;
			}

			const x = curr % 9;
			const y = Math.floor(curr / 9);

			if (window.board[y][x].current.isLocked()) {
				curr = (curr + 1) % 81;
				return;
			}

			window.board[y][x].current.setSelected(true);
			const answer = window.board[y][x].current.getAnswer();

			if (answer == 9) {
				window.board[y][x].current.setAnswer(null);
				window.board[y][x].current.setSelected(false);
				curr = (curr + 1) % 81;
				return;
			}

			window.board[y][x].current.setAnswer( answer + 1);
    }, 10);

    return () => {
			setIsSolving(false);
			clearInterval(intervalId);
    };
  }, [isSolving]);

	return (
		<>
			<LoadingButton 
				onClick={() => setIsSolving(true)}
				loading={isSolving} 
				loadingPosition="start"
				startIcon={<PlayArrowIcon/>}
				variant="contained"
			>
				Solve
			</LoadingButton>
		</>
	)
}

function App() {
	useEffect(fillBoard, []);

	return (
		<>
			<div className="main-container">
				<SudokuGrid/>
				<Stack direction="row" spacing={2}>
					<Button 
						className="" 
						onClick={() => fillBoard()} 
						variant="contained"
						startIcon={<RefreshIcon/>}
					>
						Generate
					</Button>
					<SolveButton/>
					<GuessingCheckbox/>
				</Stack>
			</div>
		</>
  )
}

export default App
