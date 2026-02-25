import { useState } from 'react';
import { useWebSpeechTTS } from './useWebSpeechTTS';

const TextToSpeech = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    const tts = useWebSpeechTTS();

    const handleSpeak = () => {
        if (!text.trim()) return;
        tts.speak(text);
    };



    // Build a readable language label, e.g. "English (US)" from "en-US"
    const langDisplayName = (langCode: string) => {
        try {
            const dn = new Intl.DisplayNames([langCode], { type: 'language' });
            return dn.of(langCode) || langCode;
        } catch {
            return langCode;
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="app-icon-btn">
                <div className="app-icon">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="4" y="11" width="6" height="10" rx="1" fill="currentColor" stroke="none" />
                        <path d="M10 11 L18 5 L18 27 L10 21 Z" fill="currentColor" stroke="none" />
                        <path d="M22 12 C24 14 24 18 22 20" strokeLinecap="round" />
                        <path d="M25 9 C28 13 28 19 25 23" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="app-icon-label">TTS</span>
            </button>

            {isOpen && (
                <div className="app-overlay">
                    <div className="app-modal tts-modal">
                        <div className="app-modal-header">
                            <h3>Text to Speech</h3>
                            <button
                                onClick={() => {
                                    tts.stop();
                                    setIsOpen(false);
                                }}
                                className="app-close-btn"
                            >
                                ✕
                            </button>
                        </div>

                        {!tts.isSupported ? (
                            <div className="tts-unsupported">
                                <p>Your browser does not support the Web Speech API.</p>
                            </div>
                        ) : (
                            <>
                                {/* Text input */}
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Type something to speak..."
                                    className="tts-textarea"
                                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                                />

                                {/* Controls grid */}
                                <div className="tts-controls-grid">
                                    {/* Language */}
                                    <div className="tts-field">
                                        <label className="tts-label">Language</label>
                                        <select
                                            className="tts-select"
                                            value={tts.selectedLang}
                                            onChange={(e) => tts.setSelectedLang(e.target.value)}
                                        >
                                            {tts.languages.map((lang) => (
                                                <option key={lang} value={lang}>
                                                    {langDisplayName(lang)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Voice */}
                                    <div className="tts-field">
                                        <label className="tts-label">Voice</label>
                                        <select
                                            className="tts-select"
                                            value={tts.selectedVoice?.name || ''}
                                            onChange={(e) => tts.setSelectedVoiceByName(e.target.value)}
                                        >
                                            {tts.filteredVoices.map((v) => (
                                                <option key={v.name} value={v.name}>
                                                    {v.name}
                                                    {v.localService ? '' : ' ☁️'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Sliders */}
                                <div className="tts-sliders">
                                    <div className="tts-slider-row">
                                        <label className="tts-label">
                                            Rate <span className="tts-slider-value">{tts.rate.toFixed(1)}×</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="2"
                                            step="0.1"
                                            value={tts.rate}
                                            onChange={(e) => tts.setRate(Number(e.target.value))}
                                            className="tts-range"
                                        />
                                    </div>
                                    <div className="tts-slider-row">
                                        <label className="tts-label">
                                            Pitch <span className="tts-slider-value">{tts.pitch.toFixed(1)}</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="2"
                                            step="0.1"
                                            value={tts.pitch}
                                            onChange={(e) => tts.setPitch(Number(e.target.value))}
                                            className="tts-range"
                                        />
                                    </div>
                                </div>

                                {/* Output device (Chromium only) */}
                                {tts.supportsDeviceSelection && tts.outputDevices.length > 0 && (
                                    <div className="tts-field">
                                        <label className="tts-label">Output Device</label>
                                        <select
                                            className="tts-select"
                                            value={tts.selectedDeviceId}
                                            onChange={(e) => tts.setSelectedDeviceId(e.target.value)}
                                        >
                                            {tts.outputDevices.map((d) => (
                                                <option key={d.deviceId} value={d.deviceId}>
                                                    {d.label || `Speaker ${d.deviceId.slice(0, 8)}`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="tts-actions">
                                    {!tts.isSpeaking && !tts.isPaused && (
                                        <button
                                            onClick={handleSpeak}
                                            disabled={!text.trim()}
                                            className="app-action-btn"
                                            style={{
                                                flex: 1,
                                                opacity: !text.trim() ? 0.4 : 1,
                                                cursor: !text.trim() ? 'not-allowed' : 'pointer',
                                            }}
                                        >
                                            ▶ Speak
                                        </button>
                                    )}

                                    {tts.isSpeaking && !tts.isPaused && (
                                        <>
                                            <button onClick={tts.pause} className="tts-ctrl-btn tts-ctrl-pause">
                                                ⏸ Pause
                                            </button>
                                            <button onClick={tts.stop} className="tts-ctrl-btn tts-ctrl-stop">
                                                ⏹ Stop
                                            </button>
                                        </>
                                    )}

                                    {tts.isPaused && (
                                        <>
                                            <button onClick={tts.resume} className="tts-ctrl-btn tts-ctrl-resume">
                                                ▶ Resume
                                            </button>
                                            <button onClick={tts.stop} className="tts-ctrl-btn tts-ctrl-stop">
                                                ⏹ Stop
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => setText('')}
                                        className="tts-ctrl-btn tts-ctrl-clear"
                                    >
                                        Clear
                                    </button>
                                </div>

                                {/* Speaking indicator */}
                                {tts.isSpeaking && (
                                    <div className="tts-speaking-indicator">
                                        <span className="tts-dot" />
                                        <span className="tts-dot" style={{ animationDelay: '0.15s' }} />
                                        <span className="tts-dot" style={{ animationDelay: '0.3s' }} />
                                        <span className="tts-speaking-text">
                                            {tts.isPaused ? 'Paused' : 'Speaking...'}
                                        </span>
                                    </div>
                                )}


                            </>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                .tts-modal {
                    max-width: 440px !important;
                }
                .tts-unsupported {
                    text-align: center;
                    padding: 24px 0;
                    color: var(--ink-muted);
                    font-size: 14px;
                }
                .tts-textarea {
                    width: 100%;
                    height: 110px;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 14px;
                    font-family: var(--sans);
                    font-size: 14px;
                    resize: none;
                    outline: none;
                    background: var(--surface);
                    color: var(--ink);
                    margin-bottom: 16px;
                    transition: border-color 0.2s;
                    line-height: 1.6;
                }
                .tts-controls-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 14px;
                }
                .tts-field {
                    margin-bottom: 12px;
                }
                .tts-label {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--ink-muted);
                    margin-bottom: 6px;
                }
                .tts-slider-value {
                    font-weight: 500;
                    color: var(--accent);
                    font-size: 12px;
                    letter-spacing: 0;
                    text-transform: none;
                }
                .tts-select {
                    width: 100%;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    padding: 8px 12px;
                    font-family: var(--sans);
                    font-size: 13px;
                    background: var(--surface);
                    color: var(--ink);
                    cursor: pointer;
                    outline: none;
                    transition: border-color 0.2s;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B6560' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    padding-right: 32px;
                }
                .tts-select:focus {
                    border-color: var(--accent);
                }
                .tts-sliders {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 14px;
                }
                .tts-slider-row {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .tts-range {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 100%;
                    height: 4px;
                    border-radius: 2px;
                    background: var(--border);
                    outline: none;
                    cursor: pointer;
                }
                .tts-range::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--accent);
                    border: 2px solid var(--white);
                    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
                    cursor: pointer;
                    transition: transform 0.15s;
                }
                .tts-range::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }
                .tts-range::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--accent);
                    border: 2px solid var(--white);
                    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
                    cursor: pointer;
                }
                .tts-actions {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 12px;
                }
                .tts-ctrl-btn {
                    flex: 1;
                    padding: 10px 12px;
                    border-radius: 40px;
                    border: 1px solid var(--border);
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--sans);
                    background: var(--surface);
                    color: var(--ink);
                }
                .tts-ctrl-btn:hover {
                    border-color: var(--ink);
                }
                .tts-ctrl-pause {
                    background: var(--accent);
                    color: var(--white);
                    border-color: var(--accent);
                }
                .tts-ctrl-pause:hover {
                    opacity: 0.9;
                    border-color: var(--accent);
                }
                .tts-ctrl-resume {
                    background: var(--ink);
                    color: var(--bg);
                    border-color: var(--ink);
                }
                .tts-ctrl-resume:hover {
                    background: var(--accent);
                    border-color: var(--accent);
                }
                .tts-ctrl-stop {
                    background: var(--surface);
                    color: var(--ink-muted);
                }
                .tts-ctrl-clear {
                    flex: 0 0 auto;
                    padding: 10px 16px;
                    background: var(--surface);
                    color: var(--ink-muted);
                }
                .tts-ctrl-clear:hover {
                    background: var(--ink);
                    color: var(--bg);
                    border-color: var(--ink);
                }
                .tts-speaking-indicator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 8px 0;
                    margin-bottom: 12px;
                }
                .tts-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--accent);
                    animation: ttsPulse 1s ease-in-out infinite;
                }
                @keyframes ttsPulse {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                .tts-speaking-text {
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--accent);
                    margin-left: 4px;
                }

                @media (max-width: 480px) {
                    .tts-modal {
                        max-height: 90dvh;
                        overflow-y: auto;
                        padding: 20px !important;
                    }
                    .tts-textarea {
                        height: 80px;
                        margin-bottom: 12px;
                        padding: 10px;
                        font-size: 13px;
                    }
                    .tts-controls-grid,
                    .tts-sliders {
                        grid-template-columns: 1fr;
                        gap: 8px;
                        margin-bottom: 10px;
                    }
                    .tts-field {
                        margin-bottom: 8px;
                    }
                    .tts-label {
                        font-size: 10px;
                        margin-bottom: 4px;
                    }
                    .tts-select {
                        padding: 7px 10px;
                        font-size: 12px;
                    }
                    .tts-range {
                        height: 3px;
                    }
                    .tts-actions {
                        margin-bottom: 10px;
                        gap: 6px;
                    }
                    .tts-ctrl-btn {
                        padding: 8px 10px;
                        font-size: 12px;
                    }

                    .tts-speaking-indicator {
                        padding: 4px 0;
                        margin-bottom: 8px;
                    }
                    .app-modal-header {
                        margin-bottom: 12px;
                    }
                }
            `}</style>
        </>
    );
};

export default TextToSpeech;
