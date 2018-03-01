const request = require('request');

module.exports = async function getGamesNameApiJson(req, res, next) {

      let optionsGameByName = {
        url: urlString = 'http://localhost:3000/api/games/' + req.query.name,
        headers: {
          'Accept': 'application/json'
        }
      };

      request.get(optionsGameByName, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.json(JSON.parse(body));
        } else {
          console.log("Call failed");
        }
      });

};
