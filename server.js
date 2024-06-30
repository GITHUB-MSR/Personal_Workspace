// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

// Array to store authenticated users
const authenticatedUsers = {};

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            switch (data.type) {
                case 'auth':
                    handleAuthentication(data, ws);
                    break;
                case 'message':
                    handleChatMessage(data, ws);
                    break;
                default:
                    console.log('Unknown message type:', data.type);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function handleAuthentication(data, ws) {
    const { name, securityCode } = data;
    // Mock security code validation (replace with your logic)
    if (securityCode === '1234') {
        authenticatedUsers[ws] = { name };
        // Notify client of successful authentication
        ws.send(JSON.stringify({ type: 'auth_success' }));
    } else {
        // Notify client of authentication failure
        ws.send(JSON.stringify({ type: 'auth_failure', message: 'Invalid security code' }));
    }
}

function handleChatMessage(data, ws) {
    const { message } = data;
    // Broadcast message to all authenticated users
    wss.clients.forEach((client) => {
        if (client !== ws && authenticatedUsers[client]) {
            client.send(JSON.stringify({ type: 'message', name: authenticatedUsers[ws].name, message }));
        }
    });
}