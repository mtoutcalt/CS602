const DB = require('../../models/customerModel.js');
const Customer = DB.getCustomerModel();

module.exports = function saveCustomer(req, res, next) {
  let id = req.params.id;

  Customer.findById(id, (err, customer) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!customer) {
      return res.render('404');
    }

    customer.firstName = req.body.firstName;
    customer.lastName = req.body.lastName;
    customer.accountName = req.body.accountName;
    customer.address = req.body.address;

    customer.save( (err) => {
      if (err) {
        console.log("Error updating : %s ", err);
      }
      res.redirect('/customers');
    });

  });
};
