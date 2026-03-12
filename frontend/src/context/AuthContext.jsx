import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import httpStatus from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/user",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const router = useNavigate();

  const handleRegister = async (name, username, passward) => {
    try {
      let request = await client.post("/register", {
        name,
        username,
        passward,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (e) {
      throw e;
    }
  };
  
  const handleLogin=async(username,passward)=>{
    try{
        let request=await client.post("/login",{
            username:username,
            passward:passward
        });
        if(request.status==httpStatus.OK){
          localStorage.setItem("token",request.data.token);
          router("/home");
          return request.data.message;
        }
        
    }catch(e){
  throw e;
    }
  }

const getHistoryUser=async()=>{
try{
let request=await client.get("/get_all_activity",{
  params:{
    token:localStorage.getItem("token")
  }
});
return request.data;
}catch(e){
throw e;
}
}

// context/AuthContext.js
const addToUserHistory = async(meetingCode) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    
    const request = await client.post("/addToHistory", {
      token,
      meetingCode
    });
    return request.data;
  } catch (error) {
    // Log the full error for debugging
    console.error("Error adding to user history:", error);
    
    // Extract the error message from the response if available
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "Failed to add to history";
    
    throw new Error(errorMessage);
  }
}


  const data = {
    userData,
    setUserData,
    getHistoryUser,
    addToUserHistory,
    handleRegister,
    handleLogin
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
