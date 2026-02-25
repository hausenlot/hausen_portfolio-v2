import TicTacToe from './tic-tac-toe';
import TextToSpeech from './text-to-speech';
import SpeechToText from './speech-to-text';
import DinoGame from './dino-game';
// import SpriteTestBench from './dino-game/SpriteTestBench';

const InteractiveApps = () => {
    return (
        <section id="apps" className="apps-section">
            <div className="apps-header">
                <h2 className="apps-title">Something Fun</h2>
                <span className="apps-count">4 mini apps</span>
            </div>

            <div className="apps-grid">
                <TicTacToe />
                <TextToSpeech />
                <SpeechToText />
                <DinoGame />
            </div>

            {/* DEV: Sprite test bench — remove when done tweaking */}
            {/* <SpriteTestBench /> */}

            <style>{`
                .apps-section {
                    padding: 100px 48px;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .apps-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 48px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid var(--border);
                }
                .apps-title {
                    font-family: var(--serif);
                    font-size: clamp(28px, 3vw, 36px);
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    color: var(--ink);
                }
                .apps-count {
                    font-size: 13px;
                    color: var(--ink-muted);
                }
                .apps-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    justify-content: center;
                }
                @media (max-width: 768px) {
                    .apps-section { padding: 30px 24px; }
                }
            `}</style>
        </section>
    );
};

export default InteractiveApps;
