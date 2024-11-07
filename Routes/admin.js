const routes=require('express').Router()
const Controller=require('../Controller/AdminController')
routes.post('/adminregister',((req,res)=>{
    Controller.AdminRegister(req,res).then((result)=>{
        res.status(200).json({succes:true,message:'admin registered',data:result})
    }).catch(err=>{
        res.status(400).json(err)
    })
}))
routes.get('/adminlogin',((req,res)=>{
    Controller.AdminLogin(req,res).then((result)=>{
        res.status(200).json({
            Success:true,
            message:'AdminLogged in',
            token:req.token,
            admin:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(400).json(err)
    })
}))
routes.get('/getadminbyid/:id',((req,res)=>{
    Controller.verifytoken(req,res).then(()=>{
    Controller.getadminbyid(req,res).then((result)=>{
        res.status(200).json({
            Success:true,
            message:'Admin data by id',
            data:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(400).json(err)
    })
}).catch(err=>{
    res.status(401).json(err)
})
}))
routes.put('/updateadminbyid/:id',((req,res)=>{
    Controller.verifytoken(req,res).then(()=>{
    Controller.updateAdminById(req,res).then((result)=>{
        console.log(result);
        res.status(200).json({
            Success:true,
            message:"Update the document OF ADMIN",
            data:result
        })
    }).catch(err=>{
        res.status(400).json({Success:false,message:'Error',err:err})
    })

}).catch(err=>{
    res.status(401).json(err)
})
}))
routes.delete('/deleteadminbyid/:id',((req,res)=>{
    Controller.verifytoken(req,res).then(()=>{
    Controller.DeleteAdmin(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'aDMIN Deleted Successfully',data:result})
    }).catch(err=>{
        res.status(400).json({Success:false,message:'Error',err:err})
    })
}).catch(err=>{
    res.status(401).json(err)
})
}))

routes.get('/adminlogout',((req,res)=>{
    Controller.verifytoken(req,res).then(()=>{
        console.log('Token Accessed');
        Controller.adminLogout(req,res).then((result)=>{
            res.status(200).json({Success:true,message:'admin has Logged out Sucessfully',data:result})
        }).catch(err=>{
            res.status(400).json({Success:true,message:'Error on logging out'})
        })
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
routes.get('/changeadminpassword/:id',((req,res)=>{
    Controller.verifytoken(req,res).then(()=>{
        console.log('Token Accessed');
        Controller.ChangePassword(req,res).then((result)=>{
            res.status(200).json({Success:true,message:'pASSWORD CHANGED',data:result})
        }).catch(err=>{
         
            res.status(400).json(err)
        })
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
routes.get('/adminforgotpassword',((req,res)=>{
  
    Controller.adminforgotPassword(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'Password Changed sucessfully',data:result})
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
routes.get('/adminotpverify',((req,res)=>{
  
    Controller.adminotpverification(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'otp verification sucessfull',data:result})
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
routes.get('/adminotpsend',((req,res)=>{
    Controller.adminotpsend(req,res).then((result)=>{
        res.status(200).json({Success:true,message:'Email has been sent sucessfully',data:result})
    }).catch(err=>{
        res.status(401).json(err)
    })
}))
module.exports=routes