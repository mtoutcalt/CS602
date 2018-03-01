const request = require('request');

module.exports = async function getGamesPriceApiJson(req, res, next) {

      let optionsGameByPrice = {
        url: urlString = 'http://localhost:3000/api/games/price?maxPrice=' + req.query.maxPrice + '&minPrice=' + req.query.minPrice,
        headers: {
          'Accept': 'application/json'
        }
      };

      request.get(optionsGameByPrice, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.json(JSON.parse(body));
        } else {
          console.log("Call failed");
        }
      });

};
