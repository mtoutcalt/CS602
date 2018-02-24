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

  let allGamesArray = await Game.find({});

  


  res.render('editOrderView', {title:"Edit Order",
                                  data: { id: orderAsync._id,
                                          allGames: allGamesArray,
                                          games: gameArray,
                                          gameQuantity: orderAsync.gameQuantity,
                                          created: orderAsync.created,
                                          orderNumber: orderAsync.orderNumber,
                                          customer: customerAsync.firstName}
                                      ,
                                    helpers: {
                                      times: function(n, block) {
                                        var accum = '';
                                        for(var i = 0; i < n; ++i)
                                            accum += block.fn(i);
                                        return accum; }
                                      }
                                    });

};
