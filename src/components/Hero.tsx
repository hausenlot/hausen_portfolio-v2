import { skills } from '../data/skills';

const Hero = () => {
    return (
        <div className="hero-section fade-up">
            <div>
                <div className="hero-tag fade-up">Open to opportunities</div>
                <h1 className="fade-up delay-1">
                    Building <em>robust</em> full-stack applications
                </h1>
                <p className="hero-desc fade-up delay-2">
                    Full Stack Developer refreshing frontend skills and building modern web applications.
                    I specialize in end-to-end development — from React interfaces to Node.js backends and cloud infrastructure.
                </p>
                <div className="hero-actions fade-up delay-3">
                    <a href="#work" className="btn-primary">View my work</a>
                    <a href="#contact" className="btn-ghost">Get in touch ↗</a>
                </div>
            </div>

            <div className="hero-meta fade-up delay-4">
                <div className="hero-card">
                    <div className="hero-card-label">Current focus</div>
                    <div className="hero-card-value">Full Stack Developer</div>
                    <div className="hero-card-sub">MongoDB · Express · React · Node.js</div>
                </div>
                <div className="hero-card">
                    <div className="hero-card-label">Core skills</div>
                    <div className="skills-list">
                        {skills.map((skill) => (
                            <span key={skill} className="skill-chip">{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="hero-card">
                    <div className="hero-card-label">Looking for</div>
                    <div className="hero-card-value">Full Stack / Software Engineer</div>
                    <div className="hero-card-sub">Enterprise · FinTech · Scalable Infrastructure</div>
                </div>
            </div>

            <style>{`
                .hero-section {
                    padding: 160px 48px 100px;
                    max-width: 1100px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }
                .hero-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--accent);
                    background: var(--accent-light);
                    padding: 5px 12px;
                    border-radius: 20px;
                    margin-bottom: 24px;
                }
                .hero-tag::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--accent);
                }
                .hero-section h1 {
                    font-family: var(--serif);
                    font-size: clamp(42px, 5vw, 60px);
                    font-weight: 300;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    color: var(--ink);
                    margin-bottom: 24px;
                }
                .hero-section h1 em {
                    font-style: italic;
                    color: var(--accent);
                }
                .hero-desc {
                    font-size: 16px;
                    color: var(--ink-muted);
                    line-height: 1.7;
                    max-width: 440px;
                    margin-bottom: 40px;
                }
                .hero-actions {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }
                .btn-primary {
                    display: inline-block;
                    background: var(--ink);
                    color: var(--white);
                    padding: 13px 28px;
                    border-radius: 40px;
                    font-size: 14px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: background 0.2s, transform 0.15s;
                }
                .btn-primary:hover {
                    background: var(--accent);
                    transform: translateY(-1px);
                }
                .btn-ghost {
                    display: inline-block;
                    color: var(--ink-muted);
                    font-size: 14px;
                    text-decoration: none;
                    padding: 13px 0;
                    border-bottom: 1px solid var(--border);
                    transition: color 0.2s, border-color 0.2s;
                }
                .btn-ghost:hover {
                    color: var(--ink);
                    border-color: var(--ink);
                }
                .hero-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .hero-card {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 24px 28px;
                    transition: box-shadow 0.2s;
                }
                .hero-card:hover {
                    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
                }
                .hero-card-label {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--ink-muted);
                    margin-bottom: 12px;
                }
                .hero-card-value {
                    font-family: var(--serif);
                    font-size: 22px;
                    font-weight: 300;
                    color: var(--ink);
                    margin-bottom: 4px;
                }
                .hero-card-sub {
                    font-size: 13px;
                    color: var(--ink-muted);
                }
                .skills-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 8px;
                }
                .skill-chip {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    color: var(--ink);
                    font-weight: 400;
                }
                @media (max-width: 768px) {
                    .hero-section {
                        grid-template-columns: 1fr;
                        padding: 100px 24px 30px;
                        gap: 40px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero;