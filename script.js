// Initialize WebSocket connection
var socket = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

// Handle WebSocket open event
socket.onopen = function(event) {
    console.log('WebSocket connection established.');
};

// Handle WebSocket message event (receiving messages)
socket.onmessage = function(event) {
    var receivedMessage = event.data;
    addMessage("Friend: " + receivedMessage);
};

// Handle WebSocket error event
socket.onerror = function(error) {
    console.error('WebSocket error: ', error);
};

// Handle WebSocket close event
socket.onclose = function(event) {
    console.log('WebSocket connection closed.');
};

function sendMessage() {
    var messageInput = document.getElementById("messageInput");
    var message = messageInput.value.trim();
    if (message !== "") {
        addMessage("You: " + message);
        messageInput.value = "";
        // Send message to WebSocket server
        socket.send(message);
    }
}

function addMessage(message) {
    var messagesDiv = document.getElementById("messages");
    var messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    messagesDiv.appendChild(messageParagraph);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
