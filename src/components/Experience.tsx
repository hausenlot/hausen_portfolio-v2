import { experiences } from '../data/experiences';

const Experience = () => {
    return (
        <section id="experience" className="exp-section">
            <div className="exp-header">
                <h2 className="exp-title">Experience</h2>
            </div>
            <div className="exp-list">
                {experiences.map((exp, i) => (
                    <div key={i} className="exp-item">
                        <div className="exp-date">
                            {exp.period}
                            <br />
                            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{exp.duration}</span>
                        </div>
                        <div>
                            <div className="exp-company">{exp.company}</div>
                            <div className="exp-role">{exp.role}</div>
                            <p className="exp-desc">{exp.description}</p>
                            {exp.metrics && (
                                <div className="exp-metrics">
                                    {exp.metrics.map((m, j) => (
                                        <div key={j} className="metric">
                                            <span className="metric-val">{m.value}</span>
                                            <span className="metric-label">{m.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .exp-section {
                    padding: 100px 48px;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .exp-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 48px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid var(--border);
                }
                .exp-title {
                    font-family: var(--serif);
                    font-size: clamp(28px, 3vw, 36px);
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    color: var(--ink);
                }
                .exp-list {
                    display: flex;
                    flex-direction: column;
                }
                .exp-item {
                    display: grid;
                    grid-template-columns: 200px 1fr;
                    gap: 40px;
                    padding: 32px 0;
                    border-bottom: 1px solid var(--border);
                }
                .exp-item:first-child {
                    padding-top: 0;
                }
                .exp-date {
                    font-size: 13px;
                    color: var(--ink-muted);
                    padding-top: 2px;
                }
                .exp-company {
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--accent);
                    margin-bottom: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                }
                .exp-role {
                    font-family: var(--serif);
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--ink);
                    margin-bottom: 10px;
                    letter-spacing: -0.02em;
                }
                .exp-desc {
                    font-size: 14px;
                    color: var(--ink-muted);
                    line-height: 1.7;
                }
                .exp-metrics {
                    display: flex;
                    gap: 24px;
                    margin-top: 16px;
                }
                .metric {
                    text-align: center;
                }
                .metric-val {
                    font-family: var(--serif);
                    font-size: 22px;
                    font-weight: 300;
                    color: var(--accent);
                    display: block;
                }
                .metric-label {
                    font-size: 11px;
                    color: var(--ink-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }
                @media (max-width: 768px) {
                    .exp-section { padding: 30px 24px; }
                    .exp-item {
                        grid-template-columns: 1fr;
                        gap: 8px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Experience;
