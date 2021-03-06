const DB = require('../../models/gameModel.js');
const Game = DB.getGameModel();

module.exports = function saveGame(req, res, next) {

    let game = new Game({
         name: req.body.gameName,
         description: req.body.gameDescription,
         price: req.body.gamePrice,
         quantityLeft: req.body.gameQuantityLeft,
         totalQuantity: req.body.gameTotalQuantity
     });

     game.save( (err) => {
       if (err) {
         console.log("Error: %s ", err);
       }
       res.redirect('/games');
     });
};
