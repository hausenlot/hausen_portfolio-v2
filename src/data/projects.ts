export interface Project {
    title: string;
    description: string;
    tech: string[];
    category: string;
    year: string;
    impact?: string;
    thumbGradient: string;
    url?: string;
    repo?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        title: 'Portfolio V2',
        description: 'This portfolio site — built with React, TypeScript, and vanilla CSS. Features interactive demos including Tic-Tac-Toe, Text-to-Speech, Speech-to-Text, and a Dino runner game.',
        tech: ['React', 'TypeScript', 'CSS', 'Vite'],
        category: 'Web · Personal',
        year: '2025',
        impact: 'Shipped & live',
        thumbGradient: 'linear-gradient(135deg, #E8F0F7 0%, #C5D8EC 100%)',
        repo: 'https://github.com/username/v2-hausen-portfolio',
        featured: true,
    },
    {
        title: 'Deployment Tool',
        description: 'A web-based deployment automation tool that handles SSH connections, file uploads, and remote command execution with real-time feedback.',
        tech: ['Node.js', 'Express', 'SSH2'],
        category: 'DevOps · Tooling',
        year: '2024',
        impact: 'Automated deploys',
        thumbGradient: 'linear-gradient(135deg, #F0EEE8 0%, #DDD8CC 100%)',
        url: 'https://deploy.example.com',
        repo: 'https://github.com/username/deploy-tool',
    },
    {
        title: 'Real-time Chat App',
        description: 'Full-stack chat application with WebSocket support, user authentication, and message persistence using MongoDB.',
        tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
        category: 'Full Stack · Real-time',
        year: '2024',
        impact: 'Real-time messaging',
        thumbGradient: 'linear-gradient(135deg, #EEF0E8 0%, #CCDBC5 100%)',
        repo: 'https://github.com/username/chat-app',
    },
    {
        title: 'API Gateway',
        description: 'A lightweight API gateway with rate limiting, request logging, and dynamic route configuration.',
        tech: ['Node.js', 'Redis', 'Docker'],
        category: 'Backend · Infrastructure',
        year: '2023',
        impact: 'Scalable routing',
        thumbGradient: 'linear-gradient(135deg, #F0E8EE 0%, #DCC5DB 100%)',
        repo: 'https://github.com/username/api-gateway',
    },
];
