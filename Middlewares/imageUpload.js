const multer = require("multer")

const Storage= multer.diskStorage({
    destination:'../Angular/src/assets',
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }  
})
const upload = multer({
    storage:Storage,
    limits : {fileSize : 20000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
          cb(null, true);
        } else {
          cb(null, false);
        return cb({error:true,message:'Only .png, .jpg,mp4,mkv  and .jpeg format allowed!'})
        }
      }
}).fields([{name:"img"}])


module.exports =upload