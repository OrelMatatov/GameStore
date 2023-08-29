const WebSocket = require('ws');
const Game = require('./models/game')
const Supplier = require('./models/supplier')

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
var gameSelected = null;

// WebSocket connection handling
wss.on('connection', (socket) => {

  // Listen for messages from clients
  socket.on('message', async (message) => {

    if(message.toString().includes("id")){
        const gameId = message.toString().split(":")[1];
        try{
            gameSelected = await Game.findById(gameId);
            socket.send("bot: What do you wanna know about the game?")
            
        }catch(error){
            console.error('Error fetching game from database:', error);
        }
    }

    else if(message.toString().includes("Price")){
      socket.send("Bot: "+gameSelected.price+"$");
    } 
    else if(message.toString().includes("ReleaseYear")){
      socket.send("Bot: "+gameSelected.releaseYear);
    }
    else if(message.toString().includes("Supplier")){
      const supplier = await Supplier.findById(gameSelected.supplier)
      socket.send("bot: "+supplier.name);
    } 
    else if(message.toString().includes("Rating")){
      socket.send("Bot: "+gameSelected.rating+" stars");
    } 
    else if(message.toString().includes("About")){
      socket.send("Bot: "+gameSelected.about);
    } 
  });

  // Handle disconnects
  socket.on('close', () => {
    //console.log('Client disconnected');
  });

});

console.log("Socket Connected");


