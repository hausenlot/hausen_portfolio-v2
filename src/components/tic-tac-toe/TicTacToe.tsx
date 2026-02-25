import { useState, useEffect, useCallback } from 'react';
import { type CellValue, checkWinner, findBestMove, findEasyMove } from './gameLogic';

const EMPTY_BOARD: CellValue[] = Array(9).fill('');

const TicTacToe = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [board, setBoard] = useState<CellValue[]>([...EMPTY_BOARD]);
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [gameActive, setGameActive] = useState(true);
    const [score, setScore] = useState({ you: 0, ai: 0, draws: 0 });
    const [winningCells, setWinningCells] = useState<number[]>([]);
    const [easyMode, setEasyMode] = useState(false);

    const result = checkWinner(board);

    // AI move
    useEffect(() => {
        if (currentPlayer !== 'O' || !gameActive || result) return;
        const pickMove = easyMode ? findEasyMove : findBestMove;

        const timer = setTimeout(() => {
            const move = pickMove([...board]);
            if (move === -1) return;

            const newBoard = [...board];
            newBoard[move] = 'O';
            setBoard(newBoard);
            setCurrentPlayer('X');

            const moveResult = checkWinner(newBoard);
            if (moveResult) {
                setGameActive(false);
                if (moveResult.pattern) setWinningCells(moveResult.pattern);
                if (moveResult.winner === 'O') {
                    setScore((s) => ({ ...s, ai: s.ai + 1 }));
                    setEasyMode(true); // go easy next round
                } else if (moveResult.winner === 'Tie') {
                    setScore((s) => ({ ...s, draws: s.draws + 1 }));
                    setEasyMode(true); // go easy next round
                }
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [currentPlayer, gameActive, board, result, easyMode]);

    const handleClick = useCallback(
        (index: number) => {
            if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

            const newBoard = [...board];
            newBoard[index] = 'X';
            setBoard(newBoard);

            const moveResult = checkWinner(newBoard);
            if (moveResult) {
                setGameActive(false);
                if (moveResult.pattern) setWinningCells(moveResult.pattern);
                if (moveResult.winner === 'X') {
                    setScore((s) => ({ ...s, you: s.you + 1 }));
                    setEasyMode(false); // won the easy round, back to hard
                } else if (moveResult.winner === 'Tie') {
                    setScore((s) => ({ ...s, draws: s.draws + 1 }));
                    setEasyMode(true); // go easy next round
                }
            } else {
                setCurrentPlayer('O');
            }
        },
        [board, gameActive, currentPlayer],
    );

    const resetGame = () => {
        setBoard([...EMPTY_BOARD]);
        setCurrentPlayer('X');
        setGameActive(true);
        setWinningCells([]);
    };

    const statusText = result
        ? result.winner === 'Tie'
            ? "It's a draw!"
            : result.winner === 'X'
                ? 'You win!'
                : 'AI wins!'
        : currentPlayer === 'X'
            ? 'Your turn'
            : 'AI is thinking…';

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="app-icon-btn">
                <div className="app-icon">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="11" y1="4" x2="11" y2="28" />
                        <line x1="21" y1="4" x2="21" y2="28" />
                        <line x1="4" y1="11" x2="28" y2="11" />
                        <line x1="4" y1="21" x2="28" y2="21" />
                        <line x1="5" y1="5" x2="9" y2="9" />
                        <line x1="9" y1="5" x2="5" y2="9" />
                        <circle cx="16" cy="16" r="3" fill="none" />
                    </svg>
                </div>
                <span className="app-icon-label">Tic-Tac-Toe</span>
            </button>

            {isOpen && (
                <div className="app-overlay">
                    <div className="app-modal">
                        <div className="app-modal-header">
                            <h3>Tic-Tac-Toe</h3>
                            <button onClick={() => setIsOpen(false)} className="app-close-btn">✕</button>
                        </div>

                        <p className="app-status">{statusText}</p>

                        <div className="ttt-board">
                            {board.map((cell, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleClick(i)}
                                    className={[
                                        'ttt-cell',
                                        !cell && gameActive && currentPlayer === 'X' ? 'ttt-cell-active' : '',
                                        cell === 'X' ? 'ttt-x' : '',
                                        winningCells.includes(i) ? 'ttt-winning' : '',
                                    ].join(' ')}
                                >
                                    {cell}
                                </button>
                            ))}
                        </div>

                        <div className="ttt-score">
                            <span>You: {score.you}</span>
                            <span>Draw: {score.draws}</span>
                            <span>AI: {score.ai}</span>
                        </div>

                        <button onClick={resetGame} className="app-action-btn">
                            {!gameActive ? 'Play again' : 'Reset'}
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .app-icon-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    background: none;
                    border: none;
                    font-family: var(--sans);
                }
                .app-icon {
                    width: 72px;
                    height: 72px;
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--ink);
                    transition: all 0.2s;
                }
                .app-icon-btn:hover .app-icon {
                    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
                    transform: translateY(-2px);
                }
                .app-icon-label {
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--ink-muted);
                    letter-spacing: 0.01em;
                }
                .app-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 200;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0,0,0,0.5);
                    backdrop-filter: blur(8px);
                }
                .app-modal {
                    width: 100%;
                    max-width: 380px;
                    margin: 0 16px;
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 28px;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.15);
                }
                .app-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .app-modal-header h3 {
                    font-family: var(--serif);
                    font-size: 22px;
                    font-weight: 300;
                    color: var(--ink);
                }
                .app-close-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid var(--border);
                    background: var(--surface);
                    color: var(--ink-muted);
                    font-size: 16px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    font-family: var(--sans);
                }
                .app-close-btn:hover {
                    background: var(--ink);
                    color: var(--bg);
                    border-color: var(--ink);
                }
                .app-status {
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--accent);
                    margin-bottom: 16px;
                }
                .app-action-btn {
                    width: 100%;
                    padding: 12px;
                    border-radius: 40px;
                    border: none;
                    background: var(--ink);
                    color: var(--bg);
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s;
                    font-family: var(--sans);
                }
                .app-action-btn:hover {
                    background: var(--accent);
                }
                .ttt-board {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 4px;
                    margin-bottom: 16px;
                    border-radius: 8px;
                    overflow: hidden;
                    background: var(--border);
                }
                .ttt-cell {
                    aspect-ratio: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--serif);
                    font-size: 28px;
                    font-weight: 300;
                    background: var(--white);
                    border: none;
                    color: var(--ink);
                    cursor: pointer;
                    transition: background 0.15s;
                }
                .ttt-cell-active:hover {
                    background: var(--surface);
                }
                .ttt-x {
                    color: var(--accent);
                }
                .ttt-winning {
                    background: var(--accent-light) !important;
                    border: 2px solid var(--accent);
                }
                .ttt-score {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    color: var(--ink-muted);
                    padding: 12px 4px;
                    margin-bottom: 16px;
                    border-top: 1px solid var(--border);
                    border-bottom: 1px solid var(--border);
                }
            `}</style>
        </>
    );
};

export default TicTacToe;
