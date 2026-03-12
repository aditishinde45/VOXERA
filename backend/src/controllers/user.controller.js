import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt,{hash} from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";const register=async(req,res)=>{
    const {name,username,passward,}=req.body;
    try{
       const existinguser=await User.findOne({username});
       if(existinguser){
        return res.status(httpStatus.CONFLICT).json({
          message: "User already exists!"
        });
        
       }
       const hashedpassward=await bcrypt.hash(passward,10);
       const newUser=new User({
        name:name,
        username:username,
        passward:hashedpassward
       });
       await  newUser.save();
       res.status(httpStatus.CREATED).json({message:"user registred !"});
    }catch(e){
        res.json({messsage:`Ooops.. something went wrong ! ${e}`});
    }
}

const login = async (req, res) => {
    const { username, passward } = req.body;
  
    // 1️⃣ Validation
    if (!username || !passward) {
      return res
        .status(400)
        .json({ message: "Please enter details!" });
    }
  
    try {
      // 2️⃣ Find user
      const user = await User.findOne({ username });
  
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found!" });
      }
  
      // 3️⃣ Password check
      const isMatch = await bcrypt.compare(passward, user.passward);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid credentials!" });
      }
  
      // 4️⃣ Token generation
      const token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      // 5️⃣ Success (ONLY response)
      return res.status(httpStatus.OK).json({
        message: "Login successful!",
        token
      });
  
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Oops... something went wrong!",
          error: error.message,
        });
    }
  };
  
const getUserHistory=async(req,res)=>{
const {token}=req.query;
console.log(token);
try{
  const user= await User.findOne({token:token});
  const meetings= await Meeting.find({user_id:user.username});
  res.json(meetings);
}catch(e){
  res.json({message:`something went wrong ${e}`});
}}

const addToHistory = async (req, res) => {
  const { token, meetingCode } = req.body;
  
  try {
    // Validate input
    if (!token || !meetingCode) {
      return res.status(400).json({ 
        message: "Token and meeting code are required" 
      });
    }
    
    // Find user
    const user = await User.findOne({ token });
    
    if (!user) {
      return res.status(404).json({ 
        message: "User not found!" 
      });
    }
    
    // Create and save meeting
    const newMeeting = new Meeting({  user_id: user.username, 
      meetingcode: meetingCode
    });
    
    await newMeeting.save();
    
    res.status(httpStatus.CREATED).json({ 
      message: "Added code to history!" 
    });
  } catch (error) {
    console.error("Add to history error:", error);
    
    // Send specific error message
    res.status(500).json({ 
      message: `Something went wrong: ${error.message}` 
    });
  }
}


export {login ,register,getUserHistory,addToHistory};