
import './App.css'
import { useDispatch, useSelector } from 'react-redux';


import WebcamCap from './Components/WebcamCap';
import Preview from './Components/Preview';
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from 'react-router-dom';
import Chats from './Components/Chats';
import View from './Components/View'
import { selectselectedUser } from './Redux/topSlice';
import Login from './Components/Login';
import { useEffect } from 'react';
import { login, logout } from './Redux/topSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectselectedUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth,(authUser)=>{
      if(authUser){
        dispatch(login({
          userName : authUser.displayName,
          profilePic : authUser.photoURL,
          id : authUser.uid,
        }))
      }
      else{
        dispatch(logout());
      }
    });

  },[])
  return (
    <div className="app">
      {
        !user ? (<Login />) :
        <>
        <img src="https://www.freepnglogos.com/uploads/snapchat-logo-hd-png-6.png" alt="" className='outer-img'/>
          <div className='app-body'>
            <div className="body-background">
            <BrowserRouter>
              <Routes>
                <Route exact path="/webcam" element={<WebcamCap />} />
                <Route exact path="/preview" element={<Preview />} />
                <Route exact path="/" element={<Chats />} />
                <Route exact path="/chats/view" element={<View />} />
              </Routes>
            </BrowserRouter>
            </div>
            
          </div>
          </>
      }
    </div>
  )
}

export default App
