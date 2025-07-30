import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {Server} from "socket.io"
const app=express();
const server = http.createServer(app);
export const io=new Server(server,{
  cors:{origin:"*"}
})

export const userSocketMap={}
io.on("connection",(socket)=>{
  const userId =socket.handshake.query.userId
  console.log("User connected ",userId)

  if(userId) userSocketMap[userId]=socket.id

  io.emit("getOnlineUsers",Object.keys(userSocketMap))
  socket.on("disconnect",()=>{
    console.log("User disconnected ",userId)
    delete userSocketMap[userId]
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
  })
})

app.use(express.json({limit:"4mb"}));
app.use(cors());
await connectDB();
app.use('/',(req,res)=>{
  res.send("<h1>This is server</h1>");
})
app.use('/api/auth',userRouter)
app.use('/api/messages',messageRouter)

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log(`Server is live on http://localhost:${PORT}`)
})