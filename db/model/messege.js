const mongoose = require('mongoose')

const messegeSchema = new mongoose.Schema({
    conversation_ID :String,
    sender_ID : String,
    receiver_ID : String,
    text : String,
    type : String
},{
    timestamps:true
}
)

module.exports = mongoose.model('messeges' ,messegeSchema )