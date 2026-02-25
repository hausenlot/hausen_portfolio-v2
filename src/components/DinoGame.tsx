import { useState } from 'react';

const DinoGame = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* App Icon */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
            >
                <div className="w-16 h-16 bg-white dark:bg-zinc-800 border-2 border-black dark:border-white rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" stroke="none">
                        {/* Simple dino silhouette */}
                        <rect x="18" y="4" width="10" height="4" />
                        <rect x="14" y="8" width="14" height="4" />
                        <rect x="22" y="8" width="2" height="2" fill="white" />
                        <rect x="14" y="12" width="10" height="4" />
                        <rect x="10" y="14" width="4" height="2" />
                        <rect x="14" y="16" width="6" height="4" />
                        <rect x="22" y="16" width="4" height="2" />
                        <rect x="14" y="20" width="4" height="4" />
                        <rect x="20" y="20" width="4" height="4" />
                        <rect x="14" y="24" width="2" height="4" />
                        <rect x="22" y="24" width="2" height="4" />
                    </svg>
                </div>
                <span className="text-white text-xs font-bold tracking-tight">DINO RUN</span>
            </button>

            {/* Game Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    <div className="w-full max-w-sm mx-4 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 transition-all duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold tracking-tight">DINO RUN</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center font-bold text-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Score */}
                        <div className="flex justify-between font-mono text-sm mb-4">
                            <span>SCORE: 0000</span>
                            <span>HI: 0000</span>
                        </div>

                        {/* Canvas Placeholder */}
                        <div className="border-2 border-black dark:border-white bg-gray-50 dark:bg-zinc-800 relative overflow-hidden transition-all duration-300" style={{ height: '200px' }}>
                            {/* Ground line */}
                            <div className="absolute bottom-8 left-0 right-0 border-t-2 border-black dark:border-white" />

                            {/* Placeholder Dino */}
                            <div className="absolute bottom-8 left-8 w-8 h-12 bg-black dark:bg-white" />

                            {/* Placeholder Cactus */}
                            <div className="absolute bottom-8 right-16 w-4 h-10 bg-black dark:bg-white" />
                            <div className="absolute bottom-8 right-12 w-3 h-6 bg-black dark:bg-white" />

                            {/* Placeholder Cloud */}
                            <div className="absolute top-6 right-20 w-10 h-3 bg-gray-300 rounded" />
                            <div className="absolute top-10 left-12 w-8 h-2 bg-gray-200 rounded" />

                            {/* "Game not started" overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-900/80">
                                <p className="font-mono font-bold text-sm">PRESS SPACE OR TAP TO START</p>
                            </div>
                        </div>

                        {/* Controls hint */}
                        <div className="mt-4 text-center">
                            <p className="font-mono text-xs text-gray-500 dark:text-gray-400">SPACE / TAP = JUMP &nbsp; ↓ = DUCK</p>
                        </div>

                        {/* Start Button */}
                        <button
                            className="w-full mt-4 border-2 border-black dark:border-white py-3 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
                        >
                            START GAME
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DinoGame;
