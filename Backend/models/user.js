const mongoose = require('mongoose');
const { schema } = require('./invoice');

const {Schema} = mongoose;


const userSchema = new Schema({
    name: {type:String, required:true},
    username: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    user_role: {type:String, required:true},
    password: {type:String, required:true},
},
    {timestamps:true}
);

module.exports = mongoose.model('user' , userSchema , 'users');