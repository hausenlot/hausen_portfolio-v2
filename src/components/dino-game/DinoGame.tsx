import { useRef, useEffect, useState, useCallback } from 'react';
import { DinoGameEngine, type GameState } from './gameEngine';
import type { GameColors } from './sprites';

const DinoGame = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [gameState, setGameState] = useState<GameState>('IDLE');
    const [score, setScore] = useState(0);
    const [hiScore, setHiScore] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<DinoGameEngine | null>(null);

    const getColors = useCallback((): GameColors => {
        const style = getComputedStyle(document.documentElement);
        return {
            ink: style.getPropertyValue('--ink').trim(),
            inkMuted: style.getPropertyValue('--ink-muted').trim(),
            accent: style.getPropertyValue('--accent').trim(),
            border: style.getPropertyValue('--border').trim(),
            surface: style.getPropertyValue('--surface').trim(),
            bg: style.getPropertyValue('--bg').trim(),
        };
    }, []);

    // Initialize engine when modal opens
    useEffect(() => {
        if (!isOpen) return;

        // Wait for DOM to render the canvas
        const timer = setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            // Size the canvas to its container
            const container = canvas.parentElement!;
            canvas.width = container.clientWidth;
            canvas.height = 200;

            const engine = new DinoGameEngine();
            engine.init(
                canvas,
                getColors,
                (state) => setGameState(state),
                (s, hi) => { setScore(s); setHiScore(hi); },
            );
            engineRef.current = engine;
        }, 50);

        return () => {
            clearTimeout(timer);
            engineRef.current?.destroy();
            engineRef.current = null;
            setGameState('IDLE');
        };
    }, [isOpen, getColors]);

    // Theme change observer — redraw on class toggle
    useEffect(() => {
        if (!isOpen) return;
        const observer = new MutationObserver(() => {
            engineRef.current?.redraw();
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, [isOpen]);

    // Keyboard controls
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                engineRef.current?.handleInput('jump');
            } else if (e.code === 'ArrowDown') {
                e.preventDefault();
                engineRef.current?.handleInput('duck-start');
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'ArrowDown') {
                engineRef.current?.handleInput('duck-end');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isOpen]);

    // Touch controls
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        engineRef.current?.handleInput('jump');
    }, []);

    const formatScore = (s: number) => String(s).padStart(5, '0');

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="app-icon-btn">
                <div className="app-icon">
                    <svg width="44" height="42" viewBox="0 0 22 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12" y="0" width="9" height="1" />
                        <rect x="12" y="1" width="1" height="1" />
                        <rect x="14" y="1" width="1" height="1" />
                        <rect x="16" y="1" width="6" height="1" />
                        <rect x="12" y="2" width="2" height="1" />
                        <rect x="15" y="2" width="7" height="1" />
                        <rect x="12" y="3" width="1" height="1" />
                        <rect x="14" y="3" width="1" height="1" />
                        <rect x="16" y="3" width="6" height="1" />
                        <rect x="12" y="4" width="10" height="1" />
                        <rect x="12" y="5" width="2" height="1" />
                        <rect x="12" y="6" width="2" height="1" />
                        <rect x="12" y="7" width="8" height="1" />
                        <rect x="1" y="8" width="1" height="1" />
                        <rect x="11" y="8" width="5" height="1" />
                        <rect x="1" y="9" width="1" height="1" />
                        <rect x="9" y="9" width="7" height="1" />
                        <rect x="1" y="10" width="2" height="1" />
                        <rect x="7" y="10" width="9" height="1" />
                        <rect x="16" y="10" width="1" height="1" />
                        <rect x="17" y="10" width="1" height="1" />
                        <rect x="1" y="11" width="3" height="1" />
                        <rect x="6" y="11" width="10" height="1" />
                        <rect x="17" y="11" width="1" height="1" />
                        <rect x="1" y="12" width="15" height="1" />
                        <rect x="1" y="13" width="14" height="1" />
                        <rect x="2" y="14" width="12" height="1" />
                        <rect x="3" y="15" width="11" height="1" />
                        <rect x="4" y="16" width="9" height="1" />
                        <rect x="5" y="17" width="3" height="1" />
                        <rect x="10" y="17" width="3" height="1" />
                        <rect x="5" y="18" width="2" height="1" />
                        <rect x="10" y="18" width="2" height="1" />
                        <rect x="5" y="19" width="1" height="1" />
                        <rect x="10" y="19" width="1" height="1" />
                        <rect x="5" y="20" width="2" height="1" />
                        <rect x="10" y="20" width="2" height="1" />
                    </svg>
                </div>
                <span className="app-icon-label">Dino Run</span>
            </button>

            {isOpen && (
                <div className="app-overlay">
                    <div className="app-modal dino-modal">
                        <div className="app-modal-header">
                            <h3>Dino Run</h3>
                            <button onClick={() => setIsOpen(false)} className="app-close-btn">✕</button>
                        </div>

                        <div className="dino-score-bar">
                            <span>SCORE: {formatScore(score)}</span>
                            <span>HI: {formatScore(hiScore)}</span>
                        </div>

                        <div className="dino-canvas-wrap">
                            <canvas
                                ref={canvasRef}
                                onTouchStart={handleTouchStart}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    imageRendering: 'pixelated',
                                }}
                            />

                            {gameState === 'IDLE' && (
                                <div className="dino-overlay">
                                    <p className="dino-overlay-text">Press Space or tap to start</p>
                                </div>
                            )}

                            {gameState === 'GAME_OVER' && (
                                <div className="dino-overlay">
                                    <p className="dino-overlay-title">GAME OVER</p>
                                    <p className="dino-overlay-text">Score: {formatScore(score)}</p>
                                </div>
                            )}
                        </div>

                        <p className="dino-controls-hint">
                            SPACE / TAP = Jump &nbsp; ↓ = Duck
                        </p>

                        {gameState === 'GAME_OVER' ? (
                            <button
                                className="app-action-btn"
                                onClick={() => engineRef.current?.handleInput('jump')}
                            >
                                Restart
                            </button>
                        ) : gameState === 'IDLE' ? (
                            <button
                                className="app-action-btn"
                                onClick={() => engineRef.current?.handleInput('jump')}
                            >
                                Start game
                            </button>
                        ) : null}
                    </div>
                </div>
            )}

            <style>{`
                .dino-modal {
                    max-width: 460px;
                }
                .dino-score-bar {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    font-family: var(--sans);
                    font-weight: 500;
                    color: var(--ink-muted);
                    margin-bottom: 12px;
                    letter-spacing: 0.05em;
                }
                .dino-canvas-wrap {
                    position: relative;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    background: var(--surface);
                    touch-action: none;
                }
                .dino-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    background: color-mix(in srgb, var(--surface) 85%, transparent);
                    backdrop-filter: blur(2px);
                }
                .dino-overlay-title {
                    font-family: var(--sans);
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--ink);
                    letter-spacing: 0.05em;
                }
                .dino-overlay-text {
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--ink-muted);
                }
                .dino-controls-hint {
                    text-align: center;
                    font-size: 12px;
                    color: var(--ink-muted);
                    margin-top: 12px;
                    margin-bottom: 16px;
                }
            `}</style>
        </>
    );
};

export default DinoGame;
