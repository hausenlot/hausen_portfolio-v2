export interface Project {
    id?: string | number;
    title: string;
    description: string;
    descriptionMobile?: string;
    descriptionDesktop?: string;
    tech: string[];
    category: string;
    year: string;
    impact?: string;
    thumbGradient: string;
    thumbGradientDark?: string;
    url?: string;
    repo?: string;
    featured?: boolean;
    checkUrl?: string;
    thumbnailType?: 'dashboard' | 'terminal' | 'server' | 'api' | 'social' | 'browser';
    offlineMessage?: string;
    onlineMessage?: string;
    demoUrl?: string;
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
        thumbGradientDark: 'linear-gradient(135deg, #141C26 0%, #1A2636 100%)',
        repo: 'https://github.com/hausenlot/hausen_portfolio-v2',
        url: 'https://hausenlot.github.io/hausen_portfolio-v2/',
        featured: true,
        thumbnailType: 'dashboard',
    },
    {
        id: 1,
        title: "FFA File Manager",
        url: "https://file.polobutporo.xyz/",
        repo: "https://github.com/hausenlot/file-manager",
        tech: ["MongoDB", "Express", "React", "Node", "MinioS3", "RabbitMQ", "Docker", "Nginx", "CloudFlare", "GitHub Actions"],
        category: 'Full Stack · Self Hosted',
        year: '2025',
        impact: 'Self-Hosted',
        thumbGradient: 'linear-gradient(135deg, #EEF0E8 0%, #CCDBC5 100%)',
        thumbGradientDark: 'linear-gradient(135deg, #151C14 0%, #1A2619 100%)',
        checkUrl: "https://file.polobutporo.xyz/",
        descriptionMobile: "Fullstack Project of mine. Self Hosted in my own server. Can be used publicly or privately.",
        descriptionDesktop: "It's a fullstack project where I applied GitHub Actions for CI/CD, Docker for containerization, and Nginx for reverse proxy. It uses MinioS3 for storage and RabbitMQ for message queueing. I'm using CloudFlare for DNS.",
        description: "This is FullStack. Self Hosted in my own server. It uses MinioS3 for storage and RabbitMQ for message queueing. I'm using Nginx as a reverse proxy and CloudFlare for DNS.",
        thumbnailType: 'server',
        // offlineMessage: "My local server is currently resting 💤. Feel free to contact me if you'd like me to spin it up for you to test, or check out the demo video!",
        offlineMessage: "My local server is currently resting 💤. Feel free to contact me if you'd like me to spin it up for you to test.",
        onlineMessage: "The server is currently online and fully operational! Feel free to test it out.",
        demoUrl: "https://www.youtube.com/@hausenlot"
    },
    {
        id: 2,
        title: "Media Hub",
        url: "https://media-hub-rho.vercel.app/",
        repo: "https://github.com/hausenlot/media_hub",
        tech: ["React", "Typescript", "Vite", "WASM", "Piper", "FFmpeg", "Whisper-base"],
        category: 'AI · Client-Side Process · Vercel',
        year: '2026',
        impact: 'Live @ Vercel',
        thumbGradient: 'linear-gradient(135deg, #F0E8EE 0%, #DCC5DB 100%)',
        thumbGradientDark: 'linear-gradient(135deg, #1C141B 0%, #261A25 100%)',
        descriptionMobile: "No server? No problem. This app runs entirely on your browser using WASM.",
        descriptionDesktop: "It has a lot tools on it. You can Dub your Video with AI. You can translate it too before generating a Voice. You can give a file to get Transcription but english only, You can use TTS to generate any audio you want, Use FFMpeg to convert + modify your Video. Up to you",
        description: "It has a lot tools on it. You can Dub your Video with AI. You can translate it too before generating a Voice. You can give a file to get Transcription but english only, You can use TTS to generate any audio you want, Use FFMpeg to convert + modify your Video. Up to you",
        thumbnailType: 'browser',
        offlineMessage: "Vercel did me dirty. It was working I swear",
        onlineMessage: "Runs on Vercel so if its down then Vercel did me dirty lmao",
        demoUrl: "https://www.youtube.com/@hausenlot"
    },
    {
        title: 'Rant',
        description: 'A Social Media Platform built with React.js, ASP.NET Core, and SQL Lite. Pretty good for first try. I learned that ASP.NET Core is just basically Ruby on Rails minus the Front end and its useful helpers. The fact that its MVC, has migrations already makes me feel comfortable, As of now its on beta but its currently live.',
        tech: ['React', 'TypeScript', 'CSS', 'Vite', 'ASP.NET Core', 'SQL Lite', 'C#'],
        category: 'Web · Full Stack',
        year: '2026',
        impact: 'Self-Hosted',
        thumbGradient: 'linear-gradient(135deg, #E8F0F7 0%, #C5D8EC 100%)',
        thumbGradientDark: 'linear-gradient(135deg, #141C26 0%, #1A2636 100%)',
        repo: 'https://github.com/hausenlot/socmed-backend',
        url: 'https://social.polobutporo.xyz/',
        featured: true,
        thumbnailType: 'social',
        checkUrl: 'https://social.polobutporo.xyz/',
        offlineMessage: "My local server is currently asleep 💤. Feel free to contact me if you'd like me to spin it up for you to test.",
        onlineMessage: "The Rant platform is live and bustling! Come join the conversation.",
        descriptionMobile: "Social media for yappers with anger management issue."
    },
    // {
    //     title: 'Deployment Tool',
    //     description: 'A web-based deployment automation tool that handles SSH connections, file uploads, and remote command execution with real-time feedback.',
    //     tech: ['Node.js', 'Express', 'SSH2'],
    //     category: 'DevOps · Tooling',
    //     year: '2024',
    //     impact: 'Automated deploys',
    //     thumbGradient: 'linear-gradient(135deg, #F0EEE8 0%, #DDD8CC 100%)',
    //     url: 'https://deploy.example.com',
    //     repo: 'https://github.com/username/deploy-tool',
    // },
    // {
    //     title: 'Real-time Chat App',
    //     description: 'Full-stack chat application with WebSocket support, user authentication, and message persistence using MongoDB.',
    //     tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
    //     category: 'Full Stack · Real-time',
    //     year: '2024',
    //     impact: 'Real-time messaging',
    //     thumbGradient: 'linear-gradient(135deg, #EEF0E8 0%, #CCDBC5 100%)',
    //     repo: 'https://github.com/username/chat-app',
    // },
    // {
    //     title: 'API Gateway',
    //     description: 'A lightweight API gateway with rate limiting, request logging, and dynamic route configuration.',
    //     tech: ['Node.js', 'Redis', 'Docker'],
    //     category: 'Backend · Infrastructure',
    //     year: '2023',
    //     impact: 'Scalable routing',
    //     thumbGradient: 'linear-gradient(135deg, #F0E8EE 0%, #DCC5DB 100%)',
    //     repo: 'https://github.com/username/api-gateway',
    // },
];
