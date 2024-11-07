const mongoose=require('mongoose')
const AdminSchema=new mongoose.Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String
    },
    Adminid:{
        String
    },
    isAdmin:{
        type:Boolean,
        default:true
    },
    Password:{
        type:String
    }
},{timestamps:true})
const Admindb=mongoose.model('admin',AdminSchema)
module.exports = Admindb