// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './assets/fonts/styles.css'
// import './assets/styles/body.css'
// import './assets/styles/login/login.css'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './assets/fonts/styles.css';
import './assets/styles/body.css';
import './assets/styles/login/login.css';
import './assets/styles/header/header.css';
import './assets/styles/home/home.css';
import './assets/styles/navbar/navbar.css';
import './assets/styles/upload/upload.css'
import './assets/styles/home/remove.css'
import './assets/fonts/fonts.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
