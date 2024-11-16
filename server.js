const express=require('express')
const app=express()
const http = require('http');
const  cors=require('cors')
const bodyParser = require("body-parser")
const connectdb=require('./ConnectionDB/db')
const morgan=require('morgan')
const router=require('./Routes/user')
const route=require('./Routes/post')
const routes=require('./Routes/admin')
const session = require('express-session')
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
      origin: "*", // Change to your Angular app's URL if different
 
      credentials: true // This allows cookies and session data
    },
    transports: ["websocket", "polling"] // Ensure both transport methods are allowed
  });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:"jhjhlkjbbdlkfjbwlkejblkjwbjnljnw;lvhnwl;jenbljkh",
    saveUninitialized:true,
    resave:false
}))
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('message',(data)=>{
        console.log(data,"datas");
        io.emit('message',data)
        
    })
  });
app.use(morgan('tiny'))
app.use(cors({
  origin: ["http://localhost:4200","http://localhost:5000", "https://konnectmeapi.onrender.com","https://konnectsme.netlify.app"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}))
require('dotenv').config()
app.use(router)
app.use(route)
app.use(routes)
server.listen(5000,()=>{
    console.log(`Server Listening on Port ${process.env.PORT}`);
})