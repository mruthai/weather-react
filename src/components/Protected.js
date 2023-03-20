import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Protected(props){
    const { user } = useContext(AuthContext)
    if(!user.checked){
        return <p>Loading</p>
    }
    if (!user.loggedIn){
        return <Navigate to="/"/>
    } 
    
    else {
        <Navigate to="/profile"/>
        return props.children
    }
}