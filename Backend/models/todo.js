const mongoose = require('mongoose');

const {Schema} = mongoose;

const todos = new Schema({
    user_id:{type:mongoose.SchemaTypes.ObjectId, ref:'users'},
    task_name:{type:String, required:true},
    task_description:{type:String, required:true},
    task_label:{type:String},
},
    {timestamps: true}
);
module.exports = mongoose.model('todo' , todos, 'todos');