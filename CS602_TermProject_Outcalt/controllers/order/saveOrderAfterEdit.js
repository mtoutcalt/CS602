const orderDB = require('../../models/orderModel.js');
const Order = orderDB.getOrderModel();

const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();

module.exports = async function saveOrder(req, res, next) {
  let id = req.params.id;

  //todo catch errors
  let asyncOrder = await Order.findById(id);

  games = [];

  asyncOrder.gameId.map( async (game) => {
      let asyncGame = await Game.findById(game.id);
      console.log("Found game: " + asyncGame.name);
      games.push(asyncGame);
  });

    order.orderNumber = req.body.orderNumber;
    order.created = req.body.created;
    order.customerId = req.body.customerId;
    order.gameId = [];

    order.save( (err) => {
      if (err) {
        console.log("Error updating : %s ", err);
      }
      res.redirect('/orders');
    });

  // });
};
