import React from 'react'
import { useSelector } from 'react-redux'
import { selectchatImage } from '../Redux/topSlice'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {CountdownCircleTimer } from 'react-countdown-circle-timer'
import './view.css'
export default function View() {

    const tempImg = useSelector(selectchatImage);
    const history = useNavigate();
    useEffect(()=>{
        if(!tempImg)exit();
    },[tempImg])
    const exit = () =>{
        history('/');
    }

  return (
    <div className='chat-view' onClick={exit}>
      <img src={tempImg} alt="" />
      <div className="circle-timer">
        <CountdownCircleTimer 
        isPlaying
        duration={10}
        strokeWidht={5}
        size={50}
        colors={ [["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]] }
        >
          {
            ({remainingTime})=>{
              
              return remainingTime===0 ? exit() : remainingTime;
            }
          }
        </CountdownCircleTimer  >
      </div>
    </div>
  )
}
