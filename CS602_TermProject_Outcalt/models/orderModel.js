const credentials = require('../credentials');
const mongoose = require('mongoose');
const gameDB = require('./gameModel.js');

const Game = gameDB.getGameModel();

// const dbUrl = 'mongodb://' + credentials.username +
// 	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

const dbUrl = 'mongodb://' + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;
let orderSchema = new Schema({
	created: Date,
	orderNumber: String,
  customerId: String,
  gameId: String
});

// orderSchema.methods.getGames = function() {
// 		return Order.find({ gameId: this.gameId});
// };

module.exports = {
  getOrderModel: function getOrderModel() {
    if (connection == null) {
      console.log("Creating connection and Order model");
      connection = mongoose.createConnection(dbUrl);
      model = connection.model("outcalt_orderModel", orderSchema);

    };
    return model;
  }
};
