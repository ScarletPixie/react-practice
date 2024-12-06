import { useState } from "react";

const Score = ({Xscore, Oscore}) =>
{
	return (
		<div className="board-row">
			<p>X: {Xscore} | O: {Oscore}</p>
		</div>
	);
}

const WinnerMessage = ({squares}) =>
{
	const winner = getWinner(squares);
	if (winner !== null)
		return (<p>Winner: {winner}</p>);
}

const Square = ({value, handleClick}) =>
{
	return <button className="square" onClick={handleClick}>{value}</button>;
}

const Board = () =>
{
	const [Xscore, setXscore] = useState(0);
	const [Oscore, setOscore] = useState(0);
	const [history, setHistory] = useState(Array(0));
	const [turn, setTurn] = useState(0);
	const [squares, SetSquares] = useState(Array(9).fill(null));

	function resetGame()
	{
		const winner = getWinner(squares);
		setXscore(Xscore + (winner === 'X'));
		setOscore(Oscore + (winner === 'O'));
		SetSquares(Array(9).fill(null));
		setTurn(0);
	}

	function handleClick(i)
	{
		if (squares[i] || getWinner(squares))
			return;

		const squaresCopy = squares.slice();
		const historyCopy = history.slice();
		historyCopy.push(squares);
		setHistory(historyCopy);
		setTurn(!turn);
		squaresCopy[i] = turn ? 'X' : 'O';
		SetSquares(squaresCopy);
	}

	function undo()
	{
		if (history.length <= 0)
			return;

		const historyCopy = history.slice();
		const targetHistory = historyCopy.pop();
		SetSquares(targetHistory)
		setHistory(historyCopy)
		setTurn(!turn)
	}

	return (
		<>
			<div className="board-row">
				<button onClick={resetGame}>Reset Game</button>
			</div>
			<div className="board-row">
				<p>Next PLayer: {turn ? 'X' : 'O'}</p>
			</div>
			<div className="board-row">
				<Square handleClick={() => handleClick(0)} value={squares[0]}/>
				<Square handleClick={() => handleClick(1)} value={squares[1]}/>
				<Square handleClick={() => handleClick(2)} value={squares[2]}/>
			</div>
			<div className="board-row">
				<Square handleClick={() => handleClick(3)} value={squares[3]}/>
				<Square handleClick={() => handleClick(4)} value={squares[4]}/>
				<Square handleClick={() => handleClick(5)} value={squares[5]}/>
			</div>
			<div className="board-row">
				<Square handleClick={() => handleClick(6)} value={squares[6]}/>
				<Square handleClick={() => handleClick(7)} value={squares[7]}/>
				<Square handleClick={() => handleClick(8)} value={squares[8]}/>
			</div>
			<div className="board-row">
				<button onClick={undo}>Undo</button>
			</div>
			<Score Xscore={Xscore} Oscore={Oscore} />
			<div className="board-row">
				<WinnerMessage squares={squares}/>
			</div>

		</>
	);
}

export default Board

function getWinner(squares)
{
	const boardLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (const line of boardLines)
	{
		if (squares[line[0]] && squares[line[0]] === squares[line[1]] && squares[line[0]] === squares[line[2]])
			return squares[line[0]];
	}

	return null;
}