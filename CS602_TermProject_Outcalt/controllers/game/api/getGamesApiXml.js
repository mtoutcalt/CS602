const request = require('request');

module.exports = async function getGamesApiXml(req, res, next) {

  var optionsAllGamesXml = {
    url: 'http://localhost:3000/api/games',
    headers: {
      'Accept': 'application/xml'
    }
  };

  request.get(optionsAllGamesXml, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.type('application/xml');
      res.send(body);
    } else {
      console.log("Call failed");
      }
    });

};
