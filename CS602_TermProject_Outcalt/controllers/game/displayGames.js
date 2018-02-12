const DB = require('../../models/gameModel.js');
const Game = DB.getGameModel();

module.exports = function displayGames(req, res, next) {
  Game.find({}, (err, games) => {
    if (err) {
      console.log("Error: %s ", err);
    }

    let results = games.map( (game) => {
      return {
        id: game._id,
        name: game.name,
        description: game.description,
        price: game.price,
        quantity: game.quantity
      }
    });
      res.render('displayGamesView', {title: "List of Video Games", data: results})
  });

};
