/**
 * Chrome Dino game engine.
 * Manages game loop, physics, collision detection, obstacle spawning, and score.
 */

import {
    drawDinoRunning,
    drawDinoJumping,
    drawDinoDucking,
    drawDinoDead,
    drawCactus,
    getCactusSize,
    drawPtero,
    drawGround,
    drawCloud,
    DINO_WIDTH,
    DINO_HEIGHT,
    DUCK_WIDTH,
    DUCK_HEIGHT,
    PTERO_WIDTH,
    PTERO_HEIGHT,
    type CactusVariant,
    type GameColors,
} from './sprites';

// ── Types ──

export type GameState = 'IDLE' | 'RUNNING' | 'GAME_OVER';

interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
    type: 'cactus' | 'ptero';
    variant?: CactusVariant;
}

interface Cloud {
    x: number;
    y: number;
}

// ── Constants ──

const PIXEL_SCALE = 2;
const PTERO_SCALE = 3;
const GRAVITY = 0.6;
const JUMP_VELOCITY = -11;
const INITIAL_SPEED = 3;
const MAX_SPEED = 14;
const SPEED_INCREMENT = 0.001;
const MIN_OBSTACLE_GAP = 300;
const GROUND_OFFSET = 30;
const SCORE_INTERVAL = 4; // frames between score increments
const ANIM_SPEED = 8; // frames per leg cycle

const HI_SCORE_KEY = 'dino-game-hi-score';

const CACTUS_VARIANTS: CactusVariant[] = ['small', 'tall', 'double'];

// ── Engine ──

export class DinoGameEngine {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private getColors!: () => GameColors;

    // Game state
    private state: GameState = 'IDLE';
    private rafId: number = 0;
    private frameCount: number = 0;

    // Dino
    private dinoX: number = 40;
    private dinoY: number = 0;
    private velocityY: number = 0;
    private isJumping: boolean = false;
    private isDucking: boolean = false;
    private groundY: number = 0;

    // World
    private speed: number = INITIAL_SPEED;
    private groundOffset: number = 0;
    private obstacles: Obstacle[] = [];
    private clouds: Cloud[] = [];
    private nextObstacleDistance: number = 0;
    private nextCloudDistance: number = 0;

    // Score
    private score: number = 0;
    private hiScore: number = 0;

    // Callbacks
    private onStateChange?: (state: GameState) => void;
    private onScoreChange?: (score: number, hiScore: number) => void;

    init(
        canvas: HTMLCanvasElement,
        getColors: () => GameColors,
        onStateChange?: (state: GameState) => void,
        onScoreChange?: (score: number, hiScore: number) => void,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.getColors = getColors;
        this.onStateChange = onStateChange;
        this.onScoreChange = onScoreChange;

        // Load hi score
        const saved = localStorage.getItem(HI_SCORE_KEY);
        if (saved) this.hiScore = parseInt(saved, 10) || 0;

        this.groundY = canvas.height - GROUND_OFFSET;
        this.dinoY = this.groundY - DINO_HEIGHT * PIXEL_SCALE;

        // Seed initial clouds
        for (let i = 0; i < 3; i++) {
            this.clouds.push({
                x: Math.random() * canvas.width,
                y: 20 + Math.random() * 40,
            });
        }

        this.drawIdleFrame();
    }

    start() {
        if (this.state === 'RUNNING') return;

        // Reset
        this.speed = INITIAL_SPEED;
        this.score = 0;
        this.frameCount = 0;
        this.obstacles = [];
        this.groundOffset = 0;
        this.nextObstacleDistance = MIN_OBSTACLE_GAP;
        this.nextCloudDistance = 100;
        this.dinoY = this.groundY - DINO_HEIGHT * PIXEL_SCALE;
        this.velocityY = 0;
        this.isJumping = false;
        this.isDucking = false;

        this.setState('RUNNING');
        this.onScoreChange?.(this.score, this.hiScore);
        this.loop();
    }

    handleInput(action: 'jump' | 'duck-start' | 'duck-end') {
        if (this.state === 'IDLE') {
            this.start();
            return;
        }

        if (this.state === 'GAME_OVER') {
            if (action === 'jump') this.start();
            return;
        }

        if (action === 'jump' && !this.isJumping) {
            this.velocityY = JUMP_VELOCITY;
            this.isJumping = true;
            this.isDucking = false;
        } else if (action === 'duck-start' && !this.isJumping) {
            this.isDucking = true;
        } else if (action === 'duck-end') {
            this.isDucking = false;
        }
    }

