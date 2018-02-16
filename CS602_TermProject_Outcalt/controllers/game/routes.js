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

const deleteGame = require("./deleteGame");

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
router.post('/games/order/:id', saveAfterPurchase);

router.get('/games/delete/:id', deleteGame);

module.exports = router;
