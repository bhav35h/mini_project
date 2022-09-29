import React from 'react'
import { Navigate } from "react-router-dom";

import { useUserAuth } from "../context/UserAuthContext";

const Protected = ({children}) => {
    const { user, isRecruiter} = useUserAuth();
    
    if(!user){
        return <Navigate to="/" />;
    }
    if(!isRecruiter(user.email)){
        return <Navigate to="/denied"/>
    }
    return children;
}

export default Protected