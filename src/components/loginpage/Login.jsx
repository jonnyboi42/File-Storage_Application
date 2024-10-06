import React from "react"
import { useState, useContext } from "react"
import { auth } from "../../firebase";
import {useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signInAnonymously } from "firebase/auth";



const Login = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    

    //Initialize Use Navigate Hook
    const navigate = useNavigate();
    

   // Sign In Function
   const signIn = async (e) => {
    e.preventDefault(); // Prevents reloading from happening

    setLoading(true); // Optionally set loading state

    try {
        // Set persistence to browser session
        await setPersistence(auth, browserSessionPersistence);

        // Attempt to sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Signed In
        const user = userCredential.user;
        console.log(user);
        console.log(user.email);
        navigate('/home');
        
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
    } finally {
        setLoading(false); // Reset loading state
    }
};

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Show loading animation
        // Simulate a login process or handle actual login here
        setTimeout(() => {
            setLoading(false); // Hide loading animation after some time
            // Redirect or handle successful login
        }, 2000); // Adjust time as needed
    };

    



    return (
        <div className="container">
            <div className="log-in-container">
            
            <div className="log-in-header">

            <img src="src/assets/imgs/Logo.svg" alt="" />
    
            </div>

            <form className="username-and-password" onSubmit={handleSubmit}>
                <div className="username">
                    <p>Username</p>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="password">
                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="submit">
                    <button type="submit" onClick={signIn}>Sign-In</button>
                </div>

                <div className="not-a-member">
                    <p>Not A Member?</p>
                    <button>Create Account</button>
                </div>
            </form>
        </div>
        </div>
        
    );
};

export default Login;