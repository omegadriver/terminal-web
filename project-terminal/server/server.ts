// Servidor websocket para comunicação com o terminal, assim como host do pty para execução de comandos passados em strings na memória
import WebSocket, { WebSocketServer } from 'ws';
import * as pty from 'node-pty';

const PORT = 8080;
const SHELL = 'bash';

// Cria um servidor WebSocket
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws: WebSocket) => {
    console.log('[+] Cliente conectado');

    // Cria um processo bash usando pty
    const ptyProcess = pty.spawn(SHELL, [], {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: { ...process.env, 
        TERM: 'xterm-256color', 
        COLORTERM: 'truecolor'
    } as { [key: string]: string }
    });

    ptyProcess.onData((data) => {
        ws.send(data);
    });

    ws.on('message', (message: string) => {
        console.log(`[+] Comando recebido: ${message}`);
        ptyProcess.write(message.toString());
    });

    ws.on('close', () => {
        console.log('[-] Cliente desconectado');
        ptyProcess.kill();
    });

    ws.on('error', (error: Error) => {
        console.error(`[x] Erro na conexão WebSocket: ${error.message}`);
    });

});
