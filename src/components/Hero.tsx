import TicTacToe from './TicTacToe';
import TextToSpeech from './TextToSpeech';
import SpeechToText from './SpeechToText';
import DinoGame from './DinoGame';
import Projects from './Projects';

const Hero = () => {
    return (
        <div className="flex flex-col gap-12 py-8">
            {/* About Section */}
            <section id="about" className="border-4 border-zinc-900 dark:border-white p-8 bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-3xl font-black mb-6 tracking-tightest border-b-4 border-zinc-900 dark:border-white inline-block">ABOUT ME</h2>
                <p className="text-xl leading-relaxed font-bold">
                    I am a Full Stack Developer refreshing my frontend skills.
                    I build robust applications and am currently focused on React, TypeScript, and modern UI patterns.
                </p>
            </section>

            {/* Skills Section */}
            <section id="skills" className="border-4 border-zinc-900 dark:border-white p-8 bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                <h2 className="text-3xl font-black mb-6 tracking-tightest border-b-4 border-zinc-900 dark:border-white inline-block">TECHNOLOGIES</h2>
                <div className="flex flex-wrap gap-4 font-mono text-sm">
                    <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1 font-bold">[REACT]</span>
                    <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1 font-bold">[TYPESCRIPT]</span>
                    <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1 font-bold">[TAILWIND]</span>
                    <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1 font-bold">[NODE.JS]</span>
                    <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1 font-bold">[MONGODB]</span>
                    <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1 font-bold">[DOCKER]</span>
                </div>
            </section>

            {/* Interactive Apps */}
            <section id="apps" className="border-4 border-zinc-900 dark:border-white p-8 bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <h2 className="text-3xl font-black mb-8 tracking-tightest border-b-4 border-zinc-900 dark:border-white inline-block">INTERACTIVE APPS</h2>
                <div className="flex flex-wrap gap-8">
                    <TicTacToe />
                    <TextToSpeech />
                    <SpeechToText />
                    <DinoGame />
                </div>
            </section>

            {/* Projects */}
            <Projects />
        </div>
    );
};

export default Hero;