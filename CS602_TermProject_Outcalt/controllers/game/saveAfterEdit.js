const DB = require('../../models/gameModel.js');
const Game = DB.getGameModel();

module.exports = function saveGame(req, res, next) {
  let id = req.params.id;

  Game.findById(id, (err, game) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!game) {
      return res.render('404');
    }

    game.name = req.body.gameName; //get data from body of post
    game.description = req.body.gameDescription;
    game.price = req.body.gamePrice;
    game.quantity = req.body.gameQuantity;


    game.save( (err) => {
      if (err) {
        console.log("Error updating : %s ", err);
      }
      res.redirect('/games');
    });

  });
};
