import React, { useEffect,useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import { BrowserRouter as Router, Routes, Route ,} from 'react-router-dom'; // Ensure Routes is included
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import View from './Pages/ViewPost';
import { AuthContext,Firebasecontext} from './store/Firebasecontext';
import Create from './Pages/Create'
import Posts from './store/Postcontext';

function App() {
  const {setUser}=useContext(AuthContext)
  const { auth } = useContext(Firebasecontext); 
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
       
      } else {
      // alert('user not here')
      }
    });
  
  },[])

  return (
    <div>
      <Posts>
      <Router>
        <Routes> 
          <Route path='/' element={<Home />} /> 
          <Route path='/signup' element={<Signup />} /> 
          <Route path='/login' element={<Login />}/> 
          <Route path='/create'  element={<Create/>} />
          <Route path='/view'  element={<View/>} />
        </Routes>
   
      </Router>
      </Posts>
    </div>
  );
}

export default App;
