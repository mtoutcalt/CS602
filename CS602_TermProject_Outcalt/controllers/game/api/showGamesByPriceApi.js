var gameDB = require('../../../models/gameModel.js');
var Game = gameDB.getGameModel();

module.exports = async function showGamesByPriceApi(req, res, next) {
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;

  const Game = gameDB.getGameModel();
  let games = await Game.find({}).where('price').lt(maxPrice).where('price').gt(minPrice);
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
