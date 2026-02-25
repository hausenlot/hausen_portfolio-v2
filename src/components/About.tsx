const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-header">
                <h2 className="about-title">About me</h2>
            </div>
            <div className="about-grid">
                <div className="about-text">
                    <p>
                        I'm a full stack developer focused on <strong>building applications that are robust, user-friendly, and performant</strong>.
                        My background spans frontend interfaces, backend APIs, cloud infrastructure, and real-time systems —
                        the kind of work where attention to detail and clean architecture make all the difference.
                    </p>
                    <p>
                        I'm currently refreshing my frontend skills with React and TypeScript while continuing to build
                        full-stack projects. I care about writing code that's maintainable, shipping features that users
                        actually benefit from, and staying curious about new tools and patterns.
                    </p>
                    <p>
                        I'm exploring roles where I can <strong>work across the stack</strong>, contribute to product decisions,
                        and collaborate closely with engineering teams to deliver high-quality software.
                    </p>
                </div>
                <div className="about-sidebar">
                    <div className="about-item">
                        <div className="about-item-label">Focus</div>
                        <div className="about-item-val">
                            Full Stack Development
                            <br />
                            <span style={{ color: 'var(--ink-muted)', fontSize: '13px' }}>React · Node.js · Cloud</span>
                        </div>
                    </div>
                    <div className="about-item">
                        <div className="about-item-label">Based in</div>
                        <div className="about-item-val">
                            Remote
                            <br />
                            <span style={{ color: 'var(--ink-muted)', fontSize: '13px' }}>Open to on-site / hybrid</span>
                        </div>
                    </div>
                    <div className="about-item">
                        <div className="about-item-label">Tools</div>
                        <div className="about-item-val" style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.8 }}>
                            VS Code · Git · Docker · Linux
                            <br />
                            Vite · CSS · MongoDB · Redis
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .about-section {
                    padding: 100px 48px;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .about-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 48px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid var(--border);
                }
                .about-title {
                    font-family: var(--serif);
                    font-size: clamp(28px, 3vw, 36px);
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    color: var(--ink);
                }
                .about-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 60px;
                    align-items: start;
                }
                .about-text p {
                    color: var(--ink-muted);
                    line-height: 1.8;
                    margin-bottom: 16px;
                    font-size: 16px;
                }
                .about-text p strong {
                    color: var(--ink);
                    font-weight: 500;
                }
                .about-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .about-item {
                    padding: 20px;
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                }
                .about-item-label {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--ink-muted);
                    margin-bottom: 6px;
                }
                .about-item-val {
                    font-size: 14px;
                    color: var(--ink);
                    font-weight: 400;
                }
                @media (max-width: 768px) {
                    .about-section { padding: 30px 24px; }
                    .about-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </section>
    );
};

export default About;
