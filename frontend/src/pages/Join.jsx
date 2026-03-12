import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Join.css";
import { useNavigate } from 'react-router-dom';
const Join = () => {
    const [roomId,setRoomId]=useState("");
    let router=useNavigate();

let handlJoin=()=>{
router(`/${roomId}`);
}
  return (
    <div>
        <nav>
        <div className="navHeader">
         <h2>VOXERA</h2> </div>
      </nav>
      <hr></hr>
      <div className='container'>
        <div className='innerBox'>
        <TextField id="outlined-basic" label="Room ID" variant="outlined" onChange={(e)=>{setRoomId(e.target.value)}} />
        <br/>
        <Button variant="contained" onClick={handlJoin} >join</Button>
        </div>
      </div>
    </div>
  )
}

export default Join;
