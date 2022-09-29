import { Container, Row, Col } from "react-bootstrap";
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


function App() {
  return (
    <div>
      <div className="margin-bottom:0">
        
        <div className="container text-center margin-left:100px">
            <img src="https://www.skit.ac.in/images/headers/skit_logo.png"/>
            <br/>
            <br/>
            <h1>Resume Atlas</h1>      
            <h3>Training & Placement Cell</h3>
            <h5>Swami Keshvanand Institute of Technology, Jaipur</h5>
          </div>
      </div>
      <Container style={{ width: "50%" }}>
        <Row>
          <Col>
          
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

                
                </Routes>
            </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
// style={{ width: "400px" }}
export default App;