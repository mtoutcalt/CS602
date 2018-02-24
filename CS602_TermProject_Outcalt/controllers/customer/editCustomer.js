const DB = require('../../models/customerModel.js');
const Customer = DB.getCustomerModel();

module.exports = function editCustomer(req, res, next) {
  let id = req.params.id;

  Customer.findById(id, (err, customer) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!customer) {
      return res.render('404');
    }

    res.render('editCustomerView', {title:"Edit Customer",
                                  data: {id: customer._id,
                                          firstName: customer.firstName,
                                          lastName: customer.lastName,
                                          accountName: customer.accountName,
                                          address: customer.address }
                                      });
  });
};
