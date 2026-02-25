import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

const NOTHING_TO_SEE_HERE = atob(
    'aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J6OGQzRW1zeVhDRVNocllEa3U3VEhtX0RQVnYzNWtDQ05kSnBzZllNeVQwNndhM1VQbjVPVDVJdnUzM1ExVlROTDQvZXhlYw=='
);

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) return;

        setStatus('sending');
        try {
            await fetch(NOTHING_TO_SEE_HERE ?? '', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
            });
            // no-cors returns opaque response — we assume success
            setStatus('sent');
            setName('');
            setEmail('');
            setMessage('');
        } catch {
            setStatus('error');
        }
    };

    const reset = () => setStatus('idle');

    return (
        <section id="contact" className="contact-section">
            <div className="contact-wrapper">
                <h2>Let's build something together</h2>
                <p>
                    I'm exploring full-stack and frontend roles. If you're building something
                    meaningful, drop me a message.
                </p>

                {status === 'sent' ? (
                    <div className="contact-success">
                        <span className="success-icon">✓</span>
                        <strong>Message sent!</strong>
                        <span>I'll get back to you soon.</span>
                        <button className="btn-outline-white" onClick={reset} type="button">
                            Send another
                        </button>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <input
                                id="contact-name"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={status === 'sending'}
                            />
                            <input
                                id="contact-email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={status === 'sending'}
                            />
                        </div>
                        <textarea
                            id="contact-message"
                            placeholder="Your message..."
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            disabled={status === 'sending'}
                        />
                        <div className="contact-actions">
                            <button
                                id="contact-submit"
                                type="submit"
                                className="btn-white"
                                disabled={status === 'sending' || !name.trim() || !email.trim() || !message.trim()}
                            >
                                {status === 'sending' ? 'Sending…' : status === 'error' ? 'Retry →' : 'Send message →'}
                            </button>
                            <a
                                href="https://www.linkedin.com/in/paul-john-sopranes-862848381/"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-outline-white"
                            >
                                Connect on LinkedIn
                            </a>
                        </div>
                        {status === 'error' && (
                            <p className="form-error">Something went wrong. Please try again.</p>
                        )}
                    </form>
                )}
            </div>

            <style>{`
                .contact-section {
                    padding: 0px 48px 50px;
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
                    color: color-mix(in srgb, var(--bg) 60%, transparent);
                    font-size: 16px;
                    margin-bottom: 40px;
                    max-width: 440px;
                    margin-left: auto;
                    margin-right: auto;
                    position: relative;
                }

                /* ── Form ── */
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    max-width: 520px;
                    margin: 0 auto;
                    position: relative;
                    text-align: left;
                }
                .form-row {
                    display: flex;
                    gap: 14px;
                }
                .form-row input {
                    flex: 1;
                }
                .contact-form input,
                .contact-form textarea {
                    width: 100%;
                    padding: 14px 18px;
                    border-radius: 12px;
                    border: 1px solid color-mix(in srgb, var(--bg) 18%, transparent);
                    background: color-mix(in srgb, var(--bg) 8%, transparent);
                    color: var(--bg);
                    font-family: var(--sans);
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s;
                    resize: vertical;
                }
                .contact-form input::placeholder,
                .contact-form textarea::placeholder {
                    color: color-mix(in srgb, var(--bg) 35%, transparent);
                }
                .contact-form input:focus,
                .contact-form textarea:focus {
                    border-color: var(--accent);
                    background: color-mix(in srgb, var(--bg) 12%, transparent);
                }
                .contact-form input:disabled,
                .contact-form textarea:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                /* ── Buttons ── */
                .contact-actions {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                    position: relative;
                    margin-top: 6px;
                }
                .btn-white {
                    display: inline-block;
                    background: var(--bg);
                    color: var(--ink);
                    padding: 13px 28px;
                    border-radius: 40px;
                    font-size: 14px;
                    font-weight: 500;
                    font-family: var(--sans);
                    text-decoration: none;
                    border: none;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.15s;
                }
                .btn-white:hover:not(:disabled) {
                    background: var(--accent-light);
                    transform: translateY(-1px);
                }
                .btn-white:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                }
                .btn-outline-white {
                    display: inline-flex;
                    align-items: center;
                    color: color-mix(in srgb, var(--bg) 70%, transparent);
                    font-size: 14px;
                    font-family: var(--sans);
                    text-decoration: none;
                    padding: 13px 28px;
                    border: 1px solid color-mix(in srgb, var(--bg) 20%, transparent);
                    border-radius: 40px;
                    background: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-outline-white:hover {
                    color: var(--bg);
                    border-color: color-mix(in srgb, var(--bg) 50%, transparent);
                }

                /* ── Success State ── */
                .contact-success {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    position: relative;
                }
                .success-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: var(--accent);
                    color: #fff;
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 4px;
                }
                .contact-success strong {
                    color: var(--bg);
                    font-size: 18px;
                }
                .contact-success span:not(.success-icon) {
                    color: color-mix(in srgb, var(--bg) 55%, transparent);
                    font-size: 14px;
                }
                .contact-success .btn-outline-white {
                    margin-top: 12px;
                }

                /* ── Error ── */
                .form-error {
                    color: #f87171 !important;
                    font-size: 13px !important;
                    text-align: center;
                    margin-bottom: 0 !important;
                }

                /* ── Responsive ── */
                @media (max-width: 768px) {
                    .contact-section { padding: 30px 24px 0; }
                    .contact-wrapper { padding: 48px 32px; }
                    .form-row { flex-direction: column; }
                }
            `}</style>
        </section>
    );
};

export default Contact;
