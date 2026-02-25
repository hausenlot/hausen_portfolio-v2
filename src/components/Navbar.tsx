import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { name: 'ABOUT', href: '#about' },
        { name: 'SKILLS', href: '#skills' },
        { name: 'APPS', href: '#apps' },
        { name: 'PROJECTS', href: '#projects' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-gray-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-b-4 border-zinc-900 dark:border-zinc-100 flex items-center justify-between px-6 z-50 transition-all duration-300">
            <h1 className="font-black text-xl tracking-tightest">HAUSEN.</h1>

            <div className="flex items-center gap-6">
                <div className="hidden sm:flex gap-4">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="font-bold text-xs tracking-widest hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 border-2 border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all font-bold text-[10px] tracking-widest uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                    {theme === 'light' ? 'DARK' : 'LIGHT'}
                </button>
            </div>

            {/* Mobile Nav Placeholder or just show links if small enough */}
            <div className="flex sm:hidden gap-3">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="font-bold text-[10px] tracking-tighter"
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;