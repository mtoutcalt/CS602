const request = require('request');

module.exports = async function getGamesDescriptionApiXml(req, res, next) {

      let optionsGameByDescription = {
        url: urlString = 'http://localhost:3000/api/games/description/' + req.query.description,
        headers: {
          'Accept': 'application/xml'
        }
      };

      request.get(optionsGameByDescription, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.type('application/xml');
          res.send(body);
        } else {
          console.log("Call failed");
        }
      });

};
