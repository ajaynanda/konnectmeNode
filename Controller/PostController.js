
const upload = require('../Middlewares/imageUpload')
const postdb=require('../Model/post')
const Userdb = require('../Model/user')
const userpost=((req,res)=>{      
    return new Promise((resolve,reject)=>{
                Userdb.findOne({userid:req.params.id}).then((userdata)=>{
                    // console.log(userdata);
                    upload(req, res, (err) => {
                        if (err) reject(err)
                        if (!req.files.img && !req.body.desc) {
                            reject({ error: true, message: "select a file to be uploaded",Error:err })
                        }else{
                            console.log(req.files);
                                const post=new postdb({
                                    Name:`${userdata.Firstname}`.charAt(0).toUpperCase() +`${userdata.Firstname} `.substring(1) + ` ${userdata.Lastname}`.substring(1),
                                    userid:userdata.userid,
                                    Description:req.body.desc,
                                    Image:req.files.img?req.files.img[0].filename:'',
                                    profileImg:userdata.Profilepic,
                                    url:req.body.url
                                })
                                post.save(post).then((result)=>{
                                    resolve(result)
                                }).catch(err=>{
                                    console.log(err);
                                    reject({sucess:false,message:'cannot post ' ,err:err})
                                })
                            }
                    })  
        })   
    })
    }) 
const postbyid=((req,res)=>{
    return new Promise((resolve,reject)=>{
        postdb.find({userid:req.params.id}).then((userpost)=>{
            resolve(userpost)
        }).catch(err=>{
            console.log(err);
            reject({sucess:false,message:'userid deos not exists',err:err})
        })
    })
})
const deletepost=((req,res)=>{
    return new Promise((resolve,reject)=>{
        const id=req.params.id
        postdb.findByIdAndDelete(id).then((result)=>{
            resolve(resolve)
        }).catch(err=>{
            reject({Succes:false,message:'Error on deletion'})
        })
    })
})
const updatepost=((req,res)=>{
    return new Promise((resolve,reject)=>{
        postdb.findOne({_id:req.params.id}).then(async(post)=>{
            if(!post){
                reject({sucess:false,message:'user id not found'})
            }
           const data=({
               Description:req.body.desc
           })
         await   postdb.findByIdAndUpdate(req.params.id,data).then((result)=>{
               resolve(result)
           }).catch(err=>{
                reject({sucess:false,message:'error on updating the post',Err:err})
           })
           
        }).catch(err=>{
            reject(err)
        })
    })
})
const timeline=((req,res)=>{
    return new Promise(async(resolve,reject)=>{
        const cuser=await Userdb.findOne({userid:req.params.userid}) 
        const userpost=await postdb.find({userid:req.params.userid})
        const friendPosts = await Promise.all(
        await cuser.Followings.map((frndid)=>{
        return  postdb.find({userid:frndid._id})
        })  
        )
        console.log(friendPosts);
        resolve(userpost.concat(...friendPosts))
    })
})
const likepost=((req,res)=>{
    return new Promise(async(resolve,reject)=>{
        const user= await Userdb.findOne({userid:req.params.userid})
        const userpost= await postdb.findById({_id:req.params.id})
        const data={
            userid:req.params.userid,
            Liked:true
         
        }
        if(!userpost.Likes.some((el)=>el.userid==req.params.userid)){
            await userpost.updateOne({$push:{Likes:data}})
            resolve({Success:true,message:'you liked the post',data:userpost})
        }else{
            const data={
                userid:req.params.userid,
                Liked:true
               
            }
            await userpost.updateOne({$pull:{Likes:data}})
            resolve({Success:false,message:'you disliked the post',data:userpost})
        }     
    })
})
const comment=((req,res)=>{
    return new Promise(async(resolve,reject)=>{
        const user=await Userdb.findById(req.params.userid)
        const userpost=await postdb.findById(req.params.id)
        // console.log(userpost);
        console.log(req.body,"body")
        if(req.body == undefined){
            reject({Error:true,message:"Cannot access body"})
        }
        const data={
            userid:user.userid,
            comment:req.body.comment,
            profileImg:req.body.profileImg,
            Name:req.body.Name
        }
        console.log(data);
        await userpost.updateOne({$push:{Comments:{$each:[data],$position:0}}}).then((result)=>{
            resolve(result)
        }).catch(err=>{
            console.log(err);
            reject({Succes:false,message:"Error on commenting"})
        })
    })
})
const deleteComment=((req,res)=>{
    return new Promise(async(resolve,reject)=>{       
            const userpost=await postdb.findById(req.params.postid)
            if(!userpost){
                return reject({success:false,mesage:'User post Not Found'})
            }
            const updatedPost=await userpost.updateOne({$pull:{Comments:{_id:req.params.commentid}}})
            if(updatedPost.modifiedCount===0){
                return  reject({success:true,message:'Comment Not Found or already deleted'})
            }
            resolve(updatedPost)
    })
})
const editComment=((req,res)=>{
    return new Promise(async(resolve,reject)=>{
        const updatePost = await postdb.updateOne(
            { _id: req.params.postid, "Comments._id": req.params.commentid },
            { $set: { "Comments.$.comment": req.body.comment } }
        );
        if(updatePost.modifiedCount===0){
           return reject({success:false,message:'Comment not found or Already Updated'})
        }
        resolve(updatePost)
  
    })
})
const addReply = ((req,res)=>{
    return new Promise(async(resolve,reject)=>{
        console.log(req.body,"ody")
        try{
            const userpost = postdb.findById(req.params.postid)
            if(!userpost){
                return  reject({success:false,messag:'User Post Not Found'})
            }
            const comment =await postdb.updateOne({_id:req.params.postid,"Comments._id":req.params.commentid},{$push:{"Comments.$.replies":req.body}})
            if(comment.modifiedCount===0){
                return reject({success:false,message:'Reply cannot add'})
            }   
            resolve(comment)
        }catch(err){
            return reject({success:false,message:'Error while adding reply'})
        }
    })
})
const editReplyComment =((req,res)=>{
    return new Promise(async(resolve,reject)=>{
const result = await postdb.updateOne(
    { "_id": req.params.postid, "Comments._id": req.params.commentid, "Comments.replies._id": req.params.repid },
    { $set: { "Comments.$.replies.$[reply].comment": req.body.comment } },
    {
        arrayFilters: [
            { "reply._id": req.params.repid }
        ]
    }
);
        if(result.modifiedCount===0){
            return reject({success:false,message:'Cannot Update the Reply'})
        }
        resolve(result)
    })
})
const deleteReplyComment=((req,res)=>{
    return new Promise(async(resolve,reject)=>{
        const result = await postdb.updateOne({_id:req.params.postid,"Comments._id":req.params.commentid},{$pull:{"Comments.$.replies":{_id:req.params.repid}}})
        if(result.modifiedCount===0){
            return  reject({success:true,message:'Comment Not Found or already deleted'})
        }
        resolve(result)
    })
})
module.exports={userpost,postbyid,deletepost,updatepost,timeline,likepost,comment,deleteComment,editComment,addReply,editReplyComment,deleteReplyComment}