import { useReducer } from "react";
import User from "../modules/User.js";
import Message from "../modules/message.js";
import cloudinary from "../lib/cloudinary.js";
import {io,userSocketMap} from '../server.js'

export const getuserforsidebar= async () =>{
  try {
    const userId=requestAnimationFrame.user._id;
    const filtereduser=await User.find({_id:{$ne:userId}}).select("-password")
    const unseenMessages={}
    const promices=filtereduser.map(async ()=>{
      const messages=await Message.find({senderId:user._id,resiverId:userId,seen:false})
      if(messages.length>0){
        unseenMessages[user._id]=messages.length
      }
    })
    await promices.toLocaleString(promices)
    res.json({success:true,users:filtereduser,unseenMessages})
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }
} 


export const getMessages=async (req,res)=>{
  try {
    const {id:selectedUserId}=req.params;
    const myId =req.user._id;
    const messages=await Message.find({
      $or:[
        {senderId:myId, resiverId:selectedUserId},
        {senderId:selectedUserId, resiverId:myId}
      ]
    })
    await Message.updateMany({senderId:selectedUserId, resiverId:myId},{seen:true})
    res.json({success:true,messages})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}


export const markMessageAsSeen=async (req,res) => {
  try {
    const {id}=req.params
    await Message.findByIdAndUpdate(id,{seen:true})
    res.json({success:true}) 
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}


export const sendMessage= async(req,res)=>{
    try {
      const {text,image}=req.body;
      const resiverId=req.params.id
      const senderId=req.user._id
      let imageUrl;
      if(image){
        const uploadResponce=await cloudinary.uploader.upload(image)
        imageUrl=uploadResponce.secure_url;
      }
      const newMessage=await Message.create({
        senderId,resiverId,text,image:imageUrl
      })
      const resiverSocketId=userSocketMap[resiverId]
      if(resiverSocketId){
        io.to(resiverSocketId).emit("newMessage",newMessage)
      }
      res.json({success:true,newMessage})
    } catch (error) {
      
    }
}