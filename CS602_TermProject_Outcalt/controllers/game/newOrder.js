const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const orderDB = require('../../models/orderModel.js');
const Order = orderDB.getOrderModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();

module.exports = async function newOrder(req, res, next) {

    let gameIdArrayInput = req.body.gameId;
    let gameIdArray = [];

    //if single game then convert it to array
    if (typeof gameIdArrayInput === 'string' ) {
      gameIdArray.push(gameIdArrayInput);
    } else {
      gameIdArray = gameIdArrayInput;
    }

    let gameQuantityArray = req.body.gameQuantity;
    //trim all games that have null quantities
    let trimmedQuantityArray = await trimmedArray(gameQuantityArray);
    let gamesUpdated = [];

    for(var i = 0; i < gameIdArray.length; i++) {

      let updatedGame = await Game.findById(gameIdArray[i]);
      gamesUpdated.push(updatedGame);

      let currentQuantity = updatedGame.quantityLeft;
      let copiesLeft = currentQuantity - trimmedQuantityArray[i];
      if (copiesLeft < 0) {
        // console.log("NO COPIES LEFT");
        return res.render('outOfStockView', {title: "Out of Stock", data: {copiesLeft: currentQuantity}});
      }

      updatedGame.quantityLeft = copiesLeft;
      await updatedGame.save();
    };

    let shopper = await Customer.findById('5a91de19e830923ccccb3626');
    let order = new Order({
    	created: new Date(),
      gameId: gameIdArray,
      gameQuantity: trimmedQuantityArray,
      customerId: shopper._id
    });

    await order.save();
    return res.render('showOrderPlacedView', {title: "Order Placed", data: order, gameData: gamesUpdated});
};

async function trimmedArray(inputArray) {
  var newArray=[];
  for(var i=0; i < inputArray.length; i++) {
    if (inputArray[i].length != 0) {
      newArray.push(inputArray[i]);
    }
  }
  return newArray;
}
