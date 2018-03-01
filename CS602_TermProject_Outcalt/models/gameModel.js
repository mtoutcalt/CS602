const credentials = require('../credentials');
const mongoose = require('mongoose');

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

// const dbUrl = 'mongodb://' + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;
let gameSchema = new Schema({
  name: String,
  description: String,
	price: Number,
	totalQuantity: Number,
  quantityLeft: Number
});

module.exports = {
  getGameModel: function getGameModel() {
    if (connection == null) {
      console.log("Creating connection and Game model");
      connection = mongoose.createConnection(dbUrl);
      model = connection.model("Game", gameSchema);

    };
    return model;
  }
};
