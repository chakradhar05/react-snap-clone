import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { resetMyImage, selectImage } from '../Redux/appSlice'
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SendIcon from '@mui/icons-material/Send';
import { storage, db } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


import './preview.css';
import { v4 as uuid } from 'uuid';
import { selectselectedUser } from '../Redux/topSlice';

function Preview() {

    const image = useSelector(selectImage);
    const user  = useSelector(selectselectedUser);
    const history = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(-1)

    useEffect(() => {
        if (!image) history('/webcam')
    }, [image, history])

    function closePreview() {
        dispatch(resetMyImage())

    }

    function sendPost() {
        setLoading(1);
        const id = uuid();
        const spaceRef = ref(storage, `posts/${id}`);
        uploadString(spaceRef, image, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!', snapshot);
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                addDoc(collection(db, "posts"), {
                    imageUrl: downloadURL,
                    read: false,
                    profilePic : user.profilePic,
                    userName : user.userName,
                    timestamp: serverTimestamp()
                });
                setLoading(-1)
                history("/")

            })
        });

    };
    return (
        <>{
            loading === -1 ?
                <div className='preview'>
                    <CloseIcon onClick={closePreview} className='preview-close' />

                    <div className="preview-tool-bar">
                        <EditIcon />
                        <CropIcon />
                        <TimerIcon />
                        <FilterAltIcon />
                        <AttachFileIcon />
                        <SaveAltIcon />

                    </div>
                    <img src={image} alt="" />
                    <div className="preview-footer" onClick={sendPost}>
                        <h2>Send Now</h2>
                        <SendIcon className='preview-sendicon' fontSize='small' />

                    </div>

                </div> : <Box sx={{ display: 'flex'}} className="load-on-click">
                    <CircularProgress />
                </Box>
        }</>
    )
}

export default Preview
