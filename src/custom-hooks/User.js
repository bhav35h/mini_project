import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from "react";
import { db } from "../firebase";

const useUser = (email) => {
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
        getDocs(collection(db,"students")).then((data)=>{
            const filtered = data.docs.filter((doc)=>doc.data().email===email)
            setUserData(filtered[0]?.data())
            console.log("udta",userData)
        })
    //   const getUsers = async () => {
        
    //     const data = await getDocs(collection(db,"students"))
    //     const filtered = await data.docs.filter((doc)=>doc.data().email===email)
    //     console.log("filtered",filtered)
    //     if(filtered.length!==0){
    //         setUserData(filtered[0].data())
    //         console.log("udta",userData)

    //     }
    //   }
    //   getUsers();
      
    }, [email]);
    
    return userData;
  };
export default useUser;