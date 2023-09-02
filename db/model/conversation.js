const mongoose  = require('mongoose')

const conversationSchema = new mongoose.Schema({
   member : Array,
   messege : String
},{
    timestamps : true
  } 
)

module.exports = mongoose.model('conversation' , conversationSchema)