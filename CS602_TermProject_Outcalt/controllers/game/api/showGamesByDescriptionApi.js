var gameDB = require('../../../models/gameModel.js');
var Game = gameDB.getGameModel();

module.exports = async function showGamesByDescriptionApi(req, res, next) {
  let descInput = req.params.description;

  const Game = gameDB.getGameModel();
  let games = await Game.find({'description': {'$regex': descInput, $options:'i'}});
  res.format({
      'application/json': function() {
        res.json(games);
      },

      'application/xml' : function() {
        let gameXmlArray = [];
        games.map( (game) => {
          console.log(game.name);
           let gameXml =
              '<?xml version="1.0"?>' +
              '<game id="' + game.id + '">' +
              '  <name>' + game.name + '</name>' +
              '  <description>' + game.description + '</description>' +
              '  <price>' + game.price + '</price>' +
              '  <quantity>' + game.quantity + '</quantity>' +
              '</game>';
           gameXmlArray.push(gameXml);
         });
         res.type('application/xml');
         res.send(gameXmlArray);
      },

      'default': function() {
        res.status(404);
        res.send("<b>404 - Not Found");
      }
  });
};
