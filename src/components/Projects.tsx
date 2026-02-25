import { useState } from 'react';
import { projects } from '../data/projects';

const Projects = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="projects" className="border-4 border-zinc-900 dark:border-white bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <h2 className="text-3xl font-black p-8 pb-0 mb-6 tracking-tightest">PROJECTS</h2>

            <div className="divide-y-4 divide-zinc-900 dark:divide-white border-t-4 border-zinc-900 dark:border-white">
                {projects.map((project, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div key={project.title}>
                            {/* Collapsed header — always visible */}
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between p-4 px-6 text-left hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
                            >
                                <span className="font-bold text-sm tracking-tight">{project.title}</span>
                                <span className="font-mono text-lg leading-none select-none">
                                    {isOpen ? '−' : '+'}
                                </span>
                            </button>

                            {/* Expanded content */}
                            {isOpen && (
                                <div className="px-6 pb-6">
                                    <p className="text-sm leading-relaxed mb-4">
                                        {project.description}
                                    </p>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="font-mono text-xs border border-zinc-900 dark:border-white px-2 py-1 font-bold"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-3">
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-bold border-2 border-zinc-900 dark:border-white px-3 py-2 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none"
                                            >
                                                LIVE ↗
                                            </a>
                                        )}
                                        {project.repo && (
                                            <a
                                                href={project.repo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-bold border-2 border-zinc-900 dark:border-white px-3 py-2 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none"
                                            >
                                                CODE ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
