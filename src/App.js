
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Protected from "./components/Protected";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Unauthorized from "./components/Unauthorized";
import Dashboard from "./components/Dashboard";
import Create from "./Create";



function App1() {
  console.log(process.env)
  return (
    <div>
      
      
          
            <UserAuthContextProvider>
            <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <Protected>
                      <Dashboard/>
                    </Protected>
                  }
                />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/denied" element={<Unauthorized/>}/>

                <Route path="/create" element={<Create/>}/>
                </Routes>
            </UserAuthContextProvider>
          
    </div>
  );
}

export default App1;