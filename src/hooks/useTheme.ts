import { useState, useCallback, useEffect } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Reads the initial theme from the DOM class list.
 * The blocking script in index.html has already applied the correct
 * class before React mounts, so we just read it here to stay in sync.
 */
const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
};

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return { theme, toggleTheme };
};
