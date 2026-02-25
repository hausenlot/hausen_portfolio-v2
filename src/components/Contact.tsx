const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="contact-wrapper">
                <h2>Let's build something together</h2>
                <p>
                    I'm exploring full-stack and frontend roles. If you're building something
                    meaningful, I'd love to chat.
                </p>
                <div className="contact-actions">
                    <a href="mailto:petrehausen@gmail.com" className="btn-white">
                        Send an email →
                    </a>
                    <a href="https://www.linkedin.com/in/paul-john-sopranes-862848381/" target="_blank" rel="noreferrer" className="btn-outline-white">
                        Connect on LinkedIn
                    </a>
                </div>
            </div>

            <style>{`
                .contact-section {
                    padding: 100px 48px 0;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .contact-wrapper {
                    background: var(--ink);
                    border-radius: 20px;
                    padding: 72px 80px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .contact-wrapper::before {
                    content: '';
                    position: absolute;
                    top: -40px;
                    right: -40px;
                    width: 200px;
                    height: 200px;
                    background: var(--accent);
                    border-radius: 50%;
                    opacity: 0.12;
                }
                .contact-wrapper h2 {
                    font-family: var(--serif);
                    font-size: clamp(32px, 4vw, 48px);
                    font-weight: 300;
                    color: var(--bg);
                    letter-spacing: -0.03em;
                    margin-bottom: 16px;
                    position: relative;
                }
                .contact-wrapper p {
                    color: rgba(245, 243, 238, 0.6);
                    font-size: 16px;
                    margin-bottom: 40px;
                    max-width: 440px;
                    margin-left: auto;
                    margin-right: auto;
                    position: relative;
                }
                .contact-actions {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                    position: relative;
                }
                .btn-white {
                    display: inline-block;
                    background: var(--bg);
                    color: var(--ink);
                    padding: 13px 28px;
                    border-radius: 40px;
                    font-size: 14px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: background 0.2s, transform 0.15s;
                }
                .btn-white:hover {
                    background: var(--accent-light);
                    transform: translateY(-1px);
                }
                .btn-outline-white {
                    display: inline-block;
                    color: rgba(245, 243, 238, 0.7);
                    font-size: 14px;
                    text-decoration: none;
                    padding: 13px 28px;
                    border: 1px solid rgba(245, 243, 238, 0.2);
                    border-radius: 40px;
                    transition: all 0.2s;
                }
                .btn-outline-white:hover {
                    color: var(--bg);
                    border-color: rgba(245, 243, 238, 0.5);
                }
                @media (max-width: 768px) {
                    .contact-section { padding: 30px 24px 0; }
                    .contact-wrapper { padding: 48px 32px; }
                }
            `}</style>
        </section>
    );
};

export default Contact;
