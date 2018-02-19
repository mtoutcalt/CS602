const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const orderDB = require('../../models/orderModel.js');
const Order = orderDB.getOrderModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();

/////SAVE ORDER by decrementing the quantity and checking for 0

module.exports = async function newOrder(req, res, next) {

    let gameIdArray = req.body.gameId;
    let gameQuantityArray = req.body.gameQuantity;

    let trimmedQuantityArray = await trimmedArray(gameQuantityArray);

    console.log(gameIdArray);
    console.log(trimmedQuantityArray);

    let gamesUpdated = [];

    //update gmae after order
    for(var i = 0; i < gameIdArray.length; i++) {

      let updatedGame = await Game.findById(gameIdArray[i]);
      gamesUpdated.push(updatedGame);

      let currentQuantity = updatedGame.quantity;
      console.log("CURRENT QUANT: " + currentQuantity);

      let copiesLeft = currentQuantity - trimmedQuantityArray[i];
      console.log("COPIES LEFT: " + copiesLeft);

      if (copiesLeft < 0) {
        // console.log("NO COPIES LEFT");
        return res.render('outOfStockView', {title: "Out of Stock", data: {copiesLeft: currentQuantity}});
      }

      updatedGame.quantity = copiesLeft;
      await updatedGame.save();
    };

    let customer = new Customer({
      firstName: 'Mark',
      lastName: 'Shopper',
      accountName: 'mtshopper22',
      address: '123 Main Street'
    });
    await customer.save();

    //create new order


    let order = new Order({
    	created: new Date(),
      gameId: gameIdArray,
      gameQuantity: trimmedQuantityArray,
      customerId: customer._id
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
