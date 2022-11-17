import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import Appendix from "./Appendix";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordState,setPasswordState] = useState("password")
  const [check,setCheck] = useState(false)
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      check ? navigate("/dashboard") : navigate("/home");
      // const filteredArray = Recruiters.filter(element => {
      //   if (element.email === email) {
      //     return true;
      //   }
      
      //   return false;
      // });
      
      // filteredArray.length!==0 ? navigate("/dashboard") : navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  const togglePassword = () => {
    if(passwordState==="password"){
      setPasswordState("text")
      return
    }
    else{
      setPasswordState("password")
    }
  }
  

  return (
    <>
    <Container style={{ width: "50%", marginBottom:"30%" }}>
        <Row>
          <Col>
            <Appendix/>
            <div className="p-4 box">
              <h2 className="mb-3 text-center">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>

                <InputGroup className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>


                <InputGroup className="mb-3" >
                  <Form.Control type={passwordState}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}/>
                  <Button variant="outline-secondary" id="button-addon2" onClick={togglePassword}>
                    {passwordState==="password"?<i className="far fa-eye"></i>:<i className="far fa-eye-slash" ></i>}
                  </Button>
                </InputGroup>

  
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={()=>{setCheck(!check)}}/>
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Are you a recruiter?</label>
                </div>
                <hr/>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="Submit">
                    Log In
                  </Button>
                </div>
              </Form>
              <hr />
                <div className="p-4 box mt-3 text-center">
                  Don't have an account? <Link to="/signup">Register</Link>
                  <hr/>
                  Don't have Resume <Link to="/create">Create Resume</Link>
                </div>
            </div>
            
            
          </Col>
          </Row>
          </Container>
    </>
  );
};

export default Login;