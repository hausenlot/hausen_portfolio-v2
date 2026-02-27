import { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import { useTheme } from '../hooks/useTheme';

const Work = () => {
    const [statuses, setStatuses] = useState<Record<string, string>>({});
    const { theme } = useTheme();

    useEffect(() => {
        const checkStatuses = async () => {
            const newStatuses: Record<string, string> = {};

            const checkProjectStatus = (url: string) => {
                return new Promise<string>((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve("Online");
                    img.onerror = () => resolve("Offline");
                    // Append vite.svg and a timestamp to bypass cache
                    img.src = `${url}vite.svg?t=${new Date().getTime()}`;
                });
            };

            const promises = projects.map(async (project) => {
                const projectId = project.id || project.title;
                if (project.checkUrl) {
                    const status = await checkProjectStatus(project.checkUrl);
                    newStatuses[projectId] = status;
                }
            });

            await Promise.all(promises);
            setStatuses(prev => ({ ...prev, ...newStatuses }));
        };

        checkStatuses();

        // Optional: Polling every 30 seconds
        const interval = setInterval(checkStatuses, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="work" className="work-section">
            <div className="section-header">
                <h2 className="section-title">Some Projects</h2>
                <span className="section-count">{projects.length} projects</span>
            </div>

            <div className="work-grid">
                {projects.map((project) => {
                    const projectId = project.id || project.title;
                    const status = statuses[projectId];

                    const renderThumbnailArt = () => {
                        switch (project.thumbnailType) {
                            case 'terminal':
                                return (
                                    <div className="thumb-terminal">
                                        <div className="terminal-header">
                                            <div className="terminal-dot red"></div>
                                            <div className="terminal-dot yellow"></div>
                                            <div className="terminal-dot green"></div>
                                        </div>
                                        <div className="terminal-body">
                                            <div className="terminal-line"><span className="prompt">$</span> initializing model...</div>
                                            <div className="terminal-line"><span className="prompt">$</span> loading weights... 100%</div>
                                            <div className="terminal-line success">Ready. Waiting for input.</div>
                                            <div className="terminal-line cursor-blink">_</div>
                                        </div>
                                    </div>
                                );
                            case 'server':
                                return (
                                    <div className="thumb-server">
                                        <div className="server-rack">
                                            <div className="server-unit active">
                                                <div className="server-lights">
                                                    <div className="light green blink"></div>
                                                    <div className="light blue"></div>
                                                </div>
                                                <div className="server-lines">
                                                    <div className="s-line"></div>
                                                    <div className="s-line"></div>
                                                </div>
                                            </div>
                                            <div className="server-unit">
                                                <div className="server-lights">
                                                    <div className="light green"></div>
                                                    <div className="light red"></div>
                                                </div>
                                                <div className="server-lines">
                                                    <div className="s-line"></div>
                                                    <div className="s-line"></div>
                                                </div>
                                            </div>
                                            <div className="server-unit active">
                                                <div className="server-lights">
                                                    <div className="light green blink"></div>
                                                    <div className="light blue"></div>
                                                </div>
                                                <div className="server-lines">
                                                    <div className="s-line"></div>
                                                    <div className="s-line"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            case 'dashboard':
                            default:
                                return (
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
                                );
                        }
                    };

                    return (
                        <div
                            key={projectId}
                            className={`work-card${project.featured ? ' featured' : ''}`}
                        >
                            <a
                                href={project.url || project.repo || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="work-thumb"
                                style={{ background: theme === 'dark' && project.thumbGradientDark ? project.thumbGradientDark : project.thumbGradient }}
                            >
                                {renderThumbnailArt()}
                                <div className="work-thumb-overlay">
                                    <span className="view-label">View project →</span>
                                </div>
                            </a>
                            <div className="work-body">
                                <div>
                                    <div className="work-category-row">
                                        <div className="work-category">{project.category}</div>
                                        {project.checkUrl && status && (
                                            <div className="status-badge">
                                                <span className={`status-dot ${status.toLowerCase()}`} />
                                                {status}
                                            </div>
                                        )}
                                        {project.checkUrl && !status && (
                                            <div className="status-badge">
                                                <span className="status-dot checking" />
                                                Checking...
                                            </div>
                                        )}
                                    </div>
                                    <div className="work-title">{project.title}</div>
                                    <p className="work-desc">
                                        <span className="desktop-desc">{project.descriptionDesktop || project.description}</span>
                                        <span className="mobile-desc">{project.descriptionMobile || project.description}</span>
                                    </p>
                                    <div className="work-tags">
                                        {project.tech.map((t) => (
                                            <span key={t} className="work-tag">{t}</span>
                                        ))}
                                    </div>
                                    {status === 'Offline' && project.offlineMessage && (
                                        <div className="offline-notice">
                                            {project.offlineMessage}
                                        </div>
                                    )}
                                    {status === 'Online' && project.onlineMessage && (
                                        <div className="online-notice">
                                            {project.onlineMessage}
                                        </div>
                                    )}
                                </div>

                                <div className="work-footer">
                                    <div className="work-links">
                                        {project.url && (
                                            <a href={project.url} target="_blank" rel="noreferrer" className="work-action-link">
                                                Visit Site ↗
                                            </a>
                                        )}
                                        {/* {project.demoUrl && (
                                            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="work-action-link accent">
                                                Watch Demo ↗
                                            </a>
                                        )} */}
                                        {project.repo && (
                                            <a href={project.repo} target="_blank" rel="noreferrer" className="work-action-link">
                                                GitHub ↗
                                            </a>
                                        )}
                                    </div>
                                    <div className="work-meta-row">
                                        <span>{project.year}</span>
                                        {project.impact && (
                                            <span className="work-impact">{project.impact}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .work-section {
                    padding: 0px 48px 50px;
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
                    transition: box-shadow 0.25s, transform 0.2s;
                    display: flex;
                    flex-direction: column;
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
                    text-decoration: none;
                    color: inherit;
                }
                .work-card.featured .work-thumb {
                    aspect-ratio: auto;
                    height: 100%;
                }
                .work-thumb-overlay {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    background: color-mix(in srgb, var(--accent) 12%, transparent);
                    transition: opacity 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .work-thumb:hover .work-thumb-overlay {
                    opacity: 1;
                }
                .view-label {
                    background: var(--ink);
                    color: var(--bg);
                    padding: 8px 18px;
                    border-radius: 40px;
                    font-size: 12px;
                    font-weight: 500;
                    transform: translateY(6px);
                    transition: transform 0.3s;
                }
                .work-thumb:hover .view-label {
                    transform: translateY(0);
                }
                
                /* Dashboard Art */
                .thumb-ui {
                    width: 80%;
                    background: var(--surface);
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
                
                /* Terminal Art */
                .thumb-terminal {
                    width: 80%;
                    background: #1e1e1e;
                    border-radius: 8px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                    overflow: hidden;
                    font-family: monospace;
                    color: #d4d4d4;
                    font-size: 10px;
                    padding-bottom: 12px;
                }
                .terminal-header {
                    background: #323233;
                    padding: 8px 12px;
                    display: flex;
                    gap: 6px;
                }
                .terminal-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                .terminal-dot.red { background: #ff5f56; }
                .terminal-dot.yellow { background: #ffbd2e; }
                .terminal-dot.green { background: #27c93f; }
                .terminal-body {
                    padding: 12px;
                }
                .terminal-line { margin-bottom: 4px; }
                .prompt { color: #569cd6; margin-right: 6px; }
                .success { color: #4CAF50; }
                .cursor-blink { animation: blink 1s step-end infinite; }
                @keyframes blink { 50% { opacity: 0; } }

                /* Server/Database Art */
                .thumb-server {
                    width: 70%;
                    display: flex;
                    justify-content: center;
                }
                .server-rack {
                    width: 100%;
                    background: #2b2b2b;
                    border-radius: 6px;
                    padding: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
                    border: 2px solid #4a4a4a;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .server-unit {
                    background: #1a1a1a;
                    height: 28px;
                    border-radius: 3px;
                    border: 1px solid #333;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 12px;
                    position: relative;
                }
                .server-unit.active { border-color: #4a4a4a; }
                .server-lights {
                    display: flex;
                    gap: 4px;
                }
                .light {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #555;
                }
                .light.green { background: #4CAF50; box-shadow: 0 0 6px #4CAF50; }
                .light.red { background: #f44336; }
                .light.blue { background: #2196F3; }
                .light.blink { animation: flash 1.5s infinite; }
                @keyframes flash {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                .server-lines {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    width: 30%;
                }
                .s-line {
                    height: 2px;
                    background: #444;
                    border-radius: 1px;
                }
                
                .work-body {
                    padding: 24px 28px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 16px;
                    flex: 1;
                }
                .work-category-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 6px;
                }
                .work-category {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--accent);
                }
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 600;
                    padding: 4px 8px;
                    border-radius: 12px;
                    background: var(--surface);
                    color: var(--ink-muted);
                }
                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }
                .status-dot.online { background: #4caf50; box-shadow: 0 0 4px rgba(76, 175, 80, 0.4); }
                .status-dot.offline { background: #f44336; }
                .status-dot.checking { background: #ff9800; animation: pulse 1s infinite alternate; }
                
                @keyframes pulse {
                    from { opacity: 0.5; }
                    to { opacity: 1; }
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
                .desktop-desc { display: inline; }
                .mobile-desc { display: none; }
                
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
                .work-footer {
                    margin-top: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .work-links {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    padding-top: 8px;
                }
                .work-action-link {
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--ink);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    transition: all 0.2s;
                    background: transparent;
                }
                .work-action-link:hover {
                    background: var(--bg);
                    border-color: var(--ink-muted);
                }
                .work-action-link.accent {
                    color: #d1563e;
                    border-color: rgba(209, 86, 62, 0.4);
                    background: rgba(209, 86, 62, 0.05);
                }
                .work-action-link.accent:hover {
                    background: rgba(209, 86, 62, 0.1);
                    border-color: rgba(209, 86, 62, 0.6);
                }
                .offline-notice {
                    margin-top: 14px;
                    padding: 10px 14px;
                    background: rgba(244, 67, 54, 0.06);
                    border-left: 3px solid #f44336;
                    border-radius: 4px;
                    font-size: 13px;
                    color: var(--ink-muted);
                    line-height: 1.5;
                }
                .online-notice {
                    margin-top: 14px;
                    padding: 10px 14px;
                    background: rgba(76, 175, 80, 0.06);
                    border-left: 3px solid #4CAF50;
                    border-radius: 4px;
                    font-size: 13px;
                    color: var(--ink-muted);
                    line-height: 1.5;
                }
                .work-meta-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 12px;
                    color: var(--ink-muted);
                    padding-top: 16px;
                    border-top: 1px solid var(--border);
                }
                .work-impact {
                    font-weight: 500;
                    color: var(--ink);
                }
                @media (max-width: 768px) {
                    .desktop-desc { display: none; }
                    .mobile-desc { display: inline; }
                    .work-section { padding: 30px 24px; }
                    .work-grid { grid-template-columns: 1fr; }
                    .work-card.featured { grid-template-columns: 1fr; display: flex; flex-direction: column; }
                    .work-card.featured .work-thumb { height: auto; }
                }
            `}</style>
        </section>
    );
};

export default Work;

