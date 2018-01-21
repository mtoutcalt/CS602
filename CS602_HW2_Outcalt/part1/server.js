var employeeModule = require('../employeeModule');
var net = require('net');

var server = net.createServer(
  function(socket) {
    console.log("Client connection...");

    socket.on('end', function(data) {
        console.log("Client disconnected...");
    });

    socket.on('data', function(data) {
      var commandStrings = data.toString();
      console.log("...Received: " + commandStrings);
      var commands = commandStrings.split(' ');
      if (commands[0] == "lookupByLastName") {
        var employees = employeeModule.lookupByLastName(commands[1]);
        socket.write(JSON.stringify(employees));
      } else if (commands[0] == "addEmployee") {
        var newId = employeeModule.addEmployee(commands[1], commands[2]);
        socket.write(newId.toString());
      } else if (commands[0] == "lookupById") {
        var id = parseInt(commands[1]);
        var employee = employeeModule.lookupById(id);
        socket.write(JSON.stringify(employee));
      } else {
        socket.write("Invalid Request");
      }
    });
});

//listen for client connections
server.listen(3000, function() {
  console.log("Listening for connections");
});
