const mongoose=require("mongoose")
const otpSchema=new mongoose.Schema({
    userid:{
        type:String
    },
    Name:{
        type:String
    },
    otp:{
        type:String
    },
    isAdmin:{
        Boolean
    },
    createdAt: { type: Date, default: Date.now(), index: { expires: '1m' }}
    },{timestamps:true})
const otpdb=mongoose.model('otp',otpSchema)
module.exports=otpdb