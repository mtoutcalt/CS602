const DB = require('../../models/orderModel.js');
const Order = DB.getOrderModel();

const gameDB = require('../../models/gameModel.js');
const Game = gameDB.getGameModel();

module.exports = async function displayOrders(req, res, next) {

    let orderAsync = await Order.find({});

    let results = orderAsync.map( async (order) => {
        let gameArray = await Game.find({_id: order.gameId });
        return {
          id: order._id,
          created: order.created,
          game: gameArray,
          orderNumber: order.orderNumber
        }
    });

    Promise.all(results).then( (results) => {
      res.render('displayOrdersView', {title: "List of Orders", data: results});
    });
};
