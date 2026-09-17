// Cliente de websockets que envia mensagens periodicamente para o servidor e imprime as mensagens recebidas no console.
import WebSocket from 'ws';

const SERVER_URL = 'ws://localhost:8080';
const MESSAGE_INTERVAL = 5000; // Intervalo de envio de mensagens em milissegundos

// Cria uma conexão WebSocket com o servidor
const ws = new WebSocket(SERVER_URL);

const cmd = process.argv[2] || 'whoami'; 

ws.on('open', () => {
    console.log('Conexão estabelecida com o servidor WebSocket');

    // Envia mensagens periodicamente para o servidor
    setInterval(() => {
        const message = `${cmd}`;
        ws.send(message);
        console.log(`Comando ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}: ${message}`);
    }, MESSAGE_INTERVAL);
});

ws.on('message', (message: string) => {
    console.log(`Server ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}:\n ${message}`);
});

ws.on('close', () => {
    console.log('Conexão com o servidor WebSocket encerrada');
});

ws.on('error', (error: Error) => {
    console.error(`Erro na conexão WebSocket: ${error.message}`);
});