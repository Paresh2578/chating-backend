const mongoose =require('mongoose');
require('./db/config');
const express = require('express');
const cors = require('cors');

//file upload
const uplods = require('./utils/uplods')

const app = express();
app.use(express.json());
const PORT =process.env.PORT || 4000;
app.use(cors());
  


//model
const User = require('./db/model/user')
const Convarsation = require('./db/model/conversation');
const Messege = require('./db/model/messege')


app.get('/get_AllUser' , async (req , resp)=>{
    try{
        const result = await User.find();
      resp.send(result);
    }catch(error){
        resp.send("get All user api error : " + error);
    }
})


app.post('/register' , async(req , resp)=>{
     try{
        const data = new User(req.body);
        const result = await data.save();
        resp.send(result);
     }catch(error){
        resp.send("register api error : " + error);
     }
})

app.get('/login/:email/:password' , async(req , resp)=>{
     try{
        const result = await User.find({email:req.params.email , password :req.params.password});
      resp.send(result);
     }catch(error){
        resp.send("login api error : "+ error);
     }
})

app.get('/userFind/:email', async(req , resp)=>{
    try{
        const result = await User.find({email: req.params.email});
      resp.send(result);
    }catch(error){
        resp.send("userfind api error : "+ error);
    }
})

app.put('/forgerPassword/:emailId' , async(req , resp)=>{
     try{
        let result = await User.updateOne(
            {email : req.params.emailId},
            {$set : req.body}
        )
        resp.send(result);
     }catch(error){
        resp.send("forget passwoed api error : " + error);
     }
})

app.get('/convarsation/get_all_convarsation' , async(req , resp)=>{
    try{
        let result = await Convarsation.find();
         resp.send(result);
    }catch(error){
        resp.send("convarsaion/get_all_convarsation api error : " + error)
    }
})

app.get('/messeges/get_all_messeges' , async(req, resp)=>{
    try{
        let result = await Messege.find();
        resp.send(result)
    }catch(error){
        resp.send("get all msg api error :" + error);
    }
})


app.post('/convarsation/:senderID/:receiver_ID' , async(req , resp)=>{
     try{
        let data = new Convarsation(req.body)

        let user = await Convarsation.findOne({member : {$all : [req.params.senderID , req.params.receiver_ID]}});
        if(!user){
        let result = await data.save();
        resp.send(result);
        }else{
        let  result = "convarsation alrady exits"
            resp.send(result);
        }
     }catch(error){
        resp.send("convarstion api error :" + error)
     }
})

app.get('/get_convarsation_id/:sender_email/:receiver_email', async(req , resp)=>{
     try{
        let  result = await Convarsation.findOne({member : {$all : [req.params.sender_email , req.params.receiver_email]}});
        resp.send(result);
     }catch(error){
        resp.send("get convarstion id api error : " + error)
     }
})

app.get('/get_convarsation/:sender_email/:receiver_email', async(req , resp)=>{
    try{
        let  result = await Convarsation.findOne({member : {$all : [req.params.sender_email , req.params.receiver_email]}});
        const convarsation_id = result._id;
        result = await Messege.find({conversation_ID : convarsation_id})
        resp.send(result);
    }catch(error){
        resp.send("get convarstion api error : "  + error)
    }
})


app.put('/convarsation/Change_msg/:convarsation_id' , async(req , resp)=>{
    try{
         let result = await Convarsation.updateOne(
            {_id : req.params.convarsation_id},
            {$set : req.body}
         )
         resp.send(result)
    }catch(error){
        resp.send("convarstion/change_msg put api error : " + error)
    }
})

app.post('/messege', async(req , resp)=>{
    try{
        const data = new Messege(req.body);
        const result = await data.save();
        resp.send(result);
    }catch(error){
        resp.send("post messege api error : "+ error)
    }
})

app.delete('/messge/delete/:convarsation_ID' , async (req , resp)=>{
    try{
        const change_msg = await Convarsation.updateOne(
            {_id : req.params.convarsation_ID},
            {$set : {messege : ""}}
            )

        const result = await Messege.deleteMany({conversation_ID : req.params.convarsation_ID});
        resp.send(result);
    }catch(error){
        resp.send("delete messdger api error : " + error);
    }
})


app.put('/use/name/nameUpdate/:emailId' , async(req , resp)=>{
    try{
       let result = await User.updateOne(
           {email : req.params.emailId},
           {$set : req.body}
       )
       resp.send(result);
    }catch(error){
       resp.send("forget passwoed api error : " + error);
    }
})


//file uploadj

// app.post('/file/upload' , uplods.single('file') , async(req  , resp)=>{
//      if(!req.file)
//         resp.send("file not found")

       
//         const imgeUrl = `http://localhost:4500/file/${req.file.filename}`
//         resp.send(imgeUrl);
// })   

// let gfs, gridfsBucket;
// const conn = mongoose.connection;
// conn.once('open', () => {
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'fs'
//     });
//     gfs = grid(conn.db, mongoose.mongo);
//     gfs.collection('fs');
// });

// app.get('/file/:filename' , async(req , resp)=>{
//     try{
//         const file = await gfs.files.findOne({filename : req.params.filename})
//         const readStream = gridfsBucket.openDownloadStream(file._id);
//         readStream.pipe(resp);
//     }catch(error){
//         resp.send("file error : " + error)
//     }
// })

let name = "p@resh123";
let newname = "";
 for(let i=0;i<name.length;i++){
     newname += String.fromCharCode((name.charCodeAt(i) + 5));
 }
console.log("name : " ,name);
console.log('newname : ' , newname);


app.listen(PORT)
