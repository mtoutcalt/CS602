const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const orderDB = require('../../models/orderModel.js');
const Order = orderDB.getOrderModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();

/////SAVE ORDER by decrementing the quantity and checking for 0

module.exports = async function saveAfterPurchase(req, res, next) {
    let id = req.params.id;

    //update gmae after order
    let updatedGame = await Game.findById(id);

    updatedGame.name = req.body.gameName;
    updatedGame.description = req.body.gameDescription;
    updatedGame.price = req.body.gamePrice;

    let currentQuantity = updatedGame.quantity;
    // console.log("CURRENT QUANT: " + currentQuantity);

    let copiesLeft = currentQuantity - req.body.gameQuantity;
    // console.log("COPIES LEFT: " + copiesLeft);

    if (copiesLeft < 0) {
      // console.log("NO COPIES LEFT");
      return res.render('outOfStockView', {title: "Out of Stock", data: {copiesLeft: currentQuantity}});
    }

    updatedGame.quantity = copiesLeft;
    await updatedGame.save();

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
      gameId: [updatedGame._id],
      gameQuantity: [req.body.gameQuantity],
      customerId: customer._id
    });

    await order.save();


    res.redirect('/store');
};
