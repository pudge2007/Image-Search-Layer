var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
    term: String,
    when: String
});

mongoose.model('History', historySchema);