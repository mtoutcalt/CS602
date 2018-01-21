var employeeModule = require('../employeeModule');
var express = require('express');
var bodyParser = require("body-parser");
var handlebars = require('express-handlebars');
var _ = require('underscore');

var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/addEmployee', function(req, res) {
    res.render('newEmployee');
});

app.post('/addEmployee', function(req, res) {
  employeeModule.addEmployee(req.body.firstName, req.body.lastName)
  var redirectToNewEmployeePath = "/lastName/" + req.body.lastName;
  res.redirect(redirectToNewEmployeePath);
})

app.get('/id/:id', function(req, res) {
  var employee = employeeModule.lookupById(parseInt(req.params.id));
  res.format({

      'application/json': function() {
        res.json(employee);
      },

      'application/xml' : function() {
        if (typeof employee === "undefined") {
          res.status(404);
          res.send("<b>404 - Employee Not Found");
        } else {
          var employeeXml =
            '<?xml version="1.0"?>\n' +
            '<employee id=\"' + employee.id + '\">\n' +
            '  <firstName>' + employee.firstName + '</firstName>\n' +
            '  <lastName>' + employee.lastName + '</lastName>\n' +
            '</employee>\n';
          res.type('application/xml');
          res.send(employeeXml);
        }
      },

      'text/html': function() {
        if (typeof employee === "undefined" ) {
          res.status(404);
          res.send("<b>404 - Employee Not Found");
        } else {
          res.render('employee', {employee: employee, id: req.params.id});
        }
      },

      'default': function() {
        res.status(404);
        res.send("<b>404 - Not Found");
      }
  });
});

app.get('/lastName/:name', function(req, res) {
  var employees = employeeModule.lookupByLastName(req.params.name);
  console.log("SIZE: " + employees.length);
  res.format({

      'application/json': function() {
        res.json(employees);
      },

      'application/xml' : function() {
        if (_.isEmpty(employees)) {
          res.status(404);
          res.send("<b>404 - Employees Not Found");
        } else {

          var employeesXml =
            '<?xml version="1.0"?>\n<employees>\n' +
            employees.map(function(employee){
              return ' <employee id=\"' + employee.id + '\">\n' +
              '  <firstName>' + employee.firstName + '</firstName>\n' +
              '  <lastName>' + employee.lastName + '</lastName>\n' +
              ' </employee>'
            }).join('\n') + '\n</employees>\n';

          res.type('application/xml');
          res.send(employeesXml);
        }
      },

      'text/html': function() {
        if (_.isEmpty(employees)) {
          res.status(404);
          res.send("<b>404 - Employees Not Found");
        } else {
          res.render('employeeList', {name: req.params.name, employees: employees});
        }
      },

      'default': function() {
        res.status(404);
        res.send("<b>404 - Not Found");
      }
  });
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.listen(3000, function() {
  console.log('http://localhost:3000');
});



//curl -H "Accept:application/json" http://localhost:3000/lastName/Smith
//curl -H "Accept:application/json" http://localhost:3000/id/2

//curl -H "Accept:application/xml" http://localhost:3000/id/2
