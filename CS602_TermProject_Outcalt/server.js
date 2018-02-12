const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

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
  console.log('http://localhost:3000');
});