    getScore() { return this.score; }
    getHiScore() { return this.hiScore; }
    getState() { return this.state; }

    destroy() {
        cancelAnimationFrame(this.rafId);
    }

    // ── Internal ──

    private setState(s: GameState) {
        this.state = s;
        this.onStateChange?.(s);
    }

    private loop = () => {
        if (this.state !== 'RUNNING') return;

        this.update();
        this.draw();

        this.rafId = requestAnimationFrame(this.loop);
    };

    private update() {
        this.frameCount++;

        // Speed up over time
        if (this.speed < MAX_SPEED) {
            this.speed += SPEED_INCREMENT;
        }

        // Scroll ground
        this.groundOffset += this.speed;

        // Dino physics
        if (this.isJumping) {
            this.velocityY += GRAVITY;
            this.dinoY += this.velocityY;

            const dinoHeight = this.isDucking ? DUCK_HEIGHT * PIXEL_SCALE : DINO_HEIGHT * PIXEL_SCALE;
            const landingY = this.groundY - dinoHeight;

            if (this.dinoY >= landingY) {
                this.dinoY = landingY;
                this.velocityY = 0;
                this.isJumping = false;
            }
        }

        // Adjust dino Y when switching duck state while on ground
        if (!this.isJumping) {
            const dinoHeight = this.isDucking ? DUCK_HEIGHT * PIXEL_SCALE : DINO_HEIGHT * PIXEL_SCALE;
            this.dinoY = this.groundY - dinoHeight;
        }

        // Score
        if (this.frameCount % SCORE_INTERVAL === 0) {
            this.score++;
            this.onScoreChange?.(this.score, this.hiScore);
        }

        // Spawn obstacles
        this.nextObstacleDistance -= this.speed;
        if (this.nextObstacleDistance <= 0) {
            this.spawnObstacle();
            this.nextObstacleDistance = MIN_OBSTACLE_GAP + Math.random() * 200;
        }

        // Move obstacles
        for (const obs of this.obstacles) {
            obs.x -= this.speed;
        }
        // Remove off-screen
        this.obstacles = this.obstacles.filter(o => o.x + o.width > -20);

        // Move clouds (slower)
        for (const cloud of this.clouds) {
            cloud.x -= this.speed * 0.3;
        }
        this.clouds = this.clouds.filter(c => c.x > -40);
        this.nextCloudDistance -= this.speed * 0.3;
        if (this.nextCloudDistance <= 0) {
            this.clouds.push({
                x: this.canvas.width + 10,
                y: 15 + Math.random() * 50,
            });
            this.nextCloudDistance = 150 + Math.random() * 200;
        }

        // Collision
        if (this.checkCollision()) {
            this.gameOver();
        }
    }

    private spawnObstacle() {
        const cw = this.canvas.width;

        // Pterodactyls only appear after score 100
        const canSpawnPtero = this.score > 100;
        const isPtero = canSpawnPtero && Math.random() < 0.25;

        if (isPtero) {
            const pteroW = PTERO_WIDTH * PTERO_SCALE;
            const pteroH = PTERO_HEIGHT * PTERO_SCALE;
            // Heights must be above ducking dino but hit standing dino
            // Duck sprite has 8 empty rows at top, so real visual height is shorter
            const duckVisualHeight = (DUCK_HEIGHT - 8) * PIXEL_SCALE;
            const heights = [
                this.groundY - pteroH - duckVisualHeight - 2,  // tight — must duck
                this.groundY - pteroH - duckVisualHeight - 13,  // slightly higher, still must duck
            ];
            const y = heights[Math.floor(Math.random() * heights.length)];
            this.obstacles.push({
                x: cw,
                y,
                width: pteroW,
                height: pteroH,
                type: 'ptero',
            });
        } else {
            const variant = CACTUS_VARIANTS[Math.floor(Math.random() * CACTUS_VARIANTS.length)];
            const size = getCactusSize(variant, PIXEL_SCALE);
            this.obstacles.push({
                x: cw,
                y: this.groundY - size.height,
                width: size.width,
                height: size.height,
                type: 'cactus',
                variant,
            });
        }
    }

