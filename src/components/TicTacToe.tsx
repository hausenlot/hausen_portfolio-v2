import { useState } from 'react';

type CellValue = 'X' | 'O' | null;

const TicTacToe = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [score, setScore] = useState({ you: 0, ai: 0, draws: 0 });

    const calculateWinner = (squares: CellValue[]): CellValue => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6],             // diagonals
        ];
        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every((cell) => cell !== null);

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const newWinner = calculateWinner(newBoard);
        if (newWinner) {
            setScore((prev) => ({
                ...prev,
                [newWinner === 'X' ? 'you' : 'ai']: prev[newWinner === 'X' ? 'you' : 'ai'] + 1,
            }));
        } else if (newBoard.every((cell) => cell !== null)) {
            setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const statusText = winner
        ? `${winner === 'X' ? 'YOU' : 'AI'} WIN!`
        : isDraw
            ? 'DRAW!'
            : `${isXNext ? 'YOUR' : "AI'S"} TURN`;

    return (
        <>
            {/* App Icon */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
            >
                <div className="w-16 h-16 bg-white dark:bg-zinc-800 border-2 border-black dark:border-white rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                    {/* Mini tic-tac-toe grid icon */}
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                        {/* Grid lines */}
                        <line x1="11" y1="4" x2="11" y2="28" />
                        <line x1="21" y1="4" x2="21" y2="28" />
                        <line x1="4" y1="11" x2="28" y2="11" />
                        <line x1="4" y1="21" x2="28" y2="21" />
                        {/* X in top-left */}
                        <line x1="5" y1="5" x2="9" y2="9" />
                        <line x1="9" y1="5" x2="5" y2="9" />
                        {/* O in center */}
                        <circle cx="16" cy="16" r="3" fill="none" />
                    </svg>
                </div>
                <span className="text-white text-xs font-bold tracking-tight">TIC-TAC-TOE</span>
            </button>

            {/* Game Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    <div className="w-full max-w-sm mx-4 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 transition-all duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold tracking-tight">TIC-TAC-TOE</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center font-bold text-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Status */}
                        <div className="text-center mb-4">
                            <p className="font-mono font-bold text-lg">{statusText}</p>
                        </div>

                        {/* Board */}
                        <div className="grid grid-cols-3 border-2 border-black dark:border-white mb-6">
                            {board.map((cell, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleClick(i)}
                                    className={`aspect-square border border-black dark:border-white flex items-center justify-center text-3xl font-bold cursor-pointer transition-all duration-300
                                        ${!cell && !winner ? 'hover:bg-gray-100 dark:hover:bg-zinc-800' : ''}
                                        ${cell === 'X' ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                                >
                                    {cell}
                                </button>
                            ))}
                        </div>

                        {/* Score */}
                        <div className="flex justify-between items-center font-mono text-sm mb-4 px-2">
                            <span>YOU: {score.you}</span>
                            <span>DRAW: {score.draws}</span>
                            <span>AI: {score.ai}</span>
                        </div>

                        {/* Reset */}
                        <button
                            onClick={resetGame}
                            className="w-full border-2 border-black dark:border-white py-3 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
                        >
                            {winner || isDraw ? 'PLAY AGAIN' : 'RESET'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TicTacToe;
