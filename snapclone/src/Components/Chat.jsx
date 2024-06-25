import React from 'react'
import './chat.css'
import ReactTimeago from 'react-timeago'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StopIcon from '@mui/icons-material/Stop';
import { assignImage } from '../Redux/topSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../firebase';
import { Avatar } from '@mui/material';
export default function Chat({ id, profile, userName, timestamp, imageUrl, read }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const open = async () => {
    if (!read) {
      dispatch(assignImage(imageUrl));
      await setDoc(doc(db, "posts", id), {
        read: true,
      }, { merge: true });
      history('/chats/view')
    }
  }
  return (


    <div className='chat' onClick={open}>
      <Avatar src={profile} className='chat-avatar' fontSize='large' />
      <div className="chat-information">
        <span>{userName}</span>
        <p>{!read && "Tap to view "} {timestamp && <ReactTimeago date={timestamp.toDate()} />}</p>
      </div>
      {
        !read && <StopIcon className='chat-readIcon' />
      }

    </div>
  )
}
