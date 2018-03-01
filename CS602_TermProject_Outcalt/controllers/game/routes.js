const express = require('express');
const router = express.Router();

//modules
const displayGames = require("./displayGames");
const showGamesForPurchase = require("./showGamesForPurchase");

//game extra info
const showDetails = require("./external_api/showDetails");

const addGame = require("./addGame");
const saveGame = require("./saveGame");

const editGame = require("./editGame");
const saveAfterEdit = require("./saveAfterEdit");
const orderGame = require("./orderGame");
const newOrder = require("./newOrder");

const deleteGame = require("./deleteGame");
const admin = require("./admin");
const adminAuth = require("./adminAuth");
const customerAuth = require("./customerAuth");

//API
const showGamesApi = require("./api/showGamesApi");
const showGamesByNameApi = require("./api/showGamesByNameApi");
const showGamesByDescriptionApi = require("./api/showGamesByDescriptionApi");
const showGamesByPriceApi = require("./api/showGamesByPriceApi");
const getGamesApiJson = require("./api/getGamesApiJson");
const getGamesApiXml = require("./api/getGamesApiXml");
const getGamesPriceApiJson = require("./api/getGamesPriceApiJson");
const getGamesPriceApiXml = require("./api/getGamesPriceApiXml");
const getGamesNameApiJson = require("./api/getGamesNameApiJson");
const getGamesNameApiXml = require("./api/getGamesNameApiXml");
const getGamesDescriptionApiJson = require("./api/getGamesDescriptionApiJson");
const getGamesDescriptionApiXml = require("./api/getGamesDescriptionApiXml");


router.get('/', (req, res, next) => {
  res.redirect('/welcome');
});

router.get('/games', displayGames);
router.get('/store', showGamesForPurchase);


//game details
router.get('/details', showDetails);

router.get('/games/add', addGame);
router.post('/games/add', saveGame);

router.get('/games/edit/:id', editGame);
router.post('/games/edit/:id', saveAfterEdit);

router.get('/games/order/:id', orderGame);
router.post('/games/new_order', newOrder);

router.get('/games/delete/:id', deleteGame);

router.get('/admin', admin);
router.get('/adminAuth', adminAuth);
router.get('/customerAuth', customerAuth);

router.get('/api/games/price', showGamesByPriceApi);
router.get('/api/games', showGamesApi);
router.get('/api/games/:name', showGamesByNameApi);
router.get('/api/games/description/:description', showGamesByDescriptionApi);

//these are routes that expose the underlying API data above to the admin
router.get('/getGamesApi/json', getGamesApiJson);
router.get('/getGamesApi/xml', getGamesApiXml);
router.get('/getGamesPriceApi/json', getGamesPriceApiJson);
router.get('/getGamesPriceApi/xml', getGamesPriceApiXml);
router.get('/getGamesNameApi/json', getGamesNameApiJson);
router.get('/getGamesNameApi/xml', getGamesNameApiXml);
router.get('/getGamesDescriptionApi/json', getGamesDescriptionApiJson);
router.get('/getGamesDescriptionApi/xml', getGamesDescriptionApiXml);

module.exports = router;
