const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full h-16 bg-gray-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-t-4 border-zinc-900 dark:border-zinc-100 flex items-center justify-center gap-6 z-50 transition-all duration-300">
            <a href="#" className="font-bold underline text-xs tracking-widest hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GITHUB</a>
            <a href="#" className="font-bold underline text-xs tracking-widest hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LINKEDIN</a>
        </footer>
    );
};

export default Footer;