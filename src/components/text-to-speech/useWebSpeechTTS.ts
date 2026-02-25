import { useState, useEffect, useCallback } from 'react';

export interface UseWebSpeechTTSReturn {
    voices: SpeechSynthesisVoice[];
    languages: string[];
    filteredVoices: SpeechSynthesisVoice[];
    selectedLang: string;
    selectedVoice: SpeechSynthesisVoice | null;
    rate: number;
    pitch: number;
    isSpeaking: boolean;
    isPaused: boolean;
    isSupported: boolean;
    setSelectedLang: (lang: string) => void;
    setSelectedVoiceByName: (name: string) => void;
    setRate: (rate: number) => void;
    setPitch: (pitch: number) => void;
    speak: (text: string) => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    outputDevices: MediaDeviceInfo[];
    selectedDeviceId: string;
    setSelectedDeviceId: (id: string) => void;
    supportsDeviceSelection: boolean;
}


export function useWebSpeechTTS(): UseWebSpeechTTSReturn {
    const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedLang, setSelectedLang] = useState('');
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');

    // Check if setSinkId is supported (Chromium only)
    const supportsDeviceSelection =
        typeof HTMLAudioElement !== 'undefined' && 'setSinkId' in HTMLAudioElement.prototype;

    // Load voices
    useEffect(() => {
        if (!isSupported) return;

        const loadVoices = () => {
            const v = speechSynthesis.getVoices();
            if (v.length > 0) {
                setVoices(v);
                if (!selectedLang) {
                    const navLang = navigator.language || 'en-US';
                    const exactMatch = v.find((voice) => voice.lang === navLang);
                    const prefixMatch = v.find((voice) =>
                        voice.lang.startsWith(navLang.split('-')[0]),
                    );
                    const defaultVoice = exactMatch || prefixMatch || v[0];
                    setSelectedLang(defaultVoice.lang);
                    setSelectedVoice(defaultVoice);
                }
            }
        };

        loadVoices();
        speechSynthesis.addEventListener('voiceschanged', loadVoices);
        return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSupported]);

    // Load output devices
    useEffect(() => {
        if (!supportsDeviceSelection) return;

        const loadDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioOutputs = devices.filter((d) => d.kind === 'audiooutput');
                setOutputDevices(audioOutputs);
                if (!selectedDeviceId && audioOutputs.length > 0) {
                    setSelectedDeviceId(audioOutputs[0].deviceId);
                }
            } catch {
                // Permission denied or not available
            }
        };

        loadDevices();
        navigator.mediaDevices.addEventListener('devicechange', loadDevices);
        return () => navigator.mediaDevices.removeEventListener('devicechange', loadDevices);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supportsDeviceSelection]);



    // Derive languages and filtered voices
    const languages = Array.from(new Set(voices.map((v) => v.lang))).sort();
    const filteredVoices = voices.filter((v) => v.lang === selectedLang);

    // When language changes, auto-select the first voice for that language
    const setSelectedLangWrapped = useCallback(
        (lang: string) => {
            setSelectedLang(lang);
            const firstVoice = voices.find((v) => v.lang === lang);
            setSelectedVoice(firstVoice || null);
        },
        [voices],
    );

    const setSelectedVoiceByName = useCallback(
        (name: string) => {
            const voice = voices.find((v) => v.name === name);
            if (voice) setSelectedVoice(voice);
        },
        [voices],
    );

    // Speak
    const speak = useCallback(
        (text: string) => {
            if (!isSupported || !text.trim()) return;

            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            if (selectedVoice) utterance.voice = selectedVoice;
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.lang = selectedLang;

            utterance.onstart = () => {
                setIsSpeaking(true);
                setIsPaused(false);
            };
            utterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };
            utterance.onerror = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };

            speechSynthesis.speak(utterance);
        },
        [isSupported, selectedVoice, rate, pitch, selectedLang],
    );

    const pause = useCallback(() => {
        if (isSupported && speechSynthesis.speaking) {
            speechSynthesis.pause();
            setIsPaused(true);
        }
    }, [isSupported]);

    const resume = useCallback(() => {
        if (isSupported && speechSynthesis.paused) {
            speechSynthesis.resume();
            setIsPaused(false);
        }
    }, [isSupported]);

    const stop = useCallback(() => {
        if (isSupported) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
            setIsPaused(false);
        }
    }, [isSupported]);

    return {
        voices,
        languages,
        filteredVoices,
        selectedLang,
        selectedVoice,
        rate,
        pitch,
        isSpeaking,
        isPaused,
        isSupported,
        setSelectedLang: setSelectedLangWrapped,
        setSelectedVoiceByName,
        setRate,
        setPitch,
        speak,
        pause,
        resume,
        stop,
        outputDevices,
        selectedDeviceId,
        setSelectedDeviceId,
        supportsDeviceSelection,
    };
}
