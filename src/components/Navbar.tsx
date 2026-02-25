import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { name: 'Work', href: '#work' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
    ];

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 48px',
                background: theme === 'dark'
                    ? 'rgba(20, 18, 16, 0.88)'
                    : 'rgba(245, 243, 238, 0.88)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.3s',
            }}
        >
            <a
                href="#"
                style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '17px',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                }}
            >
                Paul (polo)
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
                <ul
                    className="nav-links-desktop"
                    style={{
                        display: 'flex',
                        gap: '36px',
                        listStyle: 'none',
                    }}
                >
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    color: 'var(--ink-muted)',
                                    textDecoration: 'none',
                                    letterSpacing: '0.01em',
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#contact"
                            style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: theme === 'dark' ? 'var(--ink)' : 'var(--white)',
                                background: theme === 'dark' ? 'var(--accent)' : 'var(--ink)',
                                padding: '8px 20px',
                                borderRadius: '40px',
                                textDecoration: 'none',
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.background = theme === 'dark' ? 'var(--accent)' : 'var(--ink)')
                            }
                        >
                            Get in touch
                        </a>
                    </li>
                </ul>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'none',
                        border: '1px solid var(--border)',
                        borderRadius: '40px',
                        padding: '6px 14px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--ink-muted)',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--sans)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--ink)';
                        e.currentTarget.style.borderColor = 'var(--ink)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--ink-muted)';
                        e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                >
                    {theme === 'light' ? '● Dark' : '○ Light'}
                </button>
            </div>

            {/* Mobile: Show simplified nav */}
            <style>{`
                @media (max-width: 768px) {
                    nav { padding: 16px 24px !important; }
                    .nav-links-desktop { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;