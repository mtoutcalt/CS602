var employeeModule = require('../employeeModule');
var net = require('net');

var server = net.createServer(
  function(socket) {
    console.log("Client connection...");

    socket.on('end', function(data) {
        console.log("Client disconnected...");
    });

    socket.on('data', function(data) {
      console.log("Received:", data.toString());
    });

    socket.write("Hello from server");
});


//listen for client connections
server.listen(3000, function() {
  console.log("Listening for connections");
});
