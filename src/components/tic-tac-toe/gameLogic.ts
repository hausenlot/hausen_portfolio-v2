// Credits https://github.com/spl3ndid/tic-tac-toe-ai-impossible
export type CellValue = 'X' | 'O' | '';

export interface WinResult {
    winner: 'X' | 'O' | 'Tie';
    pattern: number[] | null;
}

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
];

export function checkWinner(board: CellValue[]): WinResult | null {
    for (const [a, b, c] of WIN_PATTERNS) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a] as 'X' | 'O', pattern: [a, b, c] };
        }
    }
    return board.includes('') ? null : { winner: 'Tie', pattern: null };
}

export function minimax(
    board: CellValue[],
    depth: number,
    isMaximizing: boolean,
): number {
    const result = checkWinner(board);

    if (result) {
        if (result.winner === 'O') return 10 - depth;
        if (result.winner === 'X') return depth - 10;
        return 0; // Tie
    }

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                best = Math.max(best, minimax(board, depth + 1, false));
                board[i] = '';
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                best = Math.min(best, minimax(board, depth + 1, true));
                board[i] = '';
            }
        }
        return best;
    }
}

// You shall not win
export function findBestMove(board: CellValue[]): number {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            const score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

// Here take a win you peasant
export function findEasyMove(board: CellValue[]): number {
    const empty = board
        .map((v, i) => (v === '' ? i : -1))
        .filter((i) => i !== -1);
    if (empty.length === 0) return -1;
    return empty[Math.floor(Math.random() * empty.length)];
}
