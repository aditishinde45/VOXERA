import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import { addToHistory } from '../../../backend/src/controllers/user.controller';
import { AuthContext } from '../context/AuthContext';

const HomeComp = () => {
const {addToUserHistory}=useContext(AuthContext);
let navigate=useNavigate();
const [meetingCode,setMeetingCode]=useState("");
let handleJoinVideoCall=async()=>{
    await addToUserHistory(meetingCode);
navigate(`/${meetingCode}`);
}


  return (
    <div>
     <div className="navbar">
        <div style={{display:"flex",alignItems:"center",}}>
            <h2>VOXERA</h2>
        </div>
        <div style={{display:"flex",alignItems:"center",}}>
            <IconButton onClick={()=>{ navigate("/history")}}>
                <RestoreIcon/>
            </IconButton>
            <p>History</p>
            <Button onClick={()=>{localStorage.removeItem("token"); navigate("/auth")}}>
                LogOut
            </Button>
        </div>
     </div>
     <div className="meetContainer">
        <div className="leftPannel">
            <h2>“Connect Face to Face, Anywhere.”</h2>
            <div style={{display:"flex",gap:"10px"}}>
                <TextField onChange={e=>setMeetingCode(e.target.value)} id='outlined-basic' label="Meeting Code" variant='outlined'></TextField>
                <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
            </div>
        </div>
        <div className="rightPannel">
        <img src="/logo3.png" alt="logo" />
     </div>
     </div>
    </div>
  )
}

export default withAuth(HomeComp);
