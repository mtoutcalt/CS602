var DB = require('../../models/gameModel.js');
var Game = DB.getGameModel();

module.exports = function deleteGame(req, res, next) {
  let id = req.params.id;


  Game.remove({}, (err, game) => {
    console.log("All Deleted");
  });

  Game.findById(id, (err, game) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!game) {
      return res.render('404');
    }

    game.remove( (err) => {
      if (err) {
        console.log("Error deleting : %s ", err);
      }
      res.redirect('/games');
    });
  });
};
