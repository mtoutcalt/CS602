const request = require('request');

module.exports = async function getGamesNameApiXml(req, res, next) {

      let optionsGameByName = {
        url: urlString = 'http://localhost:3000/api/games/' + req.query.name,
        headers: {
          'Accept': 'application/xml'
        }
      };

      request.get(optionsGameByName, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.type('application/xml');
          res.send(body);
        } else {
          console.log("Call failed");
        }
      });

};
