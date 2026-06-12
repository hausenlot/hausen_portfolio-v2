// gameLogic.ts
import Typo from 'typo-js';

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';
export type GameStatus = 'playing' | 'won' | 'lost';

const API_URL = 'https://random-words-api.kushcreates.com/api?language=en&category=wordle&length=5&words=1';

// Singleton spell checker instance
let spellChecker: Typo | null = null;

// Initialize the spell checker (call this once when the app loads)
export async function initSpellChecker(): Promise<void> {
    if (spellChecker) return;

    try {
        // Load dictionary files from public folder
        const [affResponse, dicResponse] = await Promise.all([
            fetch('/dictionaries/en_US.aff'),
            fetch('/dictionaries/en_US.dic')
        ]);

        const affContent = await affResponse.text();
        const dicContent = await dicResponse.text();

        spellChecker = new Typo('en_US', affContent, dicContent);
        console.log('Spell checker initialized successfully');
    } catch (error) {
        console.error('Failed to initialize spell checker:', error);
        // Fallback to a basic word list if dictionary loading fails
        spellChecker = null;
    }
}

// Get the spell checker instance
function getSpellChecker(): Typo | null {
    return spellChecker;
}

export async function fetchRandomWord(): Promise<string> {
    try {
        const response = await fetch(API_URL); // [{word: "roneo", length: 5, category: "wordle", language: "en"}]
        const data = await response.json();
        const word = data[0].word.toUpperCase();

        if (word && word.length === 5 && /^[A-Z]+$/.test(word)) {
            return word;
        }
    } catch (error) {
        console.error('Failed to fetch word, using fallback:', error);
        // Fallback to a hardcoded word
        return 'HELLO';
    }
    return 'HELLO';
}

// Check if a word is a valid English word using typo-js
export async function isValidWord(word: string): Promise<boolean> {
    const upperWord = word.toUpperCase();
    const lowerWord = word.toLowerCase();

    // Reject anything that isn't exactly 5 letters
    if (!/^[A-Z]{5}$/.test(upperWord)) {
        return false;
    }

    // Use typo-js for spell checking
    const spell = getSpellChecker();
    if (spell) {
        try {
            const isValid = spell.check(lowerWord);
            return isValid;
        } catch (error) {
            console.error('Spell check failed:', error);
            return false;
        }
    }

    // Fallback: accept any 5-letter word if spell checker isn't ready
    console.warn('Spell checker not initialized, accepting any 5-letter word');
    return true;
}

// Evaluate a guess against the target word
export function evaluateGuess(guess: string, target: string): LetterState[] {
    const upperGuess = guess.toUpperCase();
    const upperTarget = target.toUpperCase();
    const result: LetterState[] = new Array(5).fill('absent');
    const targetLetterCount: Record<string, number> = {};

    // Count occurrences of each letter in target
    for (const char of upperTarget) {
        targetLetterCount[char] = (targetLetterCount[char] || 0) + 1;
    }

    // First pass: mark correct positions (green)
    for (let i = 0; i < 5; i++) {
        if (upperGuess[i] === upperTarget[i]) {
            result[i] = 'correct';
            targetLetterCount[upperGuess[i]]--;
        }
    }

    // Second pass: mark present letters (yellow)
    for (let i = 0; i < 5; i++) {
        if (result[i] !== 'correct' && targetLetterCount[upperGuess[i]] > 0) {
            result[i] = 'present';
            targetLetterCount[upperGuess[i]]--;
        }
    }

    return result;
}

// Update keyboard letter states based on guess evaluation
export function updateKeyboardStates(
    currentStates: Map<string, LetterState>,
    guess: string,
    evaluation: LetterState[]
): Map<string, LetterState> {
    const newStates = new Map(currentStates);
    const upperGuess = guess.toUpperCase();

    for (let i = 0; i < 5; i++) {
        const letter = upperGuess[i];
        const newState = evaluation[i];
        const currentState = newStates.get(letter);

        // Priority: correct > present > absent
        if (newState === 'correct') {
            newStates.set(letter, 'correct');
        } else if (newState === 'present' && currentState !== 'correct') {
            newStates.set(letter, 'present');
        } else if (newState === 'absent' && !currentState) {
            newStates.set(letter, 'absent');
        }
    }

    return newStates;
}

// Check if the game is won
export function checkWin(guess: string, target: string): boolean {
    return guess.toUpperCase() === target.toUpperCase();
}

// Check if game is lost (max 6 guesses)
export function checkLoss(guesses: number): boolean {
    return guesses >= 6;
}