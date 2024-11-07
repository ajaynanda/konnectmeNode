const nodemailer = require('nodemailer')
const hbs = require("nodemailer-express-handlebars")
const path = require("path")
const Emailsend = (async(req,passwordgen)=>{
  console.log(passwordgen);
  try{

  
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
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

 module.exports = Emailsend