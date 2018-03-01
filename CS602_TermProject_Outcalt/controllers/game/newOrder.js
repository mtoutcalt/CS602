const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const orderDB = require('../../models/orderModel.js');
const Order = orderDB.getOrderModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();


//maybe the most complicated module - I started to deal with some edge cases but never got around to finishing all of them
module.exports = async function newOrder(req, res, next) {

    let gameIdArrayInput = req.body.gameId;
    let gameQuantityArray = req.body.gameQuantity;

    //trim all games that have null quantities
    let trimmedQuantityArray = await trimmedArray(gameQuantityArray);

    let gamesUpdated = [];
    let gameIdArray = [];
    //if single game then convert it to array
    if (typeof gameIdArrayInput === 'string' ) {
      gameIdArray.push(gameIdArrayInput);
    } else if (gameIdArrayInput == undefined) {
      //this happens when a user does a checkout but doesnt select anything
      return res.render('userError');
    } else {
      gameIdArray = gameIdArrayInput;
    }

    if (gameIdArray.length != trimmedQuantityArray.length) {
      //this will catch when a user selects x checkboxes but inputs a quanity in y textboxes 
      return res.render('userError');
    }

    for(var i = 0; i < gameIdArray.length; i++) {

      let updatedGame = await Game.findById(gameIdArray[i]);
      gamesUpdated.push(updatedGame);

      let currentQuantity = updatedGame.quantityLeft;
      let copiesLeft = currentQuantity - trimmedQuantityArray[i]; //the game model keeps track of inventory so I subtract that from # of copies ordered
      if (copiesLeft < 0 || isNaN(copiesLeft)) {
        //isNaN will handle some cases where a user clicks a checkbox to buy but doesnt put a number in the order for quantity
        return res.render('outOfStockView', {title: "Out of Stock", data: {copiesLeft: currentQuantity, name: updatedGame.name}});
      }

      updatedGame.quantityLeft = copiesLeft;
      await updatedGame.save(); //save game with updated inventory
    };

    //I have this user with the pre-determiend id as the user for this term project - every order that is made will have this user as the shopper
    //which makes it easier to demonstrate the order history functionality and I didn't find the time to build out a real user login
    let shopper = await Customer.findById('111111111111111111111111');
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
    //this will filter out all of the checkboxes that were not clicked
    if (!isNaN(inputArray[i]) && inputArray[i].length != 0) {
      newArray.push(inputArray[i]);
    }
  }
  return newArray;
}
