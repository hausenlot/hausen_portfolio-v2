import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 scroll-smooth transition-all duration-300">

            {/* Pinned Top */}
            <Navbar />

            {/* Main Scrollable Area 
          pt-20 = 5rem (80px) to clear the 16 (64px) header + breathing room
          pb-20 = same logic for footer
      */}
            <main className="max-w-md mx-auto pt-24 pb-24 px-4 w-full">
                <Hero />
            </main>

            {/* Pinned Bottom */}
            <Footer />

        </div>
    );
}

export default App;