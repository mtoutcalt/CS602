// I would have liked to expand this project more but I got strep throat and lost multiple days near the due date
// With more time I would have liked trying to expand my external API call and figure out how to store/encrypt a key
// I would have liked to expand the shopping cart, maybe add sessions, and make the checkout and buying experience better mimic an actual online store
// I would explored popular modules like passport, cheerio, restify, and others
// I've enjoyed my time with the class - thank you

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const helmet = require('helmet');
const request = require('request');

const gameDB = require('./models/gameModel.js');
const customerDB = require('./models/customerModel.js');
const orderDB = require('./models/orderModel.js');


const app = express();

//  Based on the module notes you get some security just with this command such as http header protection like
// Strict-Transport-Security header to keep users on https
// while this module isn't do much for this project it was interesting reading about the what it does
app.use(helmet());

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


//////////////
// Experimenting with external video game API - from www.giantbomb.com
// problem is that it requires an api_key and I don't know where to store it or how to encrypt it.  Our textbook
// talks about passport but I didn't have enough time to really dig into it
// Giantbomb is a videogame website that has APIs with a lot of information about each game
app.get('/getData_Destiny', function(req, res) {
    let optionsGameByDescription = {
      url: urlString = 'https://www.giantbomb.com/api/game/3030-36067/',
      qs:
       { api_key: '',
         format: 'json',
         field_list: 'genres,name,deck,description,platforms,reviews,themes,similar_games' },
      headers:
       { 'User-Agent': 'user_judoboy',
         'Cache-Control': 'no-cache',
         'Accept': 'application/json' }
    };

    request.get(optionsGameByDescription, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      } else {
        console.log("Call failed");
      }
    });
});

app.get('/welcome', (req, res) => {
  res.render('welcomeView', {title: "Welcome to the Game Store"});
});

app.use( (req, res) => {
  res.status(404);
  res.render('404');
});

//this is the entry point to the project - node server.js
app.listen(3000, () => {
  // loadModelData(); //should be commented out after starting the app so repeat data isnt constantly loaded
  console.log('http://localhost:3000');
});


//used to initially load the database
function loadModelData() {
  let Game = gameDB.getGameModel();
  let Customer = customerDB.getCustomerModel();
  let Order = orderDB.getOrderModel();

  let customer1 = new Customer({
    id: 123,
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

//this will be the user that makes the orders
  let customer3 = new Customer({
    _id: new mongoose.mongo.ObjectId('111111111111111111111111'),
    firstName: 'Shopper',
    lastName: 'Dont Delete - needed for order history',
    accountName: 'adsf',
    address: '123 Main Street'
  });
  customer3.save();

  let game1 = new Game({
  	name: 'Superman 64',
    description: 'A terrible game on the Nintendo 64',
  	price: 30,
  	quantityLeft: 8,
    totalQuantity: 20
  });
  game1.save();

  let game2 = new Game({
  	name: 'World of Warcraft',
    description: 'A massively multiplayer role-playing game on the PC',
  	price: 40,
  	quantityLeft: 15,
    totalQuantity: 15
  });
  game2.save();

  let game3 = new Game({
    name: 'Destiny',
    description: 'A sci-fi shooter',
    price: 55,
    quantityLeft: 15,
    totalQuantity: 15
  });
  game3.save();

  let game4 = new Game({
    name: 'Tetris',
    description: 'A popular puzzle game involving the manipulation of blocks',
    price: 20,
    quantityLeft: 15,
    totalQuantity: 15
  });
  game4.save();

  let game5 = new Game({
  	name: 'Super Monkey Ball',
    description: 'A 3D puzzle game on the Nintendo Gamecube',
  	price: 20,
  	quantityLeft: 10,
    totalQuantity: 10
  });
  game5.save();

  let game6 = new Game({
    name: 'Pokemon',
    description: 'A portable game about catching pocket monsters',
    price: 25,
    quantityLeft: 15,
    totalQuantity: 15
  });
  game6.save();

  let game7 = new Game({
    name: 'Half-Life',
    description: 'A first-person shooter and action adventure about a science experiment gone wrong',
    price: 35,
    quantityLeft: 20,
    totalQuantity: 20
  });
  game7.save();

  let game8 = new Game({
    name: 'Sonic The Hedgehog',
    description: 'A fast-moving platformer by Sega on the Sega Genesis',
    price: 20,
    quantityLeft: 20,
    totalQuantity: 20
  });
  game8.save();

  let game9 = new Game({
    name: 'SSX Tricky',
    description: 'A wacky snowboarding game on the PS2 and Xbox',
    price: 30,
    quantityLeft: 20,
    totalQuantity: 20
  });
  game9.save();

  let game10 = new Game({
    name: 'Super Mario Odyssey',
    description: 'A 3D platforming game featuring Mario on the Nintendo Switch',
    price: 60,
    quantityLeft: 20,
    totalQuantity: 20
  });

  game10.save( (err) => {
    if (err) throw err;

    let order1 = new Order({
    	created: new Date(),
      gameId: [game1._id, game10._id],
      gameQuantity: [2, 1],
      customerId: customer1._id
    });

    let order2 = new Order({
    	created: new Date(),
      gameId: [game10._id, game3._id],
      gameQuantity: [3, 1],
      customerId: customer1._id
    });

    order1.save();
    order2.save( (err) => {
      if (err) throw err;
      console.log("Success!");
    });
    console.log("Success!");
  });
};
