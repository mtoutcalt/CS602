const credentials = require('../credentials');
const mongoose = require('mongoose');

var DB = require('./orderModel.js');
var Order = DB.getOrderModel();

// const dbUrl = 'mongodb://' + credentials.username +
// 	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

	const dbUrl = 'mongodb://' + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let customerSchema = new Schema({
  firstName: String,
  lastName: String,
	accountName: String,
	address: String
});

// customerSchema.methods.getOrders = function() {
// 		return Order.find({ customerId: this._id});
// };


module.exports = {
  getCustomerModel: function getCustomerModel() {
    if (connection == null) {
      console.log("Creating connection and Customer model");
      connection = mongoose.createConnection(dbUrl);
      model = connection.model("outcalt_customerModel", customerSchema);

    };
    return model;
  }
};
