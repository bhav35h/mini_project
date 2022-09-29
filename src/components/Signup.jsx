import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import { addDoc,collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid"
const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name,setName] = useState("")

  
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const[imageUpload,setImageUpload]=useState(null);

  const uploadFile = () => {
    if(imageUpload==null) return
    const imageRef = ref(storage,`resume/${imageUpload.name+v4()}`)
    uploadBytes(imageRef,imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((rurl)=>{
        addUser(rurl);
      })
    })
  }
  const addUser = async (rurl) => {
    try {
      const docRef = await addDoc(collection(db, "students"), {
        name:name,
        email:email,
        url:rurl
      });
      await updateDoc(docRef,{id:docRef.id})
      console.log("Document", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      // console.log("Main cheez",user);
      uploadFile();
      
      navigate("/");
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3 text-center" >Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="name"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formFile">
          <label htmlFor="formFile" className="form-label">Upload Resume in .pdf,.docx format</label>
          <input className="form-control" type="file" accept=".pdf,.docx"  id="formFile"
            onChange={(e)=>{
              setImageUpload(e.target.files[0])
            }}
          />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;