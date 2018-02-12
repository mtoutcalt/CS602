module.exports = function addCustomer(req, res, next) {
  res.render('addCustomerView', {title:"Add a Customer"});
};