    private checkCollision(): boolean {
        // Dino hitbox (shrink for fairness)
        const margin = 4;
        let dx: number, dy: number, drw: number, drh: number;

        if (this.isDucking) {
            // Duck sprite has 8 empty padding rows at top — hitbox only covers visual part
            const duckPadding = 8 * PIXEL_SCALE;
            const dw = DUCK_WIDTH * PIXEL_SCALE;
            const dh = (DUCK_HEIGHT - 8) * PIXEL_SCALE; // only visual rows
            dx = this.dinoX + margin;
            dy = this.dinoY + duckPadding + margin; // skip empty rows
            drw = dw - margin * 2;
            drh = dh - margin * 2;
        } else {
            const dw = DINO_WIDTH * PIXEL_SCALE;
            const dh = DINO_HEIGHT * PIXEL_SCALE;
            dx = this.dinoX + margin;
            dy = this.dinoY + margin;
            drw = dw - margin * 2;
            drh = dh - margin * 2;
        }

        for (const obs of this.obstacles) {
            const ox = obs.x + 2;
            const oy = obs.y + 2;
            const ow = obs.width - 4;
            const oh = obs.height - 4;

            if (dx < ox + ow && dx + drw > ox && dy < oy + oh && dy + drh > oy) {
                return true;
            }
        }
        return false;
    }

    private gameOver() {
        this.setState('GAME_OVER');
        cancelAnimationFrame(this.rafId);

        if (this.score > this.hiScore) {
            this.hiScore = this.score;
            localStorage.setItem(HI_SCORE_KEY, String(this.hiScore));
        }
        this.onScoreChange?.(this.score, this.hiScore);

        // Draw final frame with dead dino
        this.drawGameOverFrame();
    }

    private draw() {
        const ctx = this.ctx;
        const colors = this.getColors();
        const w = this.canvas.width;
        const h = this.canvas.height;

        // Clear
        ctx.fillStyle = colors.surface;
        ctx.fillRect(0, 0, w, h);

        // Clouds
        for (const cloud of this.clouds) {
            drawCloud(ctx, cloud.x, cloud.y, colors.border);
        }

        // Ground
        drawGround(ctx, w, this.groundY, this.groundOffset, colors.inkMuted);

        // Obstacles
        const animIdx = Math.floor(this.frameCount / ANIM_SPEED) % 2;
        for (const obs of this.obstacles) {
            if (obs.type === 'ptero') {
                drawPtero(ctx, obs.x, obs.y, animIdx, colors.ink, PTERO_SCALE);
            } else {
                drawCactus(ctx, obs.x, obs.y, obs.variant!, colors.accent, PIXEL_SCALE);
            }
        }

        // Dino
        if (this.isDucking) {
            drawDinoDucking(ctx, this.dinoX, this.dinoY, animIdx, colors.ink, PIXEL_SCALE);
        } else if (this.isJumping) {
            drawDinoJumping(ctx, this.dinoX, this.dinoY, colors.ink, PIXEL_SCALE);
        } else {
            drawDinoRunning(ctx, this.dinoX, this.dinoY, animIdx, colors.ink, PIXEL_SCALE);
        }
    }

    private drawIdleFrame() {
        const ctx = this.ctx;
        const colors = this.getColors();
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.fillStyle = colors.surface;
        ctx.fillRect(0, 0, w, h);

        // Clouds
        for (const cloud of this.clouds) {
            drawCloud(ctx, cloud.x, cloud.y, colors.border);
        }

        // Ground
        drawGround(ctx, w, this.groundY, 0, colors.inkMuted);

        // Standing dino
        drawDinoRunning(ctx, this.dinoX, this.groundY - DINO_HEIGHT * PIXEL_SCALE, 0, colors.ink, PIXEL_SCALE);
    }

    private drawGameOverFrame() {
        const ctx = this.ctx;
        const colors = this.getColors();
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.fillStyle = colors.surface;
        ctx.fillRect(0, 0, w, h);

        // Clouds
        for (const cloud of this.clouds) {
            drawCloud(ctx, cloud.x, cloud.y, colors.border);
        }

        // Ground
        drawGround(ctx, w, this.groundY, this.groundOffset, colors.inkMuted);

        // Obstacles (frozen)
        for (const obs of this.obstacles) {
            if (obs.type === 'ptero') {
                drawPtero(ctx, obs.x, obs.y, 0, colors.ink, PTERO_SCALE);
            } else {
                drawCactus(ctx, obs.x, obs.y, obs.variant!, colors.accent, PIXEL_SCALE);
            }
        }

        // Dead dino
        drawDinoDead(ctx, this.dinoX, this.dinoY, colors.ink, PIXEL_SCALE);
    }

    /** Redraw the current frame (e.g. after a theme change) */
    redraw() {
        if (this.state === 'IDLE') {
            this.drawIdleFrame();
        } else if (this.state === 'GAME_OVER') {
            this.drawGameOverFrame();
        }
        // RUNNING state redraws on its own via the game loop
    }
}
