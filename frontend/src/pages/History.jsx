import React, { useContext, useEffect, useState } from 'react'
import {AuthContext} from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import withAuth from "../utils/withAuth.jsx";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HomeIcon from '@mui/icons-material/Home';
//import * as React from 'react';
import Box from '@mui/material/Box';
//import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const History = () => {

    const {getHistoryUser}=useContext(AuthContext);
    const [meetings,setMeeting]=useState([]);
    const routeTo=useNavigate();
    useEffect(()=>{
        const fetchHistory=async()=>{
            try{
                const history=await getHistoryUser();
                setMeeting(history);
            }catch(e){
               throw e;
                //implement snackbar
            }
        }
        fetchHistory();
    },[]);

    let formatDate=(date)=>{
      const DateString=new Date(date);
      const day=DateString.getDate().toString().padStart(2,"0");
      const month=(DateString.getMonth()+1).toString().padStart(2,"0");
      const year=DateString.getFullYear();
      return `${day}/${month}/${year}`;
    }
  return (
    <div>
       <IconButton onClick={()=>{routeTo("/home")}}>
              <HomeIcon/>
            </IconButton>
      {meetings.length!=0?
        meetings.map((e,i)=>{
          return(
            <>
            <Card key={i} variant="outlined" >
            <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        code:{e.meetingcode}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        Date:{formatDate(e.createdAt)}
      </Typography>
    </CardContent>
            </Card>
            </>
          )
        })
      :<p>No meetings found.</p>}
    </div>
  )
}

export default withAuth(History);
