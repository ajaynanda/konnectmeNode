const router=require('express').Router()
const Controller=require('../Controller/UserController')
const multer = require('multer');
const upload = multer();
router.get('/alluser',((req,res)=>{
    Controller.Alluser(req,res).then((result)=>{
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err);
        res.status(400).json(err)
    })
}))
router.post('/userregister',((req,res)=>{
    Controller.userRegister(req,res).then((result)=>{
        res.status(200).json({ Success: true, message: "User Registered Successfully", data: result })
    }).catch(err=>{
        console.log(err);
        res.status(400).json(err)
    })
}))
router.get('/verifyemail',((req,res)=>{
    Controller.emailVerified(req,res).then((result)=>{
        // res.status(200).send({Success:true,message:result})
        res.status(200).render('emailverifiedbrowser', {
            title: 'Konnectme',
            message: result,
        });
    }).catch((err)=>{
        // res.status(400).json({Success:false,err:err})
        res.status(400).render('emailverifiedbrowser', {
            title: 'Konnectme',
            message: err,
        });
    })
}))
router.post('/sendemailtoverify',upload.none(),(req,res)=>{
    Controller.sendEmailToVerify(req,res).then((result)=>{
        res.status(200).json({Success:true,message:result})
    }).catch((err)=>{
        res.status(400).json(err)
    })
})
router.post('/userlogin',((req,res)=>{
    Controller.userLogin(req,res).then((result)=>{
        res.status(200).json({
            Success:true,
            message:'UserLogged in',
            token:req.token,
            user:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(400).json(err)
    })
}))
router.get('/userbyid/:id',((req,res)=>{
 
    Controller.getuserbyid(req,res).then((result)=>{
        res.status(200).json({
            Success:true,
            message:'User data by id',
            data:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(400).json(err)
    })
}))
router.put('/updateuserbyid/:id',((req,res)=>{
  
    Controller.updateUserById(req,res).then((result)=>{
        console.log(result,"upated");
        res.status(200).json({
            Success:true,
            message:"Update the document",
            data:result
        })
    }).catch(err=>{
        res.status(400).json({Success:false,message:'Error',err:err})
    })


}))
router.delete('/deleteuserbyid/:id',((req,res)=>{
    Controller.verifytoken(req,res).then(()=>{
    Controller.Deleteuser(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'User Deleted Successfully',data:result})
    }).catch(err=>{
        res.status(400).json({Success:false,message:'Error',err:err})
    })
}).catch(err=>{
    res.status(401).json(err)
})
}))

router.get('/userlogout',((req,res)=>{
    Controller.verifytoken(req,res).then(()=>{
        console.log('Token Accessed');
        Controller.userLogout(req,res).then((result)=>{
            res.status(200).json({Success:true,message:'User has Logged out Sucessfully',data:result})
        }).catch(err=>{
            res.status(400).json({Success:true,message:'Error on logging out'})
        })
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
// router.get('/Changepassword/:id',((req,res)=>{
//     Controller.verifytoken(req,res).then(()=>{
//     Controller.ChangePassword(req,res).then((result)=>{
//         res.status(200).json({Success:true,message:'Password Changed Sucessfully'})
//     }).catch(err=>{
//         res.status(401).json(err)
//     })
// }).catch(err=>{
//     res.status(401).json(err)
// })
// }))
router.post('/Changepassword/:id',((req,res)=>{
   
    Controller.ChangePassword(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'Password Changed Sucessfully'})
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
router.get('/forgotpassword',((req,res)=>{
  
    Controller.forgotPassword(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'Password Changed sucessfully',data:result})
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
router.get('/otpverify',((req,res)=>{
  
    Controller.otpverification(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'otp verification sucessfull'})
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
router.post('/otpsend',((req,res)=>{
    Controller.otpsend(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'Email has been sent sucessfully',data:result})
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
router.get('/userfollow/:userid/:id',((req,res)=>{
    Controller.userfollow(req,res).then((result)=>{
        console.log(result,"resulted");
        res.status(200).json({Success:true,message:"user has been followed",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
router.get('/userunfollow/:userid/:id',((req,res)=>{
    Controller.userunfollow(req,res).then((result)=>{
        res.status(200).json({Success:true,message:"user has been unfollowed",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
router.delete('/removefollower/:userid/:followerid',((req,res)=>{
    Controller.removeFollower(req,res).then((result)=>{
        res.status(200).json({Success:true,message:"user has been removed",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
router.post('/addnewchat/:userid/:repid',((req,res)=>{
    Controller.addNewChat(req,res).then((result)=>{
        res.status(200).json({Success:true,message:"New chat added",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
router.get('/chatlist/:userid',((req,res)=>{
    Controller.chatList(req,res).then((result)=>{
        res.status(200).json({Success:true,message:"New chat added",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
router.post('/sendmessage/:chatid',upload.none(),((req,res)=>{
    Controller.sendMessage(req,res).then((result)=>{
        res.status(200).json({Success:true,message:"New message send",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
router.get('/messagechathistory/:chatid',((req,res)=>{
    Controller.messageChatHistory(req,res).then((result)=>{
        res.status(200).json({Success:true,message:"New chat added",data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}))
module.exports=router