const config = require('config');
const mongoose = require('mongoose');


module.exports = function(){
    const url = config.get('dbUrl');
    mongoose.connect(url, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to the DB...'))
    .catch(err => console.log(err));
}