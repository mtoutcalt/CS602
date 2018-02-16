const DB = require('../../models/orderModel.js');
const Order = DB.getOrderModel();

const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();

module.exports = async function saveOrder(req, res, next) {
  let id = req.params.id;

  //todo catch errors
  // let asyncOrder = await Order.findById(id);
  // let async

    order.orderNumber = req.body.orderNumber;
    // order.customerId = ;
    // order.gameId = [];

    order.save( (err) => {
      if (err) {
        console.log("Error updating : %s ", err);
      }
      res.redirect('/orders');
    });

  // });
};
