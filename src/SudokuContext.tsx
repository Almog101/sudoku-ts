import { createContext, useContext } from 'react';

interface SudokuContextType {
  is_guessing: boolean;
}

let SudokuContext = createContext<SudokuContextType>({
  is_guessing: false,
});

export let useSudokuContext = () => useContext(SudokuContext);
