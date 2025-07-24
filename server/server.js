import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';

const app=express();
await connectDB();
const server = http.createServer(app);
app.use(express.json({limit:"4mb"}));
app.use(cors());

app.use('/',(req,res)=>{
  res.send("This is server");
})
app.use('/api/auth',userRouter)

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`Server is live on http://localhost:${PORT}`)
})