const  mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        lowercase:true,
    },
    email:{
        type:String,
        lowercase:true,
    },
    number:{
        type:String,
    },
    password:{
        type:String
    },
    profile : {
        type : String
    },
    about:{
        type:String,
    }
})


module.exports = mongoose.model('users' , userSchema);