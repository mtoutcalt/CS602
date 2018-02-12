var DB = require('../../models/orderModel.js');
var Order = DB.getOrderModel();

module.exports = function deleteOrder(req, res, next) {
  let id = req.params.id;

  Order.findById(id, (err, order) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!order) {
      return res.render('404');
    }

    order.remove( (err) => {
      if (err) {
        console.log("Error deleting : %s ", err);
      }
      res.redirect('/orders');
    });
  });
};
