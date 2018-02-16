const orderDB = require('../../models/orderModel.js');
const Order = orderDB.getOrderModel();

const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

const customerDB = require('../../models/customerModel.js');
const Customer = customerDB.getCustomerModel();

module.exports = async function editOrder(req, res, next) {
  let orderId = req.params.id;

  let orderAsync = await Order.findById(orderId);
  let customerAsync = await Customer.findById(orderAsync.customerId);
  let gameArray = await Game.find({_id: orderAsync.gameId });

  res.render('editOrderView', {title:"Edit Order",
                                  data: { id: orderAsync._id,
                                          games: gameArray,
                                          created: orderAsync.created,
                                          orderNumber: orderAsync.orderNumber,
                                          customer: customerAsync.firstName}
                                      });

};
