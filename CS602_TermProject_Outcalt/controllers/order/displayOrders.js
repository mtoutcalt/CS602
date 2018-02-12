const DB = require('../../models/orderModel.js');
const Order = DB.getOrderModel();

module.exports = function displayOrders(req, res, next) {
  Order.find({}, (err, orders) => {
    if (err) {
      console.log("Error: %s ", err);
    }

    let results = orders.map( (order) => {
      return {
        id: order._id,
        games: order.games,
        created: order.created
      }
    });
      res.render('displayOrdersView', {title: "List of Orders", data: results})
  });

};
