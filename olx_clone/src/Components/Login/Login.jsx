import React ,{useState,useContext,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import {Firebasecontext} from '../../store/Firebasecontext';
import { signInWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth';
function Login() {
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const {auth}= useContext(Firebasecontext);
 const navigate=useNavigate()

const handlelogin=(e)=>{
e.preventDefault()

signInWithEmailAndPassword(auth, email, password)
  .then(() => {

    // Signed in 
    navigate('/')
    // ...
  })
  .catch((error) => {
    alert(error)
  });
}

useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    // console.log('Current User:', currentUser);
  
          if(currentUser) {
            navigate('/' ,{ replace: true })
          }                          
  });


  return () => unsubscribe();
}, [auth,navigate]);


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email} onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password} onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
     
      </div>
    </div>
  );
}

export default Login;


