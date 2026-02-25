/**
 * Pixel-art sprite drawing functions for the Chrome Dino game.
 * All drawing is done via CanvasRenderingContext2D.
 * Colors are passed in so sprites react to light/dark mode.
 */

export interface GameColors {
    ink: string;
    inkMuted: string;
    accent: string;
    border: string;
    surface: string;
    bg: string;
}

// ── Dino Sprites ──

// Pixel grid for the dino head+body (shared between poses).
// Each row is a string of 0/1; '1' = filled pixel.
const DINO_HEAD: string[] = [
    '0000000000001111111110',
    '0000000000001111111111',
    '0000000000001101111111', // eyes
    '0000000000001111111111',
    '0000000000001111111111',
    '0000000000001111111111', // upper lip
    '0000000000001111000000', // mouth
    '0000000000001111111100', // lip / jaw
];

export function drawDinoRunning(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    frame: number,
    color: string,
    scale: number = 2
) {
    ctx.fillStyle = color;
    const s = scale;

    // Frame 0: right leg up
    const frame0 = [
        ...DINO_HEAD,
        '010000000001111100',
        '010000000111111100',
        '011000011111111111',
        '011100111111111101',
        '011111111111111100',
        '011111111111111100',
        '001111111111111000',
        '000111111111110000',
        '000011111111100000',
        '000001110011100000',
        '000001100010000000',
        '000001000011000000',
        '000001100000000000',
    ];

    // Frame 1: left leg up
    const frame1 = [
        ...DINO_HEAD,
        '010000000001111100',
        '010000000111111100',
        '011000011111111111',
        '011100111111111101',
        '011111111111111100',
        '011111111111111100',
        '001111111111111000',
        '000111111111110000',
        '000011111111100000',
        '000001110011100000',
        '000001000011000000',
        '000001100010000000',
        '000000000011000000',
    ];

    const body = frame === 0 ? frame0 : frame1;

    body.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
            if (row[rx] === '1') {
                ctx.fillRect(x + rx * s, y + ry * s, s, s);
            }
        }
    });
}

export const DINO_WIDTH = 18; // in grid units (widest row)
export const DINO_HEIGHT = 21; // head(8) + body(9) + legs(4)

export function drawDinoJumping(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    scale: number = 2
) {
    ctx.fillStyle = color;
    const s = scale;

    const body = [
        ...DINO_HEAD,
        '010000000001111100',
        '010000000111111100',
        '011000011111111111',
        '011100111111111101',
        '011111111111111100',
        '011111111111111100',
        '001111111111111000',
        '000111111111110000',
        '000011111111100000',
        '000001110011100000',
        '000001000010000000',
        '000001100011000000',
        '000000000000000000',
    ];

    body.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
            if (row[rx] === '1') {
                ctx.fillRect(x + rx * s, y + ry * s, s, s);
            }
        }
    });
}

export function drawDinoDucking(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    frame: number,
    color: string,
    scale: number = 2
) {
    ctx.fillStyle = color;
    const s = scale;

    // Ducking dino is wider and shorter
    // Frame 0: left leg grounded, right leg up
    const frame0 = [
        '0', '0', '0', '0', '0', '0', '0', '0',
        '10000000000000000000011111111110',
        '11000011111111111100111111111111',
        '11111111111111111111111101111111',
        '01111111111111111111111111111111',
        '00111111111111111111111111111111',
        '00011111111111111111111111111111',
        '00001111111111111111111111000000',
        '00000111111111111111001111111100',
        '00000011111111000010000000000000',
        '00000011110011100011',
        '00000011100',
        '00000011000',
        '00000011100',
    ];

    // Frame 1: left leg up, right leg grounded
    const frame1 = [
        '0', '0', '0', '0', '0', '0', '0', '0',
        '10000000000000000000011111111110',
        '11000011111111111100111111111111',
        '11111111111111111111111101111111',
        '01111111111111111111111111111111',
        '00111111111111111111111111111111',
        '00011111111111111111111111111111',
        '00001111111111111111111111000000',
        '00000111111111111111001111111100',
        '00000011111111111010000000000000',
        '00000011000011110011',
        '000000111000111',
        '00000000000011',
        '000000000000111',
    ];

    const body = frame === 0 ? frame0 : frame1;

    body.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
            if (row[rx] === '1') {
                ctx.fillRect(x + rx * s, y + ry * s, s, s);
            }
        }
    });
}

export const DUCK_WIDTH = 31; // widest row in grid units
export const DUCK_HEIGHT = 21; // total rows

// ── Dead dino (X eyes) ──
export function drawDinoDead(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    scale: number = 2
) {
    ctx.fillStyle = color;
    const s = scale;

    const body = [
        '0000000000001111111110',
        '0000000000001010111111',
        '0000000000001101111111', // eyes
        '0000000000001010111111',
        '0000000000001111111111',
        '0000000000001100000000', // upper lip
        '0000000000001100000000', // mouth
        '0000000000001111111100', // lip / jaw
        '010000000001111100',
        '010000000111111100',
        '011000011111111111',
        '011100111111111101',
        '011111111111111100',
        '011111111111111100',
        '001111111111111000',
        '000111111111110000',
        '000011111111100000',
        '000001110011100000',
        '000001100011000000',
        '000001000010000000',
        '000001100011000000',
    ];

    body.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
            if (row[rx] === '1') {
                ctx.fillRect(x + rx * s, y + ry * s, s, s);
            }
        }
    });
}

// ── Cactus Sprites ──

const CACTUS_SMALL: string[] = [
    '000010000',
    '000111000',
    '000111000',
    '000111010',
    '010111010',
    '010111010',
    '011111010',
    '000111110',
    '000111000',
    '000111000',
    '000111000',
    '000111000',
];

const CACTUS_TALL: string[] = [
    '000010000',
    '000111000',
    '010111000',
    '010111000',
    '010111000',
    '010111000',
    '010111010',
    '010111010',
    '010111010',
    '010111010',
    '011111010',
    '000111110',
    '000111000',
    '000111000',
    '000111000',
    '000111000',
    '000111010',
    '000111010',
    '000111010',
    '000111110',
    '000111000',
];

const CACTUS_DOUBLE: string[] = [
    '000000000010000',
    '000000000111000',
    '000000010111000',
    '000000010111000',
    '000000010111000',
    '000000010111000',
    '000000010111010',
    '000000010111010',
    '000000010111010',
    '000000010111010',
    '000000011111010',
    '000000000111110',
    '000111000111000',
    '000111000111000',
    '000111010111010',
    '010111010111010',
    '010111010111010',
    '011111010111110',
    '000111110111000',
    '000111000111000',
    '000111000111000',
    '000111000111000',
    '000111000111000',
];

export type CactusVariant = 'small' | 'tall' | 'double';

export function drawCactus(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    variant: CactusVariant,
    color: string,
    scale: number = 2
) {
    ctx.fillStyle = color;
    const s = scale;
    const data =
        variant === 'small' ? CACTUS_SMALL :
            variant === 'tall' ? CACTUS_TALL :
                CACTUS_DOUBLE;

    data.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
            if (row[rx] === '1') {
                ctx.fillRect(x + rx * s, y + ry * s, s, s);
            }
        }
    });
}

export function getCactusSize(variant: CactusVariant, scale: number = 2) {
    const data =
        variant === 'small' ? CACTUS_SMALL :
            variant === 'tall' ? CACTUS_TALL :
                CACTUS_DOUBLE;
    return {
        width: data[0].length * scale,
        height: data.length * scale,
    };
}

// ── Pterodactyl ──

const PTERO_FRAME_0: string[] = [
    '1000',
    '1100',
    '1111',
    '0111',
    '0010',
];

const PTERO_FRAME_1: string[] = [
    '0010',
    '0111',
    '1111',
    '1100',
    '1000',
];

export function drawPtero(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    frame: number,
    color: string,
    scale: number = 3
) {
    ctx.fillStyle = color;
    const s = scale;
    const data = frame === 0 ? PTERO_FRAME_0 : PTERO_FRAME_1;

    data.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
            if (row[rx] === '1') {
                ctx.fillRect(x + rx * s, y + ry * s, s, s);
            }
        }
    });
}

export const PTERO_WIDTH = 4;  // in grid units
export const PTERO_HEIGHT = 5;

// ── Ground ──

export function drawGround(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    groundY: number,
    offset: number,
    color: string
) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvasWidth, groundY);
    ctx.stroke();

    // Pebble pattern
    ctx.fillStyle = color;
    const spacing = 24;
    const totalPebbles = Math.ceil(canvasWidth / spacing) + 2;
    for (let i = 0; i < totalPebbles; i++) {
        const px = ((i * spacing - (offset % spacing)) + canvasWidth) % canvasWidth;
        // Alternate pebble sizes
        if (i % 3 === 0) {
            ctx.fillRect(px, groundY + 4, 3, 1);
        } else if (i % 3 === 1) {
            ctx.fillRect(px, groundY + 6, 2, 1);
        } else {
            ctx.fillRect(px, groundY + 3, 1, 1);
        }
    }
}

// ── Clouds ──

export function drawCloud(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
) {
    ctx.fillStyle = color;
    // Simple blocky cloud
    ctx.fillRect(x + 4, y, 24, 4);
    ctx.fillRect(x, y + 4, 32, 6);
    ctx.fillRect(x + 4, y + 10, 24, 2);
}
