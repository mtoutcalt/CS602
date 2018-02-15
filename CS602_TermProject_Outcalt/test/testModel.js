const credentials = require('../credentials');
const mongoose = require('mongoose');

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

connection = mongoose.createConnection(dbUrl);
model = connection.model("outcalt_gameModel", gameSchema);


connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function callback () {
    console.log('connected ');
});

var user = mongoose.Schema({
    userName: String
});

var client = mongoose.Schema({
    fk_user: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    name: String
});

var UserModel = mongoose.model('Users', user);
var ClientModel = mongoose.model('Clients', client);

ClientModel.findOne().populate('fk_user').exec(function(err, c) {
    if (err) { return console.log(err); }

    console.log(c.fk_user.userName);
});
