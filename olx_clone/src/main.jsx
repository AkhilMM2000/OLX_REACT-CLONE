import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {Firebasecontext} from './store/Firebasecontext.jsx';
import { auth, db } from './firebase/config.js'; 
import Context from './store/Firebasecontext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Firebasecontext.Provider value={{ auth,db}}>
      <Context>
      <App />
      </Context>
    </Firebasecontext.Provider>
  </StrictMode>
);

