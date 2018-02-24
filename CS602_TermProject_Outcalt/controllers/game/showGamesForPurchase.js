const DB = require('../../models/gameModel.js');
const Game = DB.getGameModel();

module.exports = function showGamesForPurchase(req, res, next) {


  if (req.query.gameName != null) {
    console.log("Looking for game!: " + req.query.gameName);
    let gameSearchByName = req.query.gameName;

    Game.find({'name': {'$regex': gameSearchByName, $options:'i'}}, (err, games) => {
      if (err) {
        console.log("Error: %s ", err);
      }

      let results = games.map( (game) => {
        return {
          id: game._id,
          name: game.name,
          description: game.description,
          price: game.price,
          quantityLeft: game.quantityLeft,
          totalQuantity: game.totalQuantity
        }
      });
        res.render('showGamesForPurchaseView', {title: "Buy New and Used Video Games", data: results})
    });

  } else if (req.query.gameDescription != null) {
    console.log("Looking for Description!: " + req.query.gameDescription);
    let gameSearchByDescription = req.query.gameDescription;

    Game.find({'description': {'$regex': gameSearchByDescription, $options:'i'}}, (err, games) => {
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
        res.render('showGamesForPurchaseView', {title: "Buy New and Used Video Games", data: results})
    });

  } else {

      if (req.query.sorting != null) {
        Game.find({}, null, {sort: {name: 1}}, (err, games) => {
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
            res.render('showGamesForPurchaseView', {title: "Buy New and Used Video Games", data: results})
        });
      } else {

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
            res.render('showGamesForPurchaseView', {title: "Buy New and Used Video Games", data: results})
        });
      }
  };
};
