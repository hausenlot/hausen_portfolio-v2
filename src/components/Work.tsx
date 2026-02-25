import { projects } from '../data/projects';

const Work = () => {
    return (
        <section id="work" className="work-section">
            <div className="section-header">
                <h2 className="section-title">Selected work</h2>
                <span className="section-count">{projects.length} projects</span>
            </div>

            <div className="work-grid">
                {projects.map((project) => (
                    <a
                        key={project.title}
                        href={project.url || project.repo || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className={`work-card${project.featured ? ' featured' : ''}`}
                    >
                        <div
                            className="work-thumb"
                            style={{ background: project.thumbGradient }}
                        >
                            {/* Wireframe mockup */}
                            <div className="thumb-ui">
                                <div className="thumb-bar accent" />
                                <div className="thumb-bar short" />
                                <div className="thumb-row">
                                    <div className="thumb-block accent" />
                                    <div className="thumb-block" />
                                    <div className="thumb-block" />
                                </div>
                                <div className="thumb-bar shorter" />
                            </div>
                            <div className="work-thumb-overlay">
                                <span className="view-label">View project →</span>
                            </div>
                        </div>
                        <div className="work-body">
                            <div>
                                <div className="work-category">{project.category}</div>
                                <div className="work-title">{project.title}</div>
                                <p className="work-desc">{project.description}</p>
                                <div className="work-tags">
                                    {project.tech.map((t) => (
                                        <span key={t} className="work-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="work-meta-row">
                                <span>{project.year}</span>
                                {project.impact && (
                                    <span className="work-impact">{project.impact}</span>
                                )}
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <style>{`
                .work-section {
                    padding: 100px 48px;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 48px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid var(--border);
                }
                .section-title {
                    font-family: var(--serif);
                    font-size: clamp(28px, 3vw, 36px);
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    color: var(--ink);
                }
                .section-count {
                    font-size: 13px;
                    color: var(--ink-muted);
                }
                .work-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }
                .work-card {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    cursor: pointer;
                    transition: box-shadow 0.25s, transform 0.2s;
                    text-decoration: none;
                    color: inherit;
                    display: block;
                }
                .work-card:hover {
                    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
                    transform: translateY(-3px);
                }
                .work-card.featured {
                    grid-column: 1 / -1;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
                .work-thumb {
                    aspect-ratio: 16/10;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .work-card.featured .work-thumb {
                    aspect-ratio: auto;
                }
                .work-thumb-overlay {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    background: rgba(197,89,58,0.08);
                    transition: opacity 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .work-card:hover .work-thumb-overlay {
                    opacity: 1;
                }
                .view-label {
                    background: var(--ink);
                    color: #FDFCFA;
                    padding: 8px 18px;
                    border-radius: 40px;
                    font-size: 12px;
                    font-weight: 500;
                    transform: translateY(6px);
                    transition: transform 0.3s;
                }
                .work-card:hover .view-label {
                    transform: translateY(0);
                }
                .thumb-ui {
                    width: 80%;
                    background: white;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }
                .thumb-bar {
                    height: 8px;
                    border-radius: 4px;
                    background: var(--border);
                    margin-bottom: 10px;
                }
                .thumb-bar.accent { background: var(--accent); width: 40%; }
                .thumb-bar.short { width: 60%; }
                .thumb-bar.shorter { width: 30%; }
                .thumb-row {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 10px;
                }
                .thumb-block {
                    flex: 1;
                    height: 40px;
                    background: var(--surface);
                    border-radius: 6px;
                }
                .thumb-block.accent { background: var(--accent-light); }
                .work-body {
                    padding: 24px 28px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 16px;
                }
                .work-category {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--accent);
                }
                .work-title {
                    font-family: var(--serif);
                    font-size: 22px;
                    font-weight: 300;
                    line-height: 1.25;
                    letter-spacing: -0.02em;
                    color: var(--ink);
                    margin: 6px 0;
                }
                .work-desc {
                    font-size: 13px;
                    color: var(--ink-muted);
                    line-height: 1.6;
                }
                .work-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 12px;
                }
                .work-tag {
                    font-size: 11px;
                    color: var(--ink-muted);
                    background: var(--surface);
                    padding: 3px 10px;
                    border-radius: 20px;
                }
                .work-meta-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 12px;
                    color: var(--ink-muted);
                    padding-top: 16px;
                    border-top: 1px solid var(--border);
                    margin-top: 8px;
                }
                .work-impact {
                    font-weight: 500;
                    color: var(--ink);
                }
                @media (max-width: 768px) {
                    .work-section { padding: 30px 24px; }
                    .work-grid { grid-template-columns: 1fr; }
                    .work-card.featured { grid-template-columns: 1fr; }
                }
            `}</style>
        </section>
    );
};

export default Work;
