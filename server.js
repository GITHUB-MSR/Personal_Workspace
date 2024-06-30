const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); // Port number for WebSocket server

// WebSocket server logic
wss.on('connection', function connection(ws) {
    console.log('New WebSocket connection.');

    // Handle messages from clients
    ws.on('message', function incoming(message) {
        console.log('Received message:', message);
        // Broadcast message to all clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle WebSocket closing
    ws.on('close', function close() {
        console.log('WebSocket connection closed.');
    });
});
