import { useState } from "react"
import Cell from "./Cell"

function App() {
	const [isGuessing, setGuessing] = useState(true);

	const onCheck = () => {
		setGuessing(!isGuessing);
	}

	return (
		<>
			<h1>Hello World</h1>
			<Cell row={0} column={0} isGuessing={isGuessing}/>
			<Cell row={0} column={1} isGuessing={isGuessing}/>
			<Cell row={0} column={2} isGuessing={isGuessing}/>
			<input type="checkbox" value={isGuessing ? "on" : "off"} onChange={onCheck}/>
		</>
  )
}

export default App
