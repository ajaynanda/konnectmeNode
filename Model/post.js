const mongoose=require('mongoose')
const replySchema=new mongoose.Schema({
    userid:String,
    profileImg:String,
    Name:String,
    comment:String
},{_id:true})
const PostSchema=new mongoose.Schema({
    Name:{
        type:String,
    },
    userid:{
        type:String
    },
    Description:{
        type:String
    },
    Image:{
        type:String,
        default:''
    },
    Likes:[{
        userid:{type:String},
        Liked:{type:Boolean}
    }],
    Video:{
        type:String
    },
    profileImg:{
        type:String
    },
    Comments:[{
        userid:{
            type:String
        },
        Name:{
            type:String
        },
        profileImg:{
            type:String
        },
        comment:{
            type:String
        },
        replies:[replySchema]
}]

},{timestamps:true})

const Postdb=mongoose.model('post',PostSchema)
module.exports = Postdb