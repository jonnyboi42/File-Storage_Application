import React, { useState } from 'react';
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  //Initialize Use Navigate Hook
  const navigate = useNavigate();

  //State for controlling menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Toggle hamburger menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //Function to handle signOut
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("You have been signed out");
    } catch (error) {
      console.error("Error Signing out", error);
    }
  };

  //Routes
  const handleUpload = () => {
    navigate('/upload');
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <section className='navbar'>
      <button className='navbar-menu-button' onClick={toggleMenu}>
        <svg className='nav-hamburger' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z"></path>
        </svg>
      </button>

      <div className="navbar-items">
        <a onClick={handleHome}>HOME</a>
        <a onClick={handleUpload}>UPLOAD</a>
        <a onClick={handleSignOut}>SIGN OUT</a>
      </div>

      {isMenuOpen && (
        <div className="navbar-hamburger-menu">
          <a onClick={handleHome}>HOME</a>
          <a onClick={handleUpload}>UPLOAD</a>
          <a onClick={handleSignOut}>SIGN OUT</a>
        </div>
      )}
    </section>
  );
};

export default Navbar;