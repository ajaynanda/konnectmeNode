const route=require('express').Router()
const Controller=require('../Controller/PostController')

route.post('/userpost/:id',((req,res)=>{ 
            Controller.userpost(req,res).then((result)=>{
                if(result){
                    console.log(result)
                     res.status(200).json({Success:true,message:'User post has been made',data:result})
                }
             }).catch((err)=>{
                 console.log(err);
                 res.status(400).json(err)
             })
}))
route.get('/postbyuserid/:id',((req,res)=>{
    Controller.postbyid(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'userpost data',data:result})
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err)
    })
}))
route.put('/updatepost/:id',((req,res)=>{
    Controller.updatepost(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'User post has been updated',data:result})
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err)
    })
}))
route.delete('/deletepost/:id',((req,res)=>{
    Controller.deletepost(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'User post has been deleted',data:result})
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err)
    })
}))
route.get('/timeline/:userid',((req,res)=>{
    Controller.timeline(req,res).then((result)=>{
        res.status(200).json({Success:true,message:"data",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
route.get('/like/:userid/:id',((req,res)=>{
    Controller.likepost(req,res).then((result)=>{
        res.status(200).json({data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
route.post('/comment/:userid/:id',((req,res)=>{
    Controller.comment(req,res).then((result)=>{
        res.status(200).json({Success:true,message:"You commment on the post",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
route.delete('/comment/delete/:postid/:commentid',((req,res)=>{
    Controller.deleteComment(req,res).then((result)=>{
        console.log(res,"delete comments");
        res.status(200).json({success:true,message:'Comment Deleted Successfully',data:result})
    }).catch(err=>{
        res.status(400).json(err)
    })
}))
route.put('/comment/edit/:postid/:commentid',((req,res)=>{
    Controller.editComment(req,res).then((result)=>{
        res.status(200).json({success:true,message:'Comment Updated Successfully',data:result})
    }).catch(error=>{
        res.status(400).json(error)
    })
}))
route.post('/comment/addreply/:postid/:commentid',((req,res)=>{
    Controller.addReply(req,res).then((result)=>{
        res.status(200).json({success:true,message:'Reply added successfully',data:result})
    }).catch(err=>{
        res.status(400).json({success:false,message:'error on adding reply',data:err})
    })
}))
route.put('/comment/editreply/:postid/:commentid/:repid',((req,res)=>{
    Controller.editReplyComment(req,res).then((result)=>{
        res.status(200).json({success:true,message:'Reply Updated Successfully',data:result})
    }).catch(err=>{
        res.status(400).json({success:false,message:'error on adding reply',data:err})
    })
}))
route.delete('/comment/deletereply/:postid/:commentid/:repid',((req,res)=>{
    Controller.deleteReplyComment(req,res).then((result)=>{
        res.status(200).json({success:true,message:'Reply Deleted Successfully',data:result})
    }).catch(err=>{
        res.status(400).json({success:false,message:'error on adding reply',data:err})
    })
}))
module.exports=route