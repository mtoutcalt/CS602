const DB = require('../../models/orderModel.js');
const Order = DB.getOrderModel();

module.exports = function saveOrder(req, res, next) {
  let id = req.params.id;

  Order.findById(id, (err, order) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!order) {
      return res.render('404');
    }

    order.games = req.body.games; //get data from body of post
    order.created = req.body.created;

    order.save( (err) => {
      if (err) {
        console.log("Error updating : %s ", err);
      }
      res.redirect('/orders');
    });

  });
};
