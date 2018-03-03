const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    email : {
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    username : {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password: {
        type:String,
        required:true
    }
});

schema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password, 100, function(err,hash){
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});


const user = mongoose.model('User', schema);
module.exports = user;
