const  crypto  = require('crypto');
const nodemailer = require('nodemailer')
const hbs = require("nodemailer-express-handlebars")
const path = require("path");
const Userdb = require('../Model/user');
const Emailsends = (async(req,passwordgen)=>{
  console.log(passwordgen);
  try{

  
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: process.env.Email,
          pass:process.env.Password,
        },
      });
      const hbsoptions = {
        viewEngine:{
            extName:'.handlebars',
            partialsDir:path.resolve('./views'),
            defaultLayout:false,
      },
        viewPath:path.resolve('./views'),
        extName:'.hbs'
    }
      transporter.use('compile',hbs(hbsoptions))
    const options = {
        from:process.env.Email, // sender address
        to: req.body.email, // list of receivers
        subject: "Verification OTP", // Subject line
        text: "Your 6 Digit One Time Password has been send.", // plain text body
        attachments:[
            {filename:'konnectme.jpg',path:'./public/konnectme.jpg'}
        ],
        template:'index',
        context:{
            password:passwordgen
        },
    }
     const mailresponse =   transporter.sendMail(options);
     if(await mailresponse){
         console.log(mailresponse);
     }else{
         console.log("error in sending email");
     }
    }catch(error){
      console.log(error,"error in mail")
    }
})
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
const AccountVerification = (async(req,res)=>{
  try{
    console.log(req.body.email,"email");   
    const token = generateToken(); // Generate the token 
    // const verificationLink = `http://localhost:5000/verifyemail?token=${token}`; 
    const verificationLink = `https://konnectsmeapi.onrender.com/verifyemail?token=${token}`;
  await Userdb.updateOne({Email:req.body.email},{verificationToken:token,verified:false})
  // console.log(User,"ijh");  
  console.log(process.env.Email,process.env.password,"cref")
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: process.env.Email,
          // pass:process.env.Password,
          pass:'lpdf rxia ptvi ergv'
        },
      });
      console.log(transporter,"cref4")
      const hbsoptions = {
        viewEngine:{
            extName:'.handlebars',
            partialsDir:path.resolve('./views'),
            defaultLayout:false,
      },
        viewPath:path.resolve('./views'),
        extName:'.hbs'
    }
    console.log(hbsoptions,"cref5")
      transporter.use('compile',hbs(hbsoptions))
  
    const options = {
        from:process.env.Email, // sender address
        to: req.body.email, // list of receivers
        subject: "Email Verification", // Subject line
        text: "To Proceed the creation of Account Please do verify your Email.Check your Email inbox", // plain text body
        attachments:[
            {filename:'konnectme.jpg',path:'./public/konnectme.jpg'}
        ],
        template:'emailverify',
        context:{
            verificationLink:verificationLink,

        },
    }
    console.log(options,"cref6")
     const mailresponse =   transporter.sendMail(options);
     console.log(mailresponse,"res");
     
     console.log(process.env.Email,process.env.password,"cref8")
     if(await mailresponse){
         console.log('mailresponse');
     }else{
         console.log("error in sending email");
     }
    }catch(error){
      console.log(process.env.Email,process.env.password,"cref error")
      console.log(error,"error in mail")
    }
})
 module.exports = {Emailsends,AccountVerification}