/**
 * Sprite Test Bench — renders every sprite variant on a labeled canvas grid.
 * Use this to iterate on pixel art without running the game.
 * Import from InteractiveApps or mount anywhere temporarily.
 */

import { useRef, useEffect, useCallback } from 'react';
import {
    drawDinoRunning,
    drawDinoJumping,
    drawDinoDucking,
    drawDinoDead,
    drawCactus,
    drawPtero,
    drawGround,
    drawCloud,
    type GameColors,
} from './sprites';

const SCALE = 3; // bigger scale so sprites are easy to inspect
const PTERO_SCALE = 4;
const COL_WIDTH = 120;
const ROW_HEIGHT = 100;
const PADDING = 20;
const LABEL_HEIGHT = 16;

const SpriteTestBench = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getColors = useCallback((): GameColors => {
        const style = getComputedStyle(document.documentElement);
        return {
            ink: style.getPropertyValue('--ink').trim(),
            inkMuted: style.getPropertyValue('--ink-muted').trim(),
            accent: style.getPropertyValue('--accent').trim(),
            border: style.getPropertyValue('--border').trim(),
            surface: style.getPropertyValue('--surface').trim(),
            bg: style.getPropertyValue('--bg').trim(),
        };
    }, []);

    const drawAll = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        const colors = getColors();

        const cols = 6;
        const rows = 4;
        canvas.width = cols * COL_WIDTH + PADDING * 2;
        canvas.height = rows * ROW_HEIGHT + PADDING * 2;

        // Background
        ctx.fillStyle = colors.surface;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Helper: draw a labeled cell
        const cell = (col: number, row: number, label: string): { x: number; y: number } => {
            const x = PADDING + col * COL_WIDTH;
            const y = PADDING + row * ROW_HEIGHT;

            // Label
            ctx.fillStyle = colors.inkMuted;
            ctx.font = '11px monospace';
            ctx.fillText(label, x, y + LABEL_HEIGHT - 2);

            // Grid cell border
            ctx.strokeStyle = colors.border;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x - 4, y - 4, COL_WIDTH - 8, ROW_HEIGHT - 8);

            return { x, y: y + LABEL_HEIGHT + 4 };
        };

        // ── Row 0: Dino poses ──
        {
            const p = cell(0, 0, 'run (frame 0)');
            drawDinoRunning(ctx, p.x, p.y, 0, colors.ink, SCALE);
        }
        {
            const p = cell(1, 0, 'run (frame 1)');
            drawDinoRunning(ctx, p.x, p.y, 1, colors.ink, SCALE);
        }
        {
            const p = cell(2, 0, 'jumping');
            drawDinoJumping(ctx, p.x, p.y, colors.ink, SCALE);
        }
        {
            const p = cell(3, 0, 'dead');
            drawDinoDead(ctx, p.x, p.y, colors.ink, SCALE);
        }

        // ── Row 1: Dino ducking ──
        {
            const p = cell(0, 1, 'duck (frame 0)');
            drawDinoDucking(ctx, p.x, p.y, 0, colors.ink, SCALE);
        }
        {
            const p = cell(1, 1, 'duck (frame 1)');
            drawDinoDucking(ctx, p.x, p.y, 1, colors.ink, SCALE);
        }

        // ── Row 2: Obstacles ──
        {
            const p = cell(0, 2, 'cactus small');
            drawCactus(ctx, p.x, p.y, 'small', colors.accent, SCALE);
        }
        {
            const p = cell(1, 2, 'cactus tall');
            drawCactus(ctx, p.x, p.y, 'tall', colors.accent, SCALE);
        }
        {
            const p = cell(2, 2, 'cactus double');
            drawCactus(ctx, p.x, p.y, 'double', colors.accent, SCALE);
        }
        {
            const p = cell(3, 2, 'ptero (frame 0)');
            drawPtero(ctx, p.x, p.y, 0, colors.ink, PTERO_SCALE);
        }
        {
            const p = cell(4, 2, 'ptero (frame 1)');
            drawPtero(ctx, p.x, p.y, 1, colors.ink, PTERO_SCALE);
        }

        // ── Row 3: Environment ──
        {
            const p = cell(0, 3, 'cloud');
            drawCloud(ctx, p.x, p.y, colors.border);
        }
        {
            const baseX = PADDING + 2 * COL_WIDTH;
            const baseY = PADDING + 3 * ROW_HEIGHT;
            ctx.fillStyle = colors.inkMuted;
            ctx.font = '11px monospace';
            ctx.fillText('ground', baseX, baseY + LABEL_HEIGHT - 2);
            drawGround(ctx, COL_WIDTH * 3, baseY + LABEL_HEIGHT + 20, 0, colors.inkMuted);
        }
    }, [getColors]);

    useEffect(() => {
        drawAll();

        // Redraw on theme change
        const observer = new MutationObserver(() => drawAll());
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, [drawAll]);

    return (
        <div style={{
            padding: '24px',
            maxWidth: '800px',
            margin: '0 auto',
        }}>
            <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: '22px',
                fontWeight: 300,
                color: 'var(--ink)',
                marginBottom: '8px',
            }}>
                Sprite Test Bench
            </h3>
            <p style={{
                fontSize: '13px',
                color: 'var(--ink-muted)',
                marginBottom: '16px',
            }}>
                All rendered sprites at {SCALE}× scale. Edit <code>sprites.ts</code> and save — hot reload will update this view.
            </p>
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    imageRendering: 'pixelated',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                }}
            />
        </div>
    );
};

export default SpriteTestBench;
