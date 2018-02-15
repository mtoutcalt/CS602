const DB = require('../../models/orderModel.js');
const Order = DB.getOrderModel();

// const DB = require('../../models/customerModel.js');
// const Customer = DB.getCustomerModel();

module.exports = async function displayCustomerOrders(req, res, next) {

  let customerId = req.params.id;

  let orderAsync = await Order.find({customerId: customerId});

  let results = orderAsync.map( async (order) => {
    return {
      id: order._id,
      created: order.created,
      orderNumber: order.orderNumber
    }
  });

  Promise.all(results).then( (results) =>  {
    res.render('displayCustomerOrdersView', {title:"Orders By Customer", data: results});
  });

};
