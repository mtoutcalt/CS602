const orderDB = require('../../models/orderModel.js');
const Order = orderDB.getOrderModel();

const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();

module.exports = async function saveOrder(req, res, next) {

  let orderIdInput = req.body.orderId;
  let gameNameInput = req.body.gameName;
  let gameQuantityInput = req.body.newGameQuantity;

  let newQuantityArray = [];

  //make sure the quantity is an array even if its for a single game
  if (typeof gameQuantityInput === 'string') {
    newQuantityArray.push(gameQuantityInput);
  } else {
    newQuantityArray = gameQuantityInput;
  }

  for(var i=0; i < newQuantityArray.length; i++) {
    let asyncGame = await Game.findOne({ 'name': gameNameInput[i]});
    let copiesInStock = asyncGame.quantity;

    let quantDiff = (copiesInStock - gameQuantityInput[i]);
    console.log("IN STOCK: " + copiesInStock);
    console.log("INPUT QUANT: " + gameQuantityInput[i]);
    console.log("QUANT DIFF: " + quantDiff);
    if (quantDiff < 0 ) {
      return res.render('outOfStockView', {title: "Out of Stock", data: {copiesLeft: copiesInStock}});
    } else {
      asyncGame.quantity = quantDiff;
      asyncGame.save();
    }
  }


  // console.log("new QUANT: " + req.body.newGameQuantity);
  // console.log("old QUANT: " + req.body.oldGameQuantity);

  //todo catch errors
  let asyncOrder = await Order.findById(orderIdInput);

  let gameNameArray = [];
  if (typeof gameNameInput === 'string') {
    gameNameArray.push(gameNameInput);
  } else {
    gameNameArray = gameNameInput;
  }

  let gamePromise = gameNameArray.map( async (gameName) => {
      try {
          let asyncGame = await Game.findOne({ 'name': gameName});


          // gamesIds.push(asyncGame.id);
          return asyncGame.id;
      } catch(err) {
        console.log("Game Doesn't Exist");
      }
  });

  Promise.all(gamePromise).then( (gameIds) => {

    asyncOrder.gameId = gameIds;
    asyncOrder.gameQuantity = gameQuantityInput;

    asyncOrder.save( (err) => {
      if (err) {
        console.log("Error updating : %s ", err);
      }
      res.redirect('/orders');
    });


  });


};
