const DB = require('../../models/orderModel.js');
const Order = DB.getOrderModel();

const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

module.exports = async function displayCustomerOrders(req, res, next) {

  let customerId = req.params.id;

  let orderAsync = await Order.find({customerId: customerId});

  let results = orderAsync.map( async (order) => {
    let gameArray = await Game.find({ _id: order.gameId});
    return {
      id: order._id,
      created: order.created,
      game: gameArray,
      orderNumber: order.orderNumber,
      gameQuantity: order.gameQuantity
    }
  });

  //I learned how to use promises and await/async because it looks cleaner than the callback mess I had before
  Promise.all(results).then( (results) =>  {
    res.render('displayCustomerOrdersView', {title:"Orders By Customer", data: results});
  });

};
