import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const withAuth=(WrappedComponet)=>{
     const AuthComponent=(props)=>{
        const router=useNavigate();
        const isAuthenticated=()=>{
          if(localStorage.getItem("token")){
            return true;
          }else{
            return false;
          }
        }
        useEffect(()=>{
            if(!isAuthenticated()){
                router("/auth");
            }
        },[]);
        return <WrappedComponet {...props}/>
     }
     return AuthComponent;
}
export default withAuth;