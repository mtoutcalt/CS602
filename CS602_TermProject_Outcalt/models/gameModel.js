const credentials = require('../credentials');
const mongoose = require('mongoose');

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;
let gameSchema = new Schema({
  name: String,
  description: String,
	price: String, 	////////////////////TODO make this a number
	quantity: String
});

module.exports = {
  getGameModel: function getGameModel() {
    if (connection == null) {
      console.log("Creating connection and Game model");
      connection = mongoose.createConnection(dbUrl);
      model = connection.model("outcalt_gameModel", gameSchema);

      //creating and saving the 3 employees per the instruction
      let game;
      game = new model({
				name: 'The Legend of Zelda: Ocarina of Time',
			  description: 'An action-adventure on the Nintendo 64',
				price: '30',
				quantity: '8'
      });
      game.save();

      game = new model({
				name: 'World of Warcraft',
			  description: 'A massively multiplayer role-playing game on the PC',
				price: '40',
				quantity: '15'
      });
      game.save();

      game = new model({
				name: 'Super Mario Odyssey',
			  description: 'A 3D platforming game featuring Mario on the Nintendo Switch',
				price: '60',
				quantity: '20'
      });
      game.save( (err) => {
        if (err) throw err;
        console.log("Success!");
      });

    };
    return model;
  }
};
