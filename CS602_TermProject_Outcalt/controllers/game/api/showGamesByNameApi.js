var gameDB = require('../../../models/gameModel.js');
var Game = gameDB.getGameModel();

module.exports = async function showGamesByNameApi(req, res, next) {
  let nameInput = req.params.name;

  const Game = gameDB.getGameModel();
  let games = await Game.find({'name': {'$regex': nameInput, $options:'i'}});
  res.format({
      'application/json': function() {
        res.json(games);
      },

      'application/xml' : function() {
           let gameXml =
              '<?xml version="1.0"?>\n<games>' +
              games.map( (game) => {
                return '<game id="' + game.id + '">' +
                '  <name>' + game.name + '</name>' +
                '  <description>' + game.description + '</description>' +
                '  <price>' + game.price + '</price>' +
                '  <quantityLeft>' + game.quantityLeft + '</quantityLeft>' +
                '  <totalQuantity>' + game.totalQuantity + '</totalQuantity>' +
                '</game>';
              }).join('\n') + '\n</games>\n';
         res.type('application/xml');
         res.send(gameXml);
    },

      'default': function() {
        res.status(404);
        res.send("<b>404 - Not Found");
      }
  });
};
