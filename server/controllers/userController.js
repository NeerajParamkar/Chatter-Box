import { generatetoken } from "../lib/utils";
import User from "../modules/User";
import bcrypt from 'bcryptjs'
export const signup = async (req,res)=>{
  const {fullName,email,password,bio}=req.body;

  try {
    if(!fullName || !email || !password || !bio){
      return res.json({success:false,message:"Missing Details"}); 
    }
    const user=await User.findOne(email);
    if(user){
      return res.json({success:false,message:"Account already exists"}); 
    }

    const salt=await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    const newUser=await User.create({
      fullName,email,password:hashedpassword,bio
    })

    const token=generatetoken(newUser._id)
    res.json({success:true,userData:newUser,token,message:"Account Created Successfully"})
  } catch (error) {
    res.json({success:false,message:"Error in createing Account"})
  }
}

export const login=async (req,res)=>{
  const {email,password}=req.body;
  try {
    if(!email || !password ){
      return res.json({success:false,message:"Missing Details"}); 
    }
    
    const userData=await User.findOne({email});
    const isPasswordCorrect = await bcrypt.compare(password,userData.password);
    if(!isPasswordCorrect){
      return res.json({success:false,message:"Invalid Password"}); 
    }
    const token=generatetoken(userData._id)
    res.json({success:true,userData,token,message:"Login Successfully"})
  } catch (error) {
    res.json({success:false,message:"Error in createing Account"})
  }
}
export const checkAuth=(req,res)=>{
  res.json({success:true,user:req.user})
}