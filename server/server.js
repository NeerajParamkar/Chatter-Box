import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js';

const app=express();
const server = http.createServer(app);
app.use(express.json({limit:"4mb"}));
app.use(cors());

app.get('/',(req,res)=>{
  res.send("This is server");
})

await connectDB();
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log("Server is live")
})