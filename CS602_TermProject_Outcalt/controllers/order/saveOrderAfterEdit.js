const orderDB = require('../../models/orderModel.js');
const Order = orderDB.getOrderModel();

const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();

//this module was tricky because it reuires synching all 3 model objects together
module.exports = async function saveOrder(req, res, next) {

  let orderIdInput = req.body.orderId;
  let gameNameInput = req.body.gameName;
  let gameQuantityInput = req.body.newGameQuantity;
  let previousOrderedQuantity = req.body.previousOrderedQuantity;

  let newQuantityArray = [];
  let previousOrderedQuantityArray = [];
  //make sure the quantity is an array even if its for a single game
  if (typeof gameQuantityInput === 'string') {
    newQuantityArray.push(gameQuantityInput);
    previousOrderedQuantityArray.push(previousOrderedQuantity);
  } else {
    newQuantityArray = gameQuantityInput;
    previousOrderedQuantityArray = previousOrderedQuantity;
  }

  for(var i=0; i < newQuantityArray.length; i++) {
    let asyncGame = await Game.findOne({ 'name': gameNameInput[i]});
    let copiesInStock = asyncGame.quantityLeft;
    let totalQuantity = asyncGame.totalQuantity;

    //I was getting strange errors so I used parseInt to make sure its doing arithmetic with numbers and not concatenating strings
    let quantDiff = (parseInt(copiesInStock) + parseInt(previousOrderedQuantityArray[i])) - parseInt(newQuantityArray[i]);

    if (quantDiff < 0 ) {
      return res.render('outOfStockView', {title: "Out of Stock", data: {copiesLeft: copiesInStock}});
    } else {
      asyncGame.quantityLeft = quantDiff;
      asyncGame.save();
    }
  }

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
