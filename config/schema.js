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

schema.statics.authenticate = (email,password,callback) => {
    user.findOne({email : email}, (error,User) => {
        if(error) {
            return callback(error);
        } else if(!User){
            return callback(error);
        } else {
            bcrypt.compare(password,user.password);
        }
    })

}

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
