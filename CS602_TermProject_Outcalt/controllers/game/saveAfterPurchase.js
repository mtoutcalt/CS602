const DB = require('../../models/gameModel.js');
const Game = DB.getGameModel();

/////SAVE ORDER by decrementing the quantity and checking for 0

module.exports = function saveAfterPurchase(req, res, next) {
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

    let currentQuantity = game.quantity;
    console.log("CURRENT QUANT: " + currentQuantity);

    let copiesLeft = currentQuantity - req.body.gameQuantity;
    console.log("COPIES LEFT: " + copiesLeft);

    if (copiesLeft < 0) {
      console.log("NO COPIES LEFT");
      return res.render('outOfStockView', {title: "Out of Stock", data: {copiesLeft: currentQuantity}});
    }

    game.quantity = copiesLeft;


    game.save( (err) => {
      if (err) {
        console.log("Error updating : %s ", err);
      }
      res.redirect('/store');
    });

  });
};
