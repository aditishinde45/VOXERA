import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
//import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { AuthContext } from "../context/AuthContext";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function Auth() {
  const navigate = useNavigate();
    const [username,setUsername]=React.useState("");
    const [name,setName]=React.useState("");
    const [passward,setPassward]=React.useState("");
    const[formState,setFormState]=React.useState(0);
    const[error,setError]=React.useState("");
    const [message,setmessage]=React.useState("");

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {handleRegister,handleLogin}=React.useContext(AuthContext);

  let handleAuth=async()=>{
    try{
      if(formState==0){
        let result=await handleLogin(username,passward);
        console.log(result);
        setmessage(result);
        setOpen(true);
        setError("");
        setPassward("");
      }
      if(formState==1){
        let result=await handleRegister(name,username,passward);
        console.log(result);
        setmessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassward("");
        setUsername("");
        setName("");
      }
    }catch(e){
      console.log(e);
      let message = e?.response?.data?.message || "Something went wrong";
      setError(message);      
    }
  }
  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card variant="outlined">
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        </Box>
        <div>
        <Button variant={formState==0?"contained":""} onClick={()=>{setFormState(0)}}>
          Sign in
        </Button>
        <Button variant={formState==1?"contained":""} onClick={()=>{setFormState(1)}}>
          sign up
        </Button>
        </div>
        <Box
          component="form"
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
          {formState==1?
          <FormControl>
            <FormLabel htmlFor="fullname">Full Name</FormLabel>
            <TextField
              id="fullname"
              type="fullname"
              name="fullname"
              autoComplete="fullname"
              required
              fullWidth
              value={name}
              variant="outlined"
              onChange={(e)=>setName(e.target.value)}
            />
          </FormControl>:<></>}
          <FormControl>
            <FormLabel htmlFor="Username">Username</FormLabel>
            <TextField
              id="Username"
              type="Username"
              name="Username"
              autoComplete="Username"
              required
              fullWidth
              value={username}
              variant="outlined"
              onChange={(e)=>setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="Passward">Password</FormLabel>
            <TextField
              id="Passward"
              type="password"
              name="Passward"
              autoComplete="Passward"
              required
              fullWidth
              value={passward}
              variant="outlined"
              onChange={(e)=>setPassward(e.target.value)}
            />
          </FormControl>
          <p style={{color:"red"}}>{error}</p>
          {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
          <Button type="button" fullWidth variant="contained" onClick={handleAuth}>
            {formState==0 ?"login":"Register"}
          </Button>
        </Box>
      </Card>
      <Snackbar
      open={open}
      autoHideDuration={4000}
      message={message}
      />
    </Box>
  );
}
