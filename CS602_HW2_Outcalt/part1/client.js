var employeeModule = require('../employeeModule');
var net = require('net');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var readMessage = function(client) {
  rl.question("Enter Command: ", function (line) {
    client.write(line);
    if (line == "bye") {
      client.end();
    }
  });
};

var client = net.connect({port:3000},
  function() {
      console.log("Connected to server");
      readMessage(client);
});

client.on('end', function() {
  console.log("Client disconnected...");
  // return;
});

client.on('data', function(data) {
  console.log("...Received");
  console.log(data.toString());
  if (!data.toString() != "Invalid Request") {
    readMessage(client);
  }
});
