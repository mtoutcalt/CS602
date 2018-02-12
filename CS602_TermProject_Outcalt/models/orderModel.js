const credentials = require('../credentials');
const mongoose = require('mongoose');
const gameDB = require('./gameModel.js');
const Game = gameDB.getGameModel();

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;
let orderSchema = new Schema({
  games: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Game"
	}],
	created: Date
});

module.exports = {
  getOrderModel: function getOrderModel() {
    if (connection == null) {
      console.log("Creating connection and Order model");
      connection = mongoose.createConnection(dbUrl);
      model = connection.model("outcalt_orderModel", orderSchema);

			let game = new Game({
	         name: "test game",
	         description: "did it work?",
	         price: "234",
	         quantity: "12"
	     });

      let order;
      order = new model({
				games: [game],
				created: new Date()
      });

      order.save( (err) => {
        if (err) throw err;
        console.log("Success!");
      });

    };
    return model;
  }
};
