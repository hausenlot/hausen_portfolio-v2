import { useState, useEffect, useCallback, useRef } from 'react';

// Cross-browser SpeechRecognition
const SpeechRecognitionAPI =
    typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

export interface UseWebSpeechSTTReturn {
    isSupported: boolean;
    isListening: boolean;
    transcript: string;
    interimTranscript: string;
    language: string;
    setLanguage: (lang: string) => void;
    continuous: boolean;
    setContinuous: (val: boolean) => void;
    start: () => void;
    stop: () => void;
    clear: () => void;
    error: string | null;
}

export function useWebSpeechSTT(): UseWebSpeechSTTReturn {
    const isSupported = !!SpeechRecognitionAPI;

    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [language, setLanguage] = useState(
        typeof navigator !== 'undefined' ? navigator.language || 'en-US' : 'en-US',
    );
    const [continuous, setContinuous] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<any>(null);

    // Create and configure recognition instance
    useEffect(() => {
        if (!isSupported) return;

        const recognition = new SpeechRecognitionAPI();
        recognition.interimResults = true;
        recognition.continuous = continuous;
        recognition.lang = language;

        recognition.onresult = (event: any) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    final += result[0].transcript;
                } else {
                    interim += result[0].transcript;
                }
            }

            if (final) {
                setTranscript((prev) => prev + (prev ? ' ' : '') + final.trim());
            }
            setInterimTranscript(interim);
        };

        recognition.onerror = (event: any) => {
            // "no-speech" and "aborted" are non-critical
            if (event.error === 'no-speech' || event.error === 'aborted') return;
            setError(event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
            setInterimTranscript('');
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.abort();
        };
    }, [isSupported, language, continuous]);

    const start = useCallback(() => {
        if (!isSupported || !recognitionRef.current) return;
        setError(null);

        try {
            recognitionRef.current.start();
            setIsListening(true);
        } catch {
            // Already started — ignore
        }
    }, [isSupported]);

    const stop = useCallback(() => {
        if (!recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsListening(false);
    }, []);

    const clear = useCallback(() => {
        setTranscript('');
        setInterimTranscript('');
    }, []);

    return {
        isSupported,
        isListening,
        transcript,
        interimTranscript,
        language,
        setLanguage,
        continuous,
        setContinuous,
        start,
        stop,
        clear,
        error,
    };
}
