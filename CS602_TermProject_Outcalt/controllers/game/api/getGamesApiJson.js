const request = require('request');

module.exports = async function getGamesApiJson(req, res, next) {

  var optionsAllGames = {
    url: 'http://localhost:3000/api/games',
    headers: {
      'Accept': 'application/json'
    }
  };

  request.get(optionsAllGames, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.json(JSON.parse(body));
        } else {
          console.log("Call failed");
        }
  });

};
