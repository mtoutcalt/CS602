const DB = require('../../models/customerModel.js');
const Customer = DB.getCustomerModel();

module.exports = function saveCustomer(req, res, next) {

    let customer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      accountName: req.body.accountName,
      address: req.body.address,
     });

     customer.save( (err) => {
       if (err) {
         console.log("Error: %s ", err);
       }
       res.redirect('/customers');
     });
};
