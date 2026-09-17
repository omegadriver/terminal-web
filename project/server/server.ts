// Implementação de um servidor Websockets que recebe mensagens de clientes, faz echo no console. 
// Conexão unidirecional, ou seja, o servidor apenas recebe mensagens dos clientes e não envia mensagens de volta.

import WebSocket, { WebSocketServer } from 'ws';

const PORT = 8080;

// Cria um servidor WebSocket
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws: WebSocket) => {
    console.log('Cliente conectado');

    ws.on('message', (message: string) => {
        console.log(`Mensagem recebida do cliente: ${message}`);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    ws.on('error', (error: Error) => {
        console.error(`Erro na conexão WebSocket: ${error.message}`);
    });

    ws.send('Conexão estabelecida com sucesso!');
});