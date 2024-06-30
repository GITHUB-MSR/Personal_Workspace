const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); // Port number for WebSocket server

const validCodes = new Set(); // Store valid 4-digit codes here

// WebSocket server logic
wss.on('connection', function connection(ws) {
    console.log('New WebSocket connection.');

    // Handle messages from clients
    ws.on('message', function incoming(message) {
        if (message.length === 4 && /^\d+$/.test(message)) {
            // Valid 4-digit code received, add to valid codes set
            validCodes.add(message);
            console.log('Client joined with code:', message);
        } else {
            // Assume message is a chat message, broadcast to all clients
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }
    });

    // Handle WebSocket closing
    ws.on('close', function close() {
        console.log('WebSocket connection closed.');
    });
});
