const Admindb = require('../Model/admin')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const otpdb=require('../Model/otp')
require("dotenv").config()
const Emailsend=require('../Middlewares/emailsend')
const AllAdmin = ((req,res) => {
    return new Promise((resolve, reject) => {
        Admindb.find().then((result) => {
            resolve(result)
        }).catch((err) => {
            console.log(err);
            reject(err)
        })
    })
})
const AdminRegister = ((req, res) => {
    return new Promise((resolve, reject) => {
        Admindb.findOne({ Email: req.body.email }).then(async (Admin) => {
            if (Admin) {
                reject({ Success: false, message: "Admin Already exixts", data: Admin })
            } else {
                const hashPassword = await bcrypt.hash(req.body.password, 10)
                const Admin = new Admindb({
                    Name: req.body.name,
                    Email: req.body.email,
                    Password: hashPassword
                })
                Admin.save(Admin).then(async (result) => {
                    console.log(Admin);
                    const id = Admin._id.toString()
                    const Adminid = ({
                        Adminid: id
                    })
                    await Admindb.findByIdAndUpdate(id, Adminid).then((data) => {
                        console.log(data);
                        resolve(result)
                    })
                }).catch(err => {
                    reject(err)
                })
            }
        })
    })
})
const verifytoken = ((req, res) => {
    return new Promise((resolve, reject) => {
        let authHeader = req.headers.authorization;
        if (authHeader == undefined) {
            return reject({ Error: true, message: "You have already loggedout or no token found" })
        }
        let token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.key, ((err, result) => {
            if (err) return reject({ Error: true, message: "Authentication failed" })
            else {
                resolve(token)
            }
        }))
    })
})
const AdminLogin=((req, res) => {
    return new Promise((resolve, reject) => {

        Admindb.findOne({ Email: req.body.email }).then((admin) => {
            if (!admin) {
                return reject({ Error: true, Message: "Email incorrect" })
            }
            if (admin) {
                const password = admin.Password
                console.log(admin);
                bcrypt.compare(req.body.password, password).then((admins) => {
                    console.log(admins);
                    if (!admins) {
                        return reject({ Error: true, Message: "Password Incorrect " })
                    }
                    if (admins) {
                        const data = {
                            name: admin.Firstname,
                            email: admin.Email
                        }
                        const token =jwt.sign(data,process.env.key,{expiresIn:'2h'}) 
                    
                        res.cookie('access-token', token, {
                            maxAge: 1000 * 60 * 15,
                            secure: true,
                            httpOnly: true,
                            sameSite: 'lax'
                        })
                        console.log(admin);
                        req.token = token
                        return resolve(admin)
                    }
                }).catch((err) => {
                    return reject(err);
                })
            }
        })
    })
})
const getadminbyid=((req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        console.log(id);
        Admindb.findById(id).then((admin) => {
            return resolve(admin)
        }).catch((err) => {
            return reject({ Error: true, Message: "Admin not found with the id " + id })
        })
    })
})
const updateAdminById = ((req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        const admin = ({  
            Name: req.body.name,
            Email: req.body.email,
        })
        Admindb.findByIdAndUpdate(id, admin).then((admins) => {
            req.name = admins.Firstname
            return resolve(admins)
        }).catch(err => {
            return reject({ Error: true, Message: "admin not found with the id " + id,err:err })
        })
    })
})
const DeleteAdmin = ((req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        Admindb.findByIdAndDelete(id).then((Admin) => {
            return resolve(Admin)
        }).catch(err => {
            return reject({ Error: true, Message: "Admin not found with the id " + id,err:err })
        })
    })
})
const adminLogout = ((req, res) => {
    return new Promise((resolve, reject) => {
        console.log(req.session);
        req.session.destroy(function (err) {
            if (err) reject('You are unable to logout now')
            else {
                return resolve('You have Logged out')
            }
        })
    })
})
const ChangePassword = (async (req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        Admindb.findById(id).then(async (Admin) => {
            const comparepassword = await bcrypt.compare(req.body.opassword, Admin.Password)
            if (!comparepassword) {
                return reject({
                    error: true,
                    message: "Current Password is incorrect"
                })
            } else {
                const hashpassword = await bcrypt.hash(req.body.npassword, 10)
                const password = {
                    Password: hashpassword
                }
                Admindb.findByIdAndUpdate(id, password).then((res) => {
                    return resolve(res)
                }).catch(err => {
                    return reject("Error while Changing the password")
                })
            }
        }).catch(err => {
            return reject({ Error: true, message: "Not found the Admin" })
        })
    })
})
const adminotpsend=((req,res)=>{
    return new Promise((resolve,reject)=>{
        Admindb.findOne({Email:req.body.email}).then((user)=>{
            console.log(user);
            if(!user){
                reject({Success:false,message:'Email is invalid'})
            }
            else{
                const otp=Math.floor(Math.random()*90000) + 100000;
                console.log(otp,"admin otp");
                Emailsend(req,otp)
                const data=new otpdb({
                    userid:user.Adminid,
                    otp:otp,
                    Name:user.Name ,
                    isAdmin:user.isAdmin
                })
                data.save(data).then((result)=>{
                    console.log(result);
                    resolve(result)
                }).catch(err=>{
                    console.log(err);
                    reject(err)
                })
            }
        })
    })
})
const adminotpverification=((req,res)=>{
    return new Promise((resolve,reject)=>{    
        otpdb.findOne({otp:req.body.otp,userid:req.body.adminid}).then(async(user)=>{
    if(!user){
        reject({Success:false,message:'otp is invalid'})
    }else{
       resolve(user)
    }
})     
    })
})
const adminforgotPassword=((req,res)=>{
    return new Promise((resolve,reject)=>{
        Admindb.findOne({Email:req.body.email}).then(async(user)=>{
            console.log(user);
            const hashPassword=await bcrypt.hash(req.body.npassword,10)
            console.log(hashPassword);
            const password={
                Password:hashPassword
            }
            console.log(password);
            const id=user._id
            Admindb.findByIdAndUpdate(id,password).then((result)=>{
                resolve(result)
            }).catch(err=>{
                reject({Success:false,message:'Error on changing password'})
            })
        })
        
    })  
})
module.exports={AdminLogin,AdminRegister,AllAdmin,getadminbyid,adminLogout,updateAdminById,DeleteAdmin,verifytoken,ChangePassword,adminforgotPassword,adminotpsend,adminotpverification}