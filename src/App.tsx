import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import InteractiveApps from './components/InteractiveApps';
import Work from './components/Work';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', transition: 'background 0.3s, color 0.3s' }}>
            <Navbar />

            <main>
                <Hero />
                <InteractiveApps />
                <Work />
                <About />
                <Experience />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default App;