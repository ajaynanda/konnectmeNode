const mongoose=require('mongoose')
require("dotenv").config()
const connectdb = mongoose.connect(process.env.URL,((err)=>{
    if(err) throw err
    else{
        console.log("Mongodb connected");
    }
}))
module.exports = connectdb