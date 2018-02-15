const DB = require('../../models/orderModel.js');
const Order = DB.getOrderModel();

module.exports = function saveOrder(req, res, next) {

    let order = new Order({
      games: req.body.game,
      created: req.body.created,
      orderNumber: req.body.orderNumber
     });

     order.save( (err) => {
       if (err) {
         console.log("Error: %s ", err);
       }
       res.redirect('/orders');
     });
};
