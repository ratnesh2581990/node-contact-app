const mongoose      = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://ratnesh3rde:ratnesh123@ds115971.mlab.com:15971/contactapp');
let db = mongoose.connection;
db.once('open', function () {
    console.log('Connected to MongoDB');
});

db.on('error', function (err) {
    console.log(err);
});

mongoose.Promise = global.Promise;
module.exports = {
    Contact: require('../models/contact')
}