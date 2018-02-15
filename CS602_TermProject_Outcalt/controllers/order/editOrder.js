const DB = require('../../models/orderModel.js');
const Order = DB.getOrderModel();

module.exports = function editOrder(req, res, next) {
  let id = req.params.id;

  Order.findById(id, (err, order) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!order) {
      return res.render('404');
    }

    res.render('editOrderView', {title:"Edit Order",
                                  data: { id: order._id,
                                          games: order.game,
                                          created: order.created,
                                          orderNumber: order.orderNumber }
                                      });
  });
};
