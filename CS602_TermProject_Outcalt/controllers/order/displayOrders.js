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
          gameQuantity: order.gameQuantity,
          orderNumber: order.orderNumber
        }
    });

    //another promise, took me a lot of trial and error to get to something so simple like this - I think await/async would be neat as an add-on topic in the
    //future for this course
    Promise.all(results).then( (results) => {
      res.render('displayOrdersView', {title: "List of Orders", data: results});
    });
};
