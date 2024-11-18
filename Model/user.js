const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    Firstname:{
        type:String,
    },
    Lastname:{
        type:String,
    },
    Email:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    DateofBirth:{
        type:String,
        
    },
    Password:{
        type:String
    },
    Followers:[{
       Firstname:String,
       Lastname:String,
       Name:String,
       _id:String,
       Profilepic:String,
       dob:String
    }],
    Followings:[{
        Firstname:String,
        Lastname:String,
        Name:String,
        _id:String,
        Profilepic:String,
        dob:String
    }],
    Friends:[{
        Firstname:String,
        Lastname:String,
        Name:String,
        _id:String,
        Profilepic:String,
        dob:String
    }],
    Aboutme:{
        type:String,
        default:undefined
    },
    City:{
        type:String,
        default:undefined
    },
    Relation:{
        type:String,
        default:undefined
    },
    Profilepic:{
        type:String
    },
    Coverpic:{
        tye:String
    },
    userid:{
        type:String
    },
    userSuggestion:[{
        Name:String,
        _id:String,
        profilePic:String,
        text:String
    }],
    chatList:[{
        Name:String,
        _id:String,
        profilePic:String,
        lasttext:String,
        isSeen:Boolean,
        chatID:String,
        repID:String,
        repName:String,
        repProfilePic:String
    }],
    verified: {
         type: Boolean, default: false 
        },
    verificationToken: { 
        type: String 
    },
},{timestamps:true})
const Userdb=mongoose.model('user',UserSchema)
module.exports = Userdb