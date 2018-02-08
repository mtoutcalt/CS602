const express = require('express');
const router = express.Router();

//modules
const displayGames = require("./displayGames");
const addGame = require("./addGame");
const saveGame = require("./saveGame");
const editGame = require("./editGame");
const saveAfterEdit = require("./saveAfterEdit");
const deleteGame = require("./deleteGame");

router.get('/', (req, res, next) => {
  res.redirect('/games');
});

router.get('/games', displayGames);

router.get('/games/add', addGame);
router.post('/games/add', saveGame);

router.get('/games/edit/:id', editGame);
router.post('/games/edit/:id', saveAfterEdit);

router.get('/games/delete/:id', deleteGame);

module.exports = router;
