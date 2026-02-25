import { useState } from 'react';
import { useWebSpeechSTT } from './useWebSpeechSTT';

const SpeechToText = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const stt = useWebSpeechSTT();

    const handleToggle = () => {
        if (stt.isListening) {
            stt.stop();
        } else {
            stt.start();
        }
    };

    const handleCopy = async () => {
        if (!stt.transcript) return;
        await navigator.clipboard.writeText(stt.transcript);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleClose = () => {
        stt.stop();
        setIsOpen(false);
    };

    // Build a readable language label
    const langDisplayName = (langCode: string) => {
        try {
            const dn = new Intl.DisplayNames([langCode], { type: 'language' });
            return dn.of(langCode) || langCode;
        } catch {
            return langCode;
        }
    };

    // Common recognition languages
    const languages = [
        'en-US', 'en-GB', 'en-AU',
        'es-ES', 'es-MX',
        'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'pt-PT',
        'ja-JP', 'ko-KR', 'zh-CN', 'zh-TW',
        'hi-IN', 'ar-SA', 'ru-RU', 'nl-NL',
        'pl-PL', 'sv-SE', 'da-DK', 'fi-FI', 'no-NO',
        'th-TH', 'vi-VN', 'id-ID', 'ms-MY',
        'fil-PH', 'tl-PH',
    ];

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="app-icon-btn">
                <div className="app-icon">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="12" y="4" width="8" height="14" rx="4" fill="currentColor" stroke="none" />
                        <path d="M8 16 C8 22 12 26 16 26 C20 26 24 22 24 16" strokeLinecap="round" />
                        <line x1="16" y1="26" x2="16" y2="30" />
                        <line x1="12" y1="30" x2="20" y2="30" />
                    </svg>
                </div>
                <span className="app-icon-label">STT</span>
            </button>

            {isOpen && (
                <div className="app-overlay">
                    <div className="app-modal stt-modal">
                        <div className="app-modal-header">
                            <h3>Speech to Text</h3>
                            <button onClick={handleClose} className="app-close-btn">✕</button>
                        </div>

                        {!stt.isSupported ? (
                            <div className="stt-unsupported">
                                <p>Your browser does not support the Web Speech Recognition API.</p>
                            </div>
                        ) : (
                            <>
                                {/* Language & continuous mode */}
                                <div className="stt-controls">
                                    <div className="stt-field">
                                        <label className="stt-label">Language</label>
                                        <select
                                            className="stt-select"
                                            value={stt.language}
                                            onChange={(e) => stt.setLanguage(e.target.value)}
                                            disabled={stt.isListening}
                                        >
                                            {languages.map((lang) => (
                                                <option key={lang} value={lang}>
                                                    {langDisplayName(lang)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <label className="stt-toggle-row">
                                        <span className="stt-label" style={{ marginBottom: 0 }}>Continuous</span>
                                        <button
                                            className={`stt-toggle ${stt.continuous ? 'stt-toggle-on' : ''}`}
                                            onClick={() => stt.setContinuous(!stt.continuous)}
                                            disabled={stt.isListening}
                                            type="button"
                                        >
                                            <span className="stt-toggle-thumb" />
                                        </button>
                                    </label>
                                </div>

                                {/* Mic button */}
                                <div className="stt-mic-wrapper">
                                    <button
                                        onClick={handleToggle}
                                        className={`stt-mic-btn ${stt.isListening ? 'stt-mic-active' : ''}`}
                                    >
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <rect x="12" y="4" width="8" height="14" rx="4" fill="currentColor" stroke="none" />
                                            <path d="M8 16 C8 22 12 26 16 26 C20 26 24 22 24 16" strokeLinecap="round" />
                                            <line x1="16" y1="26" x2="16" y2="30" />
                                            <line x1="12" y1="30" x2="20" y2="30" />
                                        </svg>
                                    </button>
                                    <p className="stt-status">
                                        {stt.isListening ? '● Listening...' : 'Tap to speak'}
                                    </p>
                                </div>

                                {/* Error */}
                                {stt.error && (
                                    <p className="stt-error">Error: {stt.error}</p>
                                )}

                                {/* Transcript */}
                                <div className="stt-transcript-box">
                                    {stt.transcript || stt.interimTranscript ? (
                                        <p className="stt-transcript-text">
                                            {stt.transcript}
                                            {stt.interimTranscript && (
                                                <span className="stt-interim"> {stt.interimTranscript}</span>
                                            )}
                                        </p>
                                    ) : (
                                        <p className="stt-placeholder">Transcript will appear here...</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="stt-actions">
                                    <button
                                        onClick={handleCopy}
                                        disabled={!stt.transcript}
                                        className="app-action-btn"
                                        style={{
                                            flex: 1,
                                            opacity: !stt.transcript ? 0.4 : 1,
                                            cursor: !stt.transcript ? 'not-allowed' : 'pointer',
                                        }}
                                    >
                                        {copied ? '✓ Copied' : 'Copy'}
                                    </button>
                                    <button
                                        onClick={stt.clear}
                                        className="stt-clear-btn"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                .stt-modal {
                    max-width: 420px !important;
                }
                .stt-unsupported {
                    text-align: center;
                    padding: 24px 0;
                    color: var(--ink-muted);
                    font-size: 14px;
                }
                .stt-controls {
                    margin-bottom: 16px;
                }
                .stt-field {
                    margin-bottom: 12px;
                }
                .stt-label {
                    display: block;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--ink-muted);
                    margin-bottom: 6px;
                }
                .stt-select {
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
                .stt-select:focus {
                    border-color: var(--accent);
                }
                .stt-select:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .stt-toggle-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                }
                .stt-toggle {
                    width: 40px;
                    height: 22px;
                    border-radius: 11px;
                    border: 1px solid var(--border);
                    background: var(--surface);
                    position: relative;
                    cursor: pointer;
                    transition: all 0.2s;
                    padding: 0;
                }
                .stt-toggle:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .stt-toggle-on {
                    background: var(--accent);
                    border-color: var(--accent);
                }
                .stt-toggle-thumb {
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    transition: transform 0.2s;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
                }
                .stt-toggle-on .stt-toggle-thumb {
                    transform: translateX(18px);
                }
                .stt-mic-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 16px;
                }
                .stt-mic-btn {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    border: 2px solid var(--border);
                    background: var(--surface);
                    color: var(--ink);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .stt-mic-btn:hover {
                    border-color: var(--accent);
                    transform: scale(1.04);
                }
                .stt-mic-active {
                    background: var(--accent);
                    border-color: var(--accent);
                    color: var(--bg);
                    transform: scale(1.06);
                    animation: sttPulse 1.5s infinite;
                }
                .stt-mic-active:hover {
                    border-color: var(--accent);
                }
                @keyframes sttPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(197,89,58,0.3); }
                    50% { box-shadow: 0 0 0 12px rgba(197,89,58,0); }
                }
                .stt-status {
                    text-align: center;
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--ink-muted);
                    margin-top: 10px;
                }
                .stt-mic-active ~ .stt-status,
                .stt-mic-wrapper:has(.stt-mic-active) .stt-status {
                    color: var(--accent);
                }
                .stt-error {
                    text-align: center;
                    font-size: 12px;
                    color: #c53030;
                    margin-bottom: 12px;
                }
                .stt-transcript-box {
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 14px;
                    min-height: 90px;
                    max-height: 200px;
                    overflow-y: auto;
                    margin-bottom: 14px;
                    background: var(--surface);
                }
                .stt-transcript-text {
                    font-size: 14px;
                    color: var(--ink);
                    line-height: 1.7;
                    margin: 0;
                }
                .stt-interim {
                    color: var(--ink-muted);
                    font-style: italic;
                }
                .stt-placeholder {
                    font-size: 14px;
                    color: var(--ink-muted);
                    margin: 0;
                }
                .stt-actions {
                    display: flex;
                    gap: 8px;
                }
                .stt-clear-btn {
                    padding: 10px 16px;
                    border-radius: 40px;
                    border: 1px solid var(--border);
                    background: var(--surface);
                    color: var(--ink-muted);
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--sans);
                }
                .stt-clear-btn:hover {
                    background: var(--ink);
                    color: var(--bg);
                    border-color: var(--ink);
                }
                @media (max-width: 480px) {
                    .stt-modal {
                        max-height: 90dvh;
                        overflow-y: auto;
                        padding: 20px !important;
                    }
                    .stt-mic-btn {
                        width: 64px;
                        height: 64px;
                    }
                    .stt-transcript-box {
                        min-height: 70px;
                        max-height: 150px;
                        padding: 10px;
                    }
                    .stt-select {
                        padding: 7px 10px;
                        font-size: 12px;
                    }
                    .stt-label {
                        font-size: 10px;
                    }
                }
            `}</style>
        </>
    );
};

export default SpeechToText;
