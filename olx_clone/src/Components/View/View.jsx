import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { Postcontext } from '../../store/Postcontext';
import {  Firebasecontext } from "../../store/Firebasecontext";
import { collection, query,where ,getDocs} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
function View() {
const [userdetails,SetUserdetails]=useState('')
const {postdetails}=useContext(Postcontext)
const { db } = useContext(Firebasecontext);
    console.log(userdetails);
    
    const navigate=useNavigate()
useEffect(()=>{
  const fetchUserDetails = async () => {
    try {
      const citiesRef = collection(db, "olxusers");
      const q = query(citiesRef, where("id", "==", postdetails.userId)); // Ensure postdetails.userId exists
      const querySnapshot = await getDocs(q);
      
      const userData = querySnapshot.docs.map(doc => ({ id:postdetails.userId, ...doc.data() }));
     SetUserdetails(userData[0])
      
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
  fetchUserDetails()
},[db])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postdetails.imageUrl
          }
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postdetails.price
        }</p>
          <span>{postdetails.name}</span>
          <p>{postdetails.category}</p>
          <span>uploadDate:{new Date(postdetails.date).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userdetails.username}</p>
          <p>{userdetails.phone}</p>
        
        </div>
        <button   className="back-home-btn" onClick={()=>navigate('/')}>
        Back to Home
      </ button>
      </div>
    
    </div>
  );
}
export default  View
