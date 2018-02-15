const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

var gameDB = require('./models/gameModel.js');
var customerDB = require('./models/customerModel.js');
var orderDB = require('./models/orderModel.js');


const app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main_logo'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routing
const gameRoutes = require('./controllers/game/routes');
const customerRoutes = require('./controllers/customer/routes');
const orderRoutes = require('./controllers/order/routes');

app.use('/', gameRoutes);
app.use('/', customerRoutes);
app.use('/', orderRoutes);

app.use( (req, res) => {
  res.status(404);
  res.render('404');
});

//this is the entry point to the project - node server.js
app.listen(3000, () => {
  loadModelData();
  console.log('http://localhost:3000');
});


function loadModelData() {
  console.log("LOAD");
  let Game = gameDB.getGameModel();
  let Customer = customerDB.getCustomerModel();
  let Order = orderDB.getOrderModel();

  let customer1 = new Customer({
    firstName: 'Mark',
    lastName: 'Thomas',
    accountName: 'mt',
    address: '123 Main Street'
  });
  customer1.save();

  let customer2 = new Customer({
    firstName: 'Liam',
    lastName: 'Thomas',
    accountName: 'lt',
    address: '123 Main Street'
  });
  customer2.save();

  let game1 = new Game({
  	name: 'Superman 64',
    description: 'A terrible game on the Nintendo 64',
  	price: '30',
  	quantity: '8'
  });
  game1.save();

  let game2 = new Game({
  	name: 'World of Warcraft',
    description: 'A massively multiplayer role-playing game on the PC',
  	price: '40',
  	quantity: '15'
  });
  game2.save();

  let game3 = new Game({
  	name: 'Super Mario Odyssey',
    description: 'A 3D platforming game featuring Mario on the Nintendo Switch',
  	price: '60',
  	quantity: '20'
  });

  game3.save( (err) => {
    if (err) throw err;

    console.log(game3);
    let order = new Order({
    	created: new Date(),
      orderNumber: "456",
      gameId: game3._id,
      customerId: customer1._id
    });

    order.save( (err) => {
      if (err) throw err;
      console.log("Success!");
    });
    console.log("Success!");
  });
};



// https://coursework.vschool.io/mongoose-schemas
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// http://mongoosejs.com/docs/populate.html
