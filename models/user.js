let mongoose = require('mongoose');
let userSchema = require('../schemas/userSchame');
module.exports = mongoose.model('user', userSchema);
