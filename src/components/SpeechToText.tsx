import { useState } from 'react';

const SpeechToText = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
            // TODO: stop WebSpeech recognition
        } else {
            setIsListening(true);
            // TODO: start WebSpeech recognition
            // Placeholder: simulate a transcript after 3s
            setTimeout(() => {
                setTranscript((prev) => prev + (prev ? ' ' : '') + 'Hello, this is a test transcript.');
                setIsListening(false);
            }, 3000);
        }
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
                        {/* Microphone body */}
                        <rect x="12" y="4" width="8" height="14" rx="4" fill="currentColor" stroke="none" />
                        {/* Mic arc */}
                        <path d="M8 16 C8 22 12 26 16 26 C20 26 24 22 24 16" strokeLinecap="round" />
                        {/* Stand */}
                        <line x1="16" y1="26" x2="16" y2="30" />
                        <line x1="12" y1="30" x2="20" y2="30" />
                    </svg>
                </div>
                <span className="text-white text-xs font-bold tracking-tight">STT</span>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    <div className="w-full max-w-sm mx-4 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 transition-all duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold tracking-tight">SPEECH TO TEXT</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center font-bold text-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Mic Button */}
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={toggleListening}
                                className={`w-24 h-24 rounded-full border-4 border-black dark:border-white flex items-center justify-center transition-all duration-300 cursor-pointer
                                    ${isListening
                                        ? 'bg-black dark:bg-white text-white dark:text-black scale-110 animate-pulse'
                                        : 'bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
                            >
                                <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <rect x="12" y="4" width="8" height="14" rx="4" fill="currentColor" stroke="none" />
                                    <path d="M8 16 C8 22 12 26 16 26 C20 26 24 22 24 16" strokeLinecap="round" />
                                    <line x1="16" y1="26" x2="16" y2="30" />
                                    <line x1="12" y1="30" x2="20" y2="30" />
                                </svg>
                            </button>
                        </div>

                        {/* Status */}
                        <p className="text-center font-mono text-sm font-bold mb-4">
                            {isListening ? '🔴 LISTENING...' : 'TAP TO SPEAK'}
                        </p>

                        {/* Transcript */}
                        <div className="border-2 border-black dark:border-white p-4 min-h-[120px] mb-4 transition-all duration-300">
                            {transcript ? (
                                <p className="font-mono text-sm leading-relaxed">{transcript}</p>
                            ) : (
                                <p className="font-mono text-sm text-gray-400">Transcript will appear here...</p>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    if (transcript) {
                                        navigator.clipboard.writeText(transcript);
                                    }
                                }}
                                disabled={!transcript}
                                className={`flex-1 border-2 border-black dark:border-white py-3 font-bold transition-all duration-300 cursor-pointer
                                    ${transcript ? 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black' : 'opacity-40 cursor-not-allowed'}`}
                            >
                                COPY
                            </button>
                            <button
                                onClick={() => setTranscript('')}
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

export default SpeechToText;
