import React from 'react'
import './login.css'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase'
import { useDispatch } from 'react-redux';
import { login } from '../Redux/topSlice'

function Login() {

    const dispatch = useDispatch();
    function SignIn() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                dispatch(login({
                    userName : user.displayName,
                    profilePic : user.photoURL,
                    Id : user.uid,
                }))
            }).catch((error) => alert(error.message));
            

    }
    return (
        <div className="login">
            <div className="login-container">
                <img src="https://www.freepnglogos.com/uploads/snapchat-logo-hd-png-6.png" alt="" />
                <button variant="contained" onClick={SignIn}>Sign In</button>
            </div>
        </div>
    )
}

export default Login
