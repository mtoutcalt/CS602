const DB = require('../../models/customerModel.js');
const Customer = DB.getCustomerModel();

module.exports = function displayCustomers(req, res, next) {
  Customer.find({}, (err, customers) => {
    if (err) {
      console.log("Error: %s ", err);
    }

    let results = customers.map( (customer) => {
      return {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        accountName: customer.accountName,
        address: customer.address
      }
    });
      res.render('displayCustomersView', {title: "List of Customers", data: results})
  });

};
