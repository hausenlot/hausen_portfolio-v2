const Footer = () => {
    return (
        <footer className="site-footer">
            <span>© 2026 Ser Polo of hausenlot</span>
            <span className="footer-links">
                <a href="https://github.com/hausenlot" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/paul-john-sopranes-862848381/" target="_blank" rel="noreferrer">LinkedIn</a>
            </span>

            <style>{`
                .site-footer {
                    padding: 40px 48px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid var(--border);
                    font-size: 13px;
                    color: var(--ink-muted);
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .footer-links {
                    display: flex;
                    gap: 24px;
                }
                .footer-links a {
                    color: var(--ink-muted);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .footer-links a:hover {
                    color: var(--ink);
                }
                @media (max-width: 768px) {
                    .site-footer {
                        flex-direction: column;
                        gap: 12px;
                        text-align: center;
                        padding: 40px 24px;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;