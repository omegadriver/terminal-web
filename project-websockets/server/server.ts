// Implementação de um servidor Websockets que recebe mensagens de clientes, faz echo no console. 
// Conexão unidirecional, ou seja, o servidor apenas recebe mensagens dos clientes e não envia mensagens de volta.
// O servidor implementa o pty, se o cliente enviar um comando, o servidor executa o comando e envia a saída de volta para o cliente.

import WebSocket, { WebSocketServer } from 'ws';

const PORT = 8080;

// Cria um servidor WebSocket
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws: WebSocket) => {
    console.log('Cliente conectado');

    ws.on('message', (message: string) => {
        console.log(`Comando ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}: ${message}`);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    ws.on('error', (error: Error) => {
        console.error(`Erro na conexão WebSocket: ${error.message}`);
    });

    ws.send('Conexão estabelecida com sucesso!');
});