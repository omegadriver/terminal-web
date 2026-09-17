// Implementa o pty para executar comandos passados em strings na memória
import * as pty from 'node-pty';

const shell = 'bash';

const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: process.stdout.columns || 80,
    rows: process.stdout.rows || 30,
    cwd: process.env.HOME,
    env: process.env as { [key: string]: string },
});

process.stdout.on('resize', () => {
  ptyProcess.resize(process.stdout.columns, process.stdout.rows);
});

ptyProcess.onData((data) => {
    process.stdout.write(data);
});

process.stdin.setRawMode?.(true);
process.stdin.resume();
process.stdin.on('data', (data) => {
    ptyProcess.write(data.toString());
});

ptyProcess.onExit(() => {
    process.stdin.setRawMode?.(false);
    process.stdin.pause();
});