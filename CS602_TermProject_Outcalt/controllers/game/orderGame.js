const DB = require('../../models/gameModel.js');
const Game = DB.getGameModel();

module.exports = function orderGame(req, res, next) {
  let id = req.params.id;

  Game.findById(id, (err, game) => {
    if (err) {
      console.log("Error Selecting : %s ", err);
    }
    if (!game) {
      return res.render('404');
    }

    res.render('orderGameView', {title:"Edit Video Game",
                                  data: {id: game._id,
                                          name: game.name,
                                          description: game.description,
                                          price: game.price,
                                          quantity: game.quantity}
                                      });
  });
};
