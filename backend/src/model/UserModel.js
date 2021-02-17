const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }, 
   password: {
       type: String,
       required: true,
       trim: true       
   }
});


const UserModel= mongoose.model('User', userSchema);

module.exports= UserModel;
