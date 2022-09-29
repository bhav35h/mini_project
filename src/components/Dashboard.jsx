import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import { collection,getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';

const Dashboard = () => {
  const usersCollectionRef = collection(db,"students")
  const [users,setUsers] = useState([])
  const [temp,setTemp] = useState([])
  const [searchTerm,setSearchTerm] = useState("")

  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const reset = () => {
    setSearchTerm("")
    setUsers(temp)
    console.log(users)
  }
  const runSearch = () => {
    const filtered_users = users.filter(user=>user.name.toLowerCase().includes(searchTerm))
    setUsers(filtered_users)
  }
  useEffect(()=>{
    
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
      setTemp(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    };
    getUsers();
    
    
  
  },[])
  return (
    <div className="container">
      <button type="button" className='btn btn-danger' onClick={handleLogout}>Logout</button>
      <div className="text-center mb-5">
      <h3>Students</h3>
      <br />
      <div id="b">
        <input type="text" placeholder='Search Student' value={searchTerm} onChange={
          (e)=>setSearchTerm(e.target.value.toLowerCase())
        }/>
        
        <button type='button' className='a btn btn-success' onClick={runSearch}>Search</button>
        <button type='button' className='a btn btn-primary' onClick={reset}>Clear</button>
        
        </div>
      </div>
 
    {users.map((user)=>{
      return (
        <div key={user.email} className="card mb-3">
          <div className="card-body">
            <div className="d-flex flex-column flex-lg-row">
              <div className="row flex-fill">
                <div className="col-sm-5">
                  <h4 className="h3">{user.name}</h4>
                </div>
                <div className="col-sm-4 py-2">
                  <h4 key={user.email}>{user.email}</h4>
                </div>
                <div className="col-sm-3 text-lg-end">
                  <a href={user.url} target="_blank" className="btn btn-primary stretched-link" rel="noreferrer">View Resume</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })}
  </div>
  )
}

export default Dashboard