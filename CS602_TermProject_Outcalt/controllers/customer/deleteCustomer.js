var DB = require('../../models/customerModel.js');
var Customer = DB.getCustomerModel();

module.exports = function deleteCustomer(req, res, next) {
  let id = req.params.id;

  Customer.remove({}, (err, customer) => {
    console.log("All Deleted");
  });

  Customer.findById(id, (err, customer) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!customer) {
      return res.render('404');
    }

    customer.remove( (err) => {
      if (err) {
        console.log("Error deleting : %s ", err);
      }
      res.redirect('/customers');
    });
  });
};
