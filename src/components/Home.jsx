import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid"
import useUser from "../custom-hooks/User";
import { useEffect } from "react";




const Home = () => {
  const { user,logOut } = useUserAuth();
  // const [students,setStudents] = useState([])
  // const [curr,setCurr] = useState({})
  // const [docs,setDocs] = useState([])
  const navigate = useNavigate();
  // const usersCollectionRef = collection(db,"students")
  
  const curr =  useUser(user.email)

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  


  const[imageUpload,setImageUpload]=useState(null);
  const uploadFile = () => {
    if(imageUpload==null){
      alert("No image selected")
      return 
    }
    const imageRef = ref(storage,`resume/${imageUpload.name+v4()}`)
    uploadBytes(imageRef,imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        updateResume(curr.id,url)
      })
    })
  }
  const updateResume = async (id,resumeUrl) => {
    const studentDoc = doc(db,"students",id)
    console.log("studentdoc",studentDoc)
    const newField = {url:resumeUrl}
    await updateDoc(studentDoc,newField)
    // updateRefresh()

    alert("It can take few minutes to save changes..")
    
  }
  
  

  return (
    <>
      <div id="button">
        <Button variant="danger"  onClick={handleLogout}>Logout</Button>
      </div>
      <div className="p-4 box mt-3 text-center border">
        Hello Welcome <br />
        {user && user.email} <br/>
        <a href={curr?.url} target="_blank" rel="noreferrer">View Resume</a>
      </div>

      <br />
      <br />
      <br />
      <div className="d-grid gap-2">
      <input 
        className="form-control" 
        type="file" 
        accept=".pdf,.docx"  
        id="formFile"
        onChange={(e)=>{setImageUpload(e.target.files[0])}}
      />
        <Button variant="primary" onClick={uploadFile}>
          Update Resume
        </Button>
      </div>
      
    </>
  );
};

export default Home;

// setSid(findId())
// updateResume(sid,resumeUrl)