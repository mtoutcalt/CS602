const request = require('request');

module.exports = async function getGamesDescriptionApiJson(req, res, next) {

      let optionsGameByDescription = {
        url: urlString = 'http://localhost:3000/api/games/description/' + req.query.description,
        headers: {
          'Accept': 'application/json'
        }
      };

      request.get(optionsGameByDescription, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.json(JSON.parse(body));
        } else {
          console.log("Call failed");
        }
      });

};
