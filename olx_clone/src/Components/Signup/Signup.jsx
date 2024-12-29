import React, { useState, useContext } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import {Firebasecontext} from "../../store/Firebasecontext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { auth ,db} = useContext(Firebasecontext);  // Now you're accessing auth directly from context
  const navigate=useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !phone || !password) {
      alert("Validation failed. Please fill all the fields.");
      return; 
    }

    const usernamePattern = /^[A-Za-z]+$/;
    if (!usernamePattern.test(username)) {
      alert("Validation failed. Username must contain only letters.");
      return;
    }
    

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Validation failed. Please enter a valid email address.");
      return;
    }

  
    if (phone.length !== 10) {
      alert("Validation failed. Please enter a valid phone number (10 digits).");
      return;
    }

    
    if (password.length < 8) {
      alert("Validation failed. Password must be at least 8 characters long.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
    
        console.log(userCredential);
        
      
        return updateProfile(user, { displayName: username }).then(() => user);
      })
      .then((user) => {
        // Add user into firestore
        return addDoc(collection(db, "olxusers"), {
          id: user.uid,
          username,
          email,
          phone,
        });
      })
      .then(() => {
        console.log("User created and details added to Firestore successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during signup:", error.message);
        alert(error.message)
      });
  };


  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo" />
        <form onSubmit={handlesubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>login</Link>
      </div>
    </div>
  );
}
