import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom'
import Login from './components/loginpage/Login.jsx'
import Home from './components/homepage/Home.jsx';
import Upload from './components/uploadpage/Upload.jsx';
import Header from './components/header/Header.jsx';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

function App() {

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        
        navigate('/'); // User is not signed in, navigate to login
        console.log("Not Signed in triggered")
      }
      setLoading(false);
    });
    console.log("Use Effect has run");
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  

  return (
    
      
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/upload'  element={<Upload/>}/>
        </Routes>


      
    
  )
}

export default App
