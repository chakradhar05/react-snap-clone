import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './webcam.css'
import { selectImage, setMyImage } from '../Redux/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function WebcamCap() {
    
    const videoContraints = {
        height: 495,
        width: 280,
        facingMode: "user",
    }   
    const webref = useRef(null);
    const dispatch = useDispatch();
    const history = useNavigate();


    const capture = useCallback(()=>{
        const image = webref.current.getScreenshot();
        dispatch(setMyImage(image))
        history('/preview')
    })
    function goBack(){
        history("/");
    }

    return (
        <div className='webcamcapture'>
            
            <Webcam audio={false} ref = {webref} screenShotFormat="image/jpeg" videoConstraints = {videoContraints}/>
            <div className="web-radio-button">
                <RadioButtonUncheckedIcon onClick={capture} fontSize='large'/>
            </div>
            <div className="web-back-button">
                <ArrowBackIosIcon onClick={goBack} fontSize='medium'/>
            </div>
        </div>
    )
}

export default WebcamCap
