import { useState } from 'react';

const TextToSpeech = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    const handleSpeak = () => {
        if (!text.trim()) return;
        setIsPlaying(true);
        // TODO: plug in WebSpeech API
        setTimeout(() => setIsPlaying(false), 2000);
    };

    return (
        <>
            {/* App Icon */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
            >
                <div className="w-16 h-16 bg-white dark:bg-zinc-800 border-2 border-black dark:border-white rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                        {/* Speaker icon */}
                        <rect x="4" y="11" width="6" height="10" rx="1" fill="currentColor" stroke="none" />
                        <path d="M10 11 L18 5 L18 27 L10 21 Z" fill="currentColor" stroke="none" />
                        {/* Sound waves */}
                        <path d="M22 12 C24 14 24 18 22 20" strokeLinecap="round" />
                        <path d="M25 9 C28 13 28 19 25 23" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="text-white text-xs font-bold tracking-tight">TTS</span>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    <div className="w-full max-w-sm mx-4 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 transition-all duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold tracking-tight">TEXT TO SPEECH</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center font-bold text-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Text Input */}
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type something to speak..."
                            className="w-full h-40 border-2 border-black dark:border-white p-4 font-mono text-sm resize-none focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 mb-4 bg-white dark:bg-zinc-800 dark:text-zinc-100 transition-all duration-300"
                        />

                        {/* Voice Selector */}
                        <div className="mb-6">
                            <label className="font-mono text-xs font-bold block mb-2">VOICE</label>
                            <select className="w-full border-2 border-black dark:border-white p-3 font-mono text-sm bg-white dark:bg-zinc-800 dark:text-zinc-100 cursor-pointer focus:outline-none transition-all duration-300">
                                <option>Default</option>
                                <option>Google US English</option>
                                <option>Google UK English</option>
                            </select>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleSpeak}
                                disabled={!text.trim() || isPlaying}
                                className={`flex-1 border-2 border-black dark:border-white py-3 font-bold transition-all duration-300 cursor-pointer
                                    ${isPlaying
                                        ? 'bg-black dark:bg-white text-white dark:text-black'
                                        : 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'}
                                    ${!text.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
                            >
                                {isPlaying ? '🔊 SPEAKING...' : '▶ SPEAK'}
                            </button>
                            <button
                                onClick={() => setText('')}
                                className="border-2 border-black dark:border-white px-4 py-3 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
                            >
                                CLEAR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TextToSpeech;
