const mongoose = require('mongoose');
require('dotenv').config();


const password = process.env.PASSWORD;



try{
    mongoose.connect('mongodb://127.0.0.1:27017/pChating');
    // mongoose.connect(`mongodb+srv://coding848:chatingwithp@chaingwith.bfhxut6.mongodb.net/chatinfo?retryWrites=true&w=majority`)
    console.log("connecting");
}catch(error){
    console.log(error);
}