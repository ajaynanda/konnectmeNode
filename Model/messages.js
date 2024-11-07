const mongoose= require('mongoose')
const messageSchema=new mongoose.Schema({
    chatID:{
        type:Number
    },
    chatData:[],
    repData:{
        repName:String,
        repID:String,
        repProfilePic:String,
    },
    userData:{
        Name:String,
        userid:String,
        profilePic:String,
    }
})
const messagedb =  mongoose.model('messages',messageSchema)
module.exports=messagedb