const fs = require("fs");
const destiny_file = require('./gameDetails/destiny.json');
const mario_file = require('./gameDetails/super_mario_odyssey.json');
const half_life_file = require('./gameDetails/half_life.json');
const pokemon_file = require('./gameDetails/pokemon.json');
const sonic_file = require('./gameDetails/sonic_the_hedgehog.json');
const ssx_tricky_file = require('./gameDetails/ssx_tricky.json');
const super_monkey_ball_file = require('./gameDetails/super_monkey_ball.json');
const superman_file = require('./gameDetails/superman_64.json');
const tetris_file = require('./gameDetails/tetris.json');
const world_of_warcraft_file = require('./gameDetails/world_of_warcraft.json');

//this is a placeholder for calling the actual external api giantbomb.com to get this json back dynamically
//with hardcoding it if the admin adds a new game it obviously won't have details
//my problem was not enough time and not knowing how to encrypt the giantbomb api key
//I would also present the json as more presentable html if I had more time
module.exports = function showDetails(req, res, next) {
  const name = req.query.name;
  if (name == 'Destiny') {
    res.send(destiny_file);
  } else if (name == 'Superman 64') {
    res.send(superman_file);
  } else if (name == 'World of Warcraft') {
    res.send(world_of_warcraft_file);
  } else if (name == 'Tetris') {
    res.send(tetris_file);
  } else if (name == 'Super Monkey Ball') {
    res.send(super_monkey_ball_file);
  } else if (name == 'Pokemon') {
    res.send(pokemon_file);
  } else if (name == 'Half-Life') {
    res.send(half_life_file);
  } else if (name == 'SSX Tricky') {
    res.send(ssx_tricky_file);
  } else if (name == 'Super Mario Odyssey') {
    res.send(mario_file);
  } else if (name == 'Sonic The Hedgehog') {
    res.send(sonic_file);
  } else {
    res.redirect('404');
  }

};
