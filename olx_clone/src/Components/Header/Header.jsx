import React, { useContext ,useEffect} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, Firebasecontext } from '../../store/Firebasecontext';
import { signOut ,onAuthStateChanged} from 'firebase/auth';
function Header() {
const {user,setUser }=useContext(AuthContext)
const {auth}= useContext(Firebasecontext);
useEffect(() => {
  // Listen for authentication state changes
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    // console.log('Current User:', currentUser);
    setUser(currentUser); // Set the user when auth state changes
  });

  // Cleanup the listener when the component unmounts
  return () => unsubscribe();
}, [auth, setUser]);
const handlelogout=()=>{
  signOut(auth)
  .then(() => {
    setUser(null)
    alert('Successfully logged out!');
    navigate('/login');
  })
  .catch((error) => {
    console.error('Logout failed:', error.message);
    alert('Error during logout: ' + error.message);
  });
}
const navigate=useNavigate()
const createnew=()=>{
  navigate('/create')
}
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div>
    
        {!user && (
  <Link to="/login" style={{ textDecoration: 'none' }}>
    <div className="loginPage">
      <span>Login</span>
      <hr />
    </div>
  </Link>
)}
{user && (
  <div className="loginPage" >
    <span>{user.displayName}</span>
  
    <span
    style={{
      fontSize: '14px',
      color: '#f00',
      cursor: 'pointer',
      marginLeft: '10px',
      textDecoration: 'underline'
    }}
     onClick={handlelogout}
  >
    Logout
  </span>
  </div>
)}
    </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={createnew}>SELL</span>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Header;
