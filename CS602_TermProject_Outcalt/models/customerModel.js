const credentials = require('../credentials');
const mongoose = require('mongoose');

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;
let customerSchema = new Schema({
  firstName: String,
  lastName: String,
	accountName: String,
	address: String,
	orders: [{
		type: Schema.Types.ObjectId,
		ref: "Order"
	}]
});

module.exports = {
  getCustomerModel: function getCustomerModel() {
    if (connection == null) {
      console.log("Creating connection and Customer model");
      connection = mongoose.createConnection(dbUrl);
      model = connection.model("outcalt_customerModel", customerSchema);

      let customer;
      customer = new model({
				firstName: 'John',
			  lastName: 'Doe',
				accountName: 'doe123',
				address: '1 Main Street Springfield, NH 55555'
      });
      customer.save();

      customer = new model({
				firstName: 'Jane',
			  lastName: 'Doe',
				accountName: 'doej999',
				address: '99 Main Street Springfield, NH 55555'
      });
      customer.save();

      customer = new model({
				firstName: 'Tim',
			  lastName: 'Smith',
				accountName: 'smithy123',
				address: '22 Main Street Springfield, MA 66666'
      });
      customer.save( (err) => {
        if (err) throw err;
        console.log("Success!");
      });

    };
    return model;
  }
};
