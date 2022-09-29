import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isRecruiter } = useUserAuth();

  // console.log("Check user in Private: ", user);

  if (!user) {
    return <Navigate to="/" />;
  }
  if(isRecruiter(user.email)){
    return <Navigate to="/denied"/>
  }


  
  return children;
};

export default ProtectedRoute;