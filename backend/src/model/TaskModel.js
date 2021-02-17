const mongoose= require('mongoose');

const taskSchema= new mongoose.Schema({
    description:{
        type: String,
        required: true,
        trim: true,
    },
    status:{
        type: Boolean,
        default: false,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }},
    {
    timestamps: true,
});

const TaskModel= mongoose.model('Task', taskSchema);

module.exports= TaskModel;