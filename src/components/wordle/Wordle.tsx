import { useState, useEffect, useCallback } from 'react';
import {
    fetchRandomWord,
    isValidWord,
    evaluateGuess,
    updateKeyboardStates,
    checkWin,
    checkLoss,
    initSpellChecker,
    type LetterState,
    type GameStatus,
} from './gameLogic';

const Wordle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [targetWord, setTargetWord] = useState('');
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
    const [letterStates, setLetterStates] = useState<Map<string, LetterState>>(new Map());
    const [isChecking, setIsChecking] = useState(false);
    const [isSpellCheckerReady, setIsSpellCheckerReady] = useState(false);
    const [shakeActiveRow, setShakeActiveRow] = useState(false);
    const [flashEffect, setFlashEffect] = useState<'won' | 'lost' | null>(null);

    // Initialize spell checker when component mounts
    useEffect(() => {
        initSpellChecker().then(() => {
            setIsSpellCheckerReady(true);
            console.log('Spell checker ready!');
        }).catch(error => {
            console.error('Failed to initialize spell checker:', error);
            setIsSpellCheckerReady(true); // Allow game to work even if spell checker fails
        });
    }, []);

    // Load a new word when modal opens
    useEffect(() => {
        if (isOpen) {
            loadNewGame();
        }
    }, [isOpen]);

    // Handle full-screen flash effect when game is won or lost
    useEffect(() => {
        if (gameStatus === 'won') {
            setFlashEffect('won');
            const timer = setTimeout(() => setFlashEffect(null), 1000);
            return () => clearTimeout(timer);
        } else if (gameStatus === 'lost') {
            setFlashEffect('lost');
            const timer = setTimeout(() => setFlashEffect(null), 1000);
            return () => clearTimeout(timer);
        } else {
            setFlashEffect(null);
        }
    }, [gameStatus]);

    const loadNewGame = async () => {
        let word = '';
        let valid = false;
        while (!valid) {
            word = await fetchRandomWord();
            console.log('Word Check: ', word)
            valid = await isValidWord(word);
            console.log('Valid?: ', valid)
        }
        setTargetWord(word);
        setGuesses([]);
        setCurrentGuess('');
        setGameStatus('playing');
        setLetterStates(new Map());
        setShakeActiveRow(false);
        setFlashEffect(null);
        console.log('Target word:', word); // For debugging - remove in production
    };

    const submitGuess = useCallback(async () => {
        if (gameStatus !== 'playing') return;

        if (isChecking) return;

        if (currentGuess.length !== 5) {
            setShakeActiveRow(true);
            setTimeout(() => setShakeActiveRow(false), 500);
            return;
        }

        setIsChecking(true);

        const valid = await isValidWord(currentGuess);

        if (!valid) {
            setShakeActiveRow(true);
            setTimeout(() => setShakeActiveRow(false), 500);
            setIsChecking(false);
            return;
        }

        const evaluation = evaluateGuess(currentGuess, targetWord);
        const newLetterStates = updateKeyboardStates(letterStates, currentGuess, evaluation);

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setLetterStates(newLetterStates);

        if (checkWin(currentGuess, targetWord)) {
            setGameStatus('won');
            setCurrentGuess('');
        } else if (checkLoss(newGuesses.length)) {
            setGameStatus('lost');
            setCurrentGuess('');
        } else {
            setCurrentGuess('');
        }

        setIsChecking(false);
    }, [currentGuess, gameStatus, guesses, targetWord, letterStates, isChecking]);

    const handleKeyPress = useCallback((key: string) => {
        if (gameStatus !== 'playing' || isChecking) return;

        if (key === 'ENTER') {
            submitGuess();
        } else if (key === 'DELETE' || key === 'BACKSPACE') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (key === 'CLEAR') {
            setCurrentGuess('');
        } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key);
        }
    }, [currentGuess, gameStatus, isChecking, submitGuess]);

    // Physical keyboard support
    useEffect(() => {
        const handlePhysicalKeyboard = (e: KeyboardEvent) => {
            if (!isOpen) return;

            const key = e.key.toUpperCase();
            if (key === 'ENTER') {
                e.preventDefault();
                handleKeyPress('ENTER');
            } else if (key === 'BACKSPACE') {
                e.preventDefault();
                handleKeyPress('DELETE');
            } else if (/^[A-Z]$/.test(key)) {
                e.preventDefault();
                handleKeyPress(key);
            }
        };

        window.addEventListener('keydown', handlePhysicalKeyboard);
        return () => window.removeEventListener('keydown', handlePhysicalKeyboard);
    }, [isOpen, handleKeyPress]);

    const getTileColor = (rowIndex: number, colIndex: number): LetterState => {
        if (rowIndex >= guesses.length) return 'empty';
        const guess = guesses[rowIndex];
        const evaluation = evaluateGuess(guess, targetWord);

        // If game is won and this is the winning guess, show correct
        if (gameStatus === 'won' && rowIndex === guesses.length - 1 && checkWin(guess, targetWord)) {
            return evaluation[colIndex];
        }

        // If game is lost, grey out all remaining unfilled tiles
        if (gameStatus === 'lost' && rowIndex >= guesses.length) {
            return 'empty';
        }

        return evaluation[colIndex];
    };

    const getKeyboardColor = (letter: string): string => {
        const state = letterStates.get(letter);
        switch (state) {
            case 'correct': return 'correct-key';
            case 'present': return 'present-key';
            case 'absent': return 'absent-key';
            default: return '';
        }
    };

    // Show loading state while spell checker initializes
    if (!isSpellCheckerReady && isOpen) {
        return (
            <>
                <button onClick={() => setIsOpen(true)} className="app-icon-btn">
                    <div className="app-icon">
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="6" width="24" height="20" rx="2" />
                            <line x1="8" y1="12" x2="24" y2="12" />
                            <line x1="8" y1="16" x2="24" y2="16" />
                            <line x1="8" y1="20" x2="24" y2="20" />
                            <circle cx="16" cy="16" r="8" strokeWidth="1.5" />
                            <line x1="16" y1="8" x2="16" y2="24" />
                            <line x1="8" y1="16" x2="24" y2="16" />
                        </svg>
                    </div>
                    <span className="app-icon-label">Wordle</span>
                </button>

                {isOpen && (
                    <div className="app-overlay">
                        <div className="app-modal wordle-modal">
                            <div className="app-modal-header">
                                <h3>Wordle</h3>
                                <button onClick={() => setIsOpen(false)} className="app-close-btn">✕</button>
                            </div>
                            <div className="wordle-game">
                                <div className="wordle-message">Loading dictionary...</div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="app-icon-btn">
                <div className="app-icon">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="6" width="24" height="20" rx="2" />
                        <line x1="8" y1="12" x2="24" y2="12" />
                        <line x1="8" y1="16" x2="24" y2="16" />
                        <line x1="8" y1="20" x2="24" y2="20" />
                        <circle cx="16" cy="16" r="8" strokeWidth="1.5" />
                        <line x1="16" y1="8" x2="16" y2="24" />
                        <line x1="8" y1="16" x2="24" y2="16" />
                    </svg>
                </div>
                <span className="app-icon-label">Wordle</span>
            </button>

            {isOpen && (
                <div className="app-overlay">
                    {flashEffect && (
                        <div className={`screen-flash flash-${flashEffect}`} />
                    )}
                    <div className={`app-modal wordle-modal ${gameStatus === 'won' ? 'game-won' : ''} ${gameStatus === 'lost' ? 'game-lost' : ''}`}>
                        <div className="app-modal-header">
                            <h3>Wordle</h3>
                            <div className="wordle-header-actions">
                                <button
                                    onClick={() => setCurrentGuess(targetWord)}
                                    className="hint-btn"
                                    disabled={guesses.length < 5 || gameStatus !== 'playing'}
                                    title={guesses.length < 5 ? "Hint available after 5 guesses" : "Reveal target word"}
                                    aria-label="Reveal target word"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                        <line x1="9" y1="18" x2="15" y2="18" />
                                        <line x1="10" y1="22" x2="14" y2="22" />
                                    </svg>
                                </button>
                                <button
                                    onClick={loadNewGame}
                                    className="new-game-btn"
                                    title="New game"
                                    aria-label="New game"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 4 23 10 17 10" />
                                        <polyline points="1 20 1 14 7 14" />
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
                                        <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
                                    </svg>
                                </button>
                                <button onClick={() => setIsOpen(false)} className="app-close-btn">✕</button>
                            </div>
                        </div>

                        <div className="wordle-game">
                            <div className="wordle-grid">
                                {Array.from({ length: 6 }).map((_, rowIndex) => {
                                    const isActiveRow = rowIndex === guesses.length;
                                    const isRowShaking = isActiveRow && shakeActiveRow;
                                    return (
                                        <div key={rowIndex} className={`wordle-row ${isRowShaking ? 'shake' : ''}`}>
                                            {Array.from({ length: 5 }).map((_, colIndex) => {
                                                let letter = '';
                                                let color = '';

                                                if (rowIndex < guesses.length) {
                                                    // Filled guess rows
                                                    letter = guesses[rowIndex][colIndex];
                                                    color = getTileColor(rowIndex, colIndex);
                                                } else if (rowIndex === guesses.length && gameStatus === 'playing') {
                                                    // Current active row (only show when playing)
                                                    letter = colIndex < currentGuess.length ? currentGuess[colIndex] : '';
                                                    color = 'empty';
                                                } else {
                                                    // Empty rows
                                                    letter = '';
                                                    color = 'empty';
                                                }

                                                return (
                                                    <div key={colIndex} className={`wordle-tile ${color}`}>
                                                        {letter}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="wordle-keyboard">
                                <div className="keyboard-row">
                                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
                                        <button
                                            key={key}
                                            className={`keyboard-key ${getKeyboardColor(key)}`}
                                            onClick={() => handleKeyPress(key)}
                                            disabled={isChecking}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                </div>
                                <div className="keyboard-row">
                                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
                                        <button
                                            key={key}
                                            className={`keyboard-key ${getKeyboardColor(key)}`}
                                            onClick={() => handleKeyPress(key)}
                                            disabled={isChecking}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                </div>
                                <div className="keyboard-row">
                                    <button
                                        className="keyboard-key"
                                        onClick={() => handleKeyPress('DELETE')}
                                        disabled={isChecking}
                                    >
                                        ⌫
                                    </button>
                                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(key => (
                                        <button
                                            key={key}
                                            className={`keyboard-key ${getKeyboardColor(key)}`}
                                            onClick={() => handleKeyPress(key)}
                                            disabled={isChecking}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                    <button
                                        className="keyboard-key"
                                        onClick={() => handleKeyPress('ENTER')}
                                        disabled={isChecking}
                                    >
                                        ↵
                                    </button>
                                </div>
                            </div>

                            <div className="wordle-actions">
                                <button
                                    className="action-btn clear-btn"
                                    onClick={() => handleKeyPress('CLEAR')}
                                    disabled={isChecking || gameStatus !== 'playing'}
                                >
                                    Clear
                                </button>
                                <button
                                    className="action-btn enter-btn"
                                    onClick={() => handleKeyPress('ENTER')}
                                    disabled={isChecking || gameStatus !== 'playing'}
                                >
                                    Enter
                                </button>
                                <button
                                    className="action-btn backspace-btn"
                                    onClick={() => handleKeyPress('DELETE')}
                                    disabled={isChecking || gameStatus !== 'playing'}
                                    aria-label="Remove last letter"
                                    title="Remove last letter"
                                >
                                    ⌫
                                </button>
                            </div>
                        </div>
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
                .wordle-modal {
                    max-width: 420px;
                }
                .app-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    position: relative;
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
                    justify-self: end;
                }
                .app-close-btn:hover {
                    background: var(--ink);
                    color: var(--bg);
                    border-color: var(--ink);
                }
                .new-game-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid var(--border);
                    background: var(--surface);
                    color: var(--ink-muted);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    font-family: var(--sans);
                    justify-self: center;
                }
                .new-game-btn:hover {
                    background: var(--ink);
                    color: var(--bg);
                    border-color: var(--ink);
                    transform: rotate(90deg);
                }
                .hint-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid var(--border);
                    background: var(--surface);
                    color: var(--ink-muted);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    font-family: var(--sans);
                }
                .hint-btn:hover:not(:disabled) {
                    background: var(--ink);
                    color: var(--bg);
                    border-color: var(--ink);
                    transform: scale(1.1);
                }
                .hint-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
                
                /* Wordle-specific styles */
                .wordle-game {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                }
                .wordle-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    align-items: center;
                }
                .wordle-row {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                }
                .wordle-tile {
                    width: 52px;
                    height: 52px;
                    border: 2px solid var(--border);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--sans);
                    font-size: 28px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: var(--ink);
                    background: var(--white);
                    transition: all 0.2s;
                }
                .wordle-tile.correct {
                    background: #6aaa64;
                    border-color: #6aaa64;
                    color: white;
                }
                .wordle-tile.present {
                    background: #c9b458;
                    border-color: #c9b458;
                    color: white;
                }
                .wordle-tile.absent {
                    background: #787c7e;
                    border-color: #787c7e;
                    color: white;
                }
                .wordle-keyboard {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    width: 100%;
                }
                .keyboard-row {
                    display: flex;
                    gap: 4px;
                    justify-content: center;
                }
                .keyboard-key {
                    min-width: 32px;
                    height: 44px;
                    padding: 0 8px;
                    border-radius: 4px;
                    border: 1px solid var(--border);
                    background: var(--surface);
                    color: var(--ink);
                    font-family: var(--sans);
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.1s;
                }
                .keyboard-key:hover:not(:disabled) {
                    background: var(--border);
                }
                .keyboard-key:disabled {
                    opacity: 0.5;
                    cursor: default;
                }
                .keyboard-key.correct-key {
                    background: #6aaa64;
                    border-color: #6aaa64;
                    color: white;
                }
                .keyboard-key.present-key {
                    background: #c9b458;
                    border-color: #c9b458;
                    color: white;
                }
                .keyboard-key.absent-key {
                    background: #787c7e;
                    border-color: #787c7e;
                    color: white;
                }
                .wordle-message {
                    height: 32px;
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--accent);
                    text-align: center;
                }
                .wordle-actions {
                    display: flex;
                    gap: 8px;
                    width: 100%;
                    margin-top: 4px;
                }
                .action-btn {
                    flex: 1;
                    padding: 12px;
                    border-radius: 40px;
                    border: none;
                    background: var(--surface);
                    color: var(--ink);
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s, color 0.2s;
                    font-family: var(--sans);
                    border: 1px solid var(--border);
                }
                .action-btn:hover:not(:disabled) {
                    background: var(--border);
                }
                .action-btn:disabled {
                    opacity: 0.5;
                    cursor: default;
                }
                .enter-btn {
                    flex: 1.4;
                    background: var(--ink);
                    color: var(--bg);
                    border-color: var(--ink);
                }
                .enter-btn:hover:not(:disabled) {
                    background: var(--accent);
                    border-color: var(--accent);
                }
                
                .wordle-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .screen-flash {
                    position: absolute;
                    inset: 0;
                    z-index: 10;
                    pointer-events: none;
                    animation: flash-fade 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                .screen-flash.flash-won {
                    background: rgba(106, 170, 100, 0.35);
                }
                .screen-flash.flash-lost {
                    background: rgba(239, 68, 68, 0.35);
                }
                @keyframes flash-fade {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }
                
                .wordle-modal.game-won {
                    border-color: #6aaa64;
                    box-shadow: 0 24px 64px rgba(106, 170, 100, 0.1), 0 0 20px rgba(106, 170, 100, 0.25);
                    animation: modal-won-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .wordle-modal.game-lost {
                    border-color: #ef4444;
                    box-shadow: 0 24px 64px rgba(239, 68, 68, 0.1), 0 0 20px rgba(239, 68, 68, 0.25);
                    animation: modal-lost-shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                
                @keyframes modal-won-pop {
                    0% { transform: scale(0.95); }
                    50% { transform: scale(1.03); }
                    100% { transform: scale(1); }
                }
                @keyframes modal-lost-shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                
                .wordle-row.shake {
                    animation: row-shake 0.5s ease-in-out;
                }
                .wordle-row.shake .wordle-tile {
                    border-color: #ef4444 !important;
                    color: #ef4444 !important;
                }
                
                @keyframes row-shake {
                    0%, 100% { transform: translateX(0); }
                    15%, 45%, 75% { transform: translateX(-4px); }
                    30%, 60%, 90% { transform: translateX(4px); }
                }
                
                .wordle-message.message-won {
                    color: #6aaa64;
                    font-size: 15px;
                    font-weight: 600;
                }
                .wordle-message.message-lost {
                    color: #ef4444;
                    font-size: 15px;
                    font-weight: 600;
                }
                
                @media (max-width: 480px) {
                    .wordle-tile {
                        width: 44px;
                        height: 44px;
                        font-size: 24px;
                    }
                    .keyboard-key {
                        min-width: 28px;
                        height: 40px;
                        font-size: 11px;
                    }
                }
                @media (max-width: 400px) {
                    .wordle-tile {
                        width: 38px;
                        height: 38px;
                        font-size: 20px;
                    }
                    .wordle-row {
                        gap: 5px;
                    }
                    .keyboard-row {
                        gap: 3px;
                    }
                    .keyboard-key {
                        min-width: 24px;
                        height: 36px;
                        font-size: 10px;
                    }
                    .action-btn {
                        font-size: 12px;
                        padding: 10px;
                    }
                }
            `}</style>
        </>
    );
};

export default Wordle;