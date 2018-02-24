const express = require('express');
const router = express.Router();

//modules
const displayGames = require("./displayGames");
const showGamesForPurchase = require("./showGamesForPurchase");

const addGame = require("./addGame");
const saveGame = require("./saveGame");

const editGame = require("./editGame");
const saveAfterEdit = require("./saveAfterEdit");
const orderGame = require("./orderGame");
const saveAfterPurchase = require("./saveAfterPurchase");
const newOrder = require("./newOrder");

const deleteGame = require("./deleteGame");
const admin = require("./admin");

//API
const showGamesApi = require("./api/showGamesApi");
const showGamesByNameApi = require("./api/showGamesByNameApi");
const showGamesByDescriptionApi = require("./api/showGamesByDescriptionApi");
const showGamesByPriceApi = require("./api/showGamesByPriceApi");

router.get('/', (req, res, next) => {
  res.redirect('/games');
});

router.get('/games', displayGames);
router.get('/store', showGamesForPurchase);

router.get('/games/add', addGame);
router.post('/games/add', saveGame);

router.get('/games/edit/:id', editGame);
router.post('/games/edit/:id', saveAfterEdit);

router.get('/games/order/:id', orderGame);
// router.post('/games/order/:id', saveAfterPurchase);
router.post('/games/new_order', newOrder);

router.get('/games/delete/:id', deleteGame);

router.get('/admin', admin);

router.get('/api/games/price', showGamesByPriceApi);
router.get('/api/games', showGamesApi);
router.get('/api/games/:name', showGamesByNameApi);
router.get('/api/games/description/:description', showGamesByDescriptionApi);


module.exports = router;
