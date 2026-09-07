import { dev } from 'astro';
const server = await dev({ server: { host: '127.0.0.1', port: Number(process.argv[2] || 4322) }, logLevel: 'warn' });
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, async () => { await server.stop(); process.exit(0); });
