const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const helmet = require('helmet');
var request = require('request');

var gameDB = require('./models/gameModel.js');
var customerDB = require('./models/customerModel.js');
var orderDB = require('./models/orderModel.js');


const app = express();
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


//expose API
////////////////

var optionsAllGames = {
  url: 'http://localhost:3000/api/games',
  headers: {
    'Accept': 'application/json'
  }
};

app.get('/getGamesApi/json', function(req, res) {
    request.get(optionsAllGames, (error, response, body) => {
      console.log("CALLED");
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      } else {
        console.log("Call failed");
      }
    });
});

var optionsAllGamesXml = {
  url: 'http://localhost:3000/api/games',
  headers: {
    'Accept': 'application/xml'
  }
};
app.get('/getGamesApi/xml', function(req, res) {
    request.get(optionsAllGamesXml, (error, response, body) => {
      console.log("CALLED");
      if (!error && response.statusCode == 200) {
        res.type('application/xml');
        res.send(body);
      } else {
        console.log("Call failed");
      }
    });
});

app.get('/getGamesPriceApi/json', function(req, res) {
    let optionsGameByPrice = {
      url: urlString = 'http://localhost:3000/api/games/price?maxPrice=' + req.query.maxPrice + '&minPrice=' + req.query.minPrice,
      headers: {
        'Accept': 'application/json'
      }
    };

    request.get(optionsGameByPrice, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      } else {
        console.log("Call failed");
      }
    });
});

app.get('/getGamesPriceApi/xml', function(req, res) {
    let optionsGameByPrice = {
      url: urlString = 'http://localhost:3000/api/games/price?maxPrice=' + req.query.maxPrice + '&minPrice=' + req.query.minPrice,
      headers: {
        'Accept': 'application/xml'
      }
    };

    request.get(optionsGameByPrice, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.type('application/xml');
        res.send(body);
      } else {
        console.log("Call failed");
      }
    });
});

app.get('/getGamesNameApi/json', function(req, res) {
    let optionsGameByName = {
      url: urlString = 'http://localhost:3000/api/games/' + req.query.name,
      headers: {
        'Accept': 'application/json'
      }
    };

    request.get(optionsGameByName, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      } else {
        console.log("Call failed");
      }
    });
});

app.get('/getGamesNameApi/xml', function(req, res) {
    let optionsGameByName = {
      url: urlString = 'http://localhost:3000/api/games/' + req.query.name,
      headers: {
        'Accept': 'application/xml'
      }
    };

    request.get(optionsGameByName, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.type('application/xml');
        res.send(body);
      } else {
        console.log("Call failed");
      }
    });
});

app.get('/getGamesDescriptionApi/json', function(req, res) {
    let optionsGameByDescription = {
      url: urlString = 'http://localhost:3000/api/games/description/' + req.query.description,
      headers: {
        'Accept': 'application/json'
      }
    };

    request.get(optionsGameByDescription, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      } else {
        console.log("Call failed");
      }
    });
});

app.get('/getGamesDescriptionApi/xml', function(req, res) {
    let optionsGameByDescription = {
      url: urlString = 'http://localhost:3000/api/games/description/' + req.query.description,
      headers: {
        'Accept': 'application/xml'
      }
    };

    request.get(optionsGameByDescription, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.type('application/xml');
        res.send(body);
      } else {
        console.log("Call failed");
      }
    });
});
//////////////
// Experimenting with external video game API - from www.giantbomb.com
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

//////////////
app.use( (req, res) => {
  res.status(404);
  res.render('404');
});

//this is the entry point to the project - node server.js
app.listen(3000, () => {
  // loadModelData();
  console.log('http://localhost:3000');
});


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
  	name: 'Super Mario Odyssey',
    description: 'A 3D platforming game featuring Mario on the Nintendo Switch',
  	price: 60,
  	quantityLeft: 20,
    totalQuantity: 20
  });

  game5.save( (err) => {
    if (err) throw err;
    let order1 = new Order({
    	created: new Date(),
      gameId: [game1._id, game5._id],
      gameQuantity: [2, 1],
      customerId: customer1._id
    });

    let order2 = new Order({
    	created: new Date(),
      gameId: [game5._id, game3._id],
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
