export interface Project {
    title: string;
    description: string;
    tech: string[];
    url?: string;
    repo?: string;
}

export const projects: Project[] = [
    {
        title: 'PORTFOLIO V2',
        description: 'This very portfolio — built with React, TypeScript, and Tailwind CSS. Features interactive apps like Tic-Tac-Toe, Text-to-Speech, and a Dino runner game.',
        tech: ['React', 'TypeScript', 'Tailwind'],
        repo: 'https://github.com/username/v2-hausen-portfolio',
    },
    {
        title: 'DEPLOYMENT TOOL',
        description: 'A web-based deployment automation tool that handles SSH connections, file uploads, and remote command execution with real-time feedback.',
        tech: ['Node.js', 'Express', 'SSH2'],
        url: 'https://deploy.example.com',
        repo: 'https://github.com/username/deploy-tool',
    },
    {
        title: 'REAL-TIME CHAT APP',
        description: 'Full-stack chat application with WebSocket support, user authentication, and message persistence using MongoDB.',
        tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
        repo: 'https://github.com/username/chat-app',
    },
    {
        title: 'API GATEWAY',
        description: 'A lightweight API gateway with rate limiting, request logging, and dynamic route configuration.',
        tech: ['Node.js', 'Redis', 'Docker'],
        repo: 'https://github.com/username/api-gateway',
    },
];
