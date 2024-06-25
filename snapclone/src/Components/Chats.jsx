import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import './chats.css'
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Chat from './Chat.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { selectselectedUser } from '../Redux/topSlice.js';
import { auth } from '../firebase.js'
import { signOut } from "firebase/auth";
import { Avatar } from '@mui/material';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked.js';
import { resetMyImage } from '../Redux/appSlice.js';
import { useNavigate } from 'react-router-dom';



export default function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectselectedUser);
    const history = useNavigate();
    const dispatch = useDispatch();
    console.log(user.profilePic);


    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const postsCollection = collection(db, 'posts');
                const q = query(postsCollection, orderBy('timestamp', 'desc')); // Order by 'timestamp' in descending order

                const querySnapshot = await getDocs(q);
                const postList = [];

                querySnapshot.forEach((doc) => {
                    postList.push({ id: doc.id, ...doc.data() });
                });

                setPosts(postList);
            } catch (error) {
                console.error('Error fetching posts: ', error);
            }
        };

        fetchPosts();


    }, [])

    function takeSnap() {
        dispatch(resetMyImage());
        history("/webcam");
    }
    return (
        <div className='chats'>
            <div className="chat-header" >
                <Avatar src={user.profilePic} onClick={() => signOut(auth)} className='profile-chat-avatar' />
                <div className="chat-input">
                    <SearchIcon />
                    <input type="text" placeholder='friends' />

                </div>
                <ChatBubbleIcon className='chat-msgicon' />
            </div>
            <div className="chat-posts">
                {
                    posts.map(
                        (data, index) => (
                            <Chat key={index} id={data.id} userName={data.userName} timestamp={data.timestamp}
                                imageUrl={data.imageUrl} read={data.read} profile={data.profilePic} />)
                    )


                }


            </div>

            <RadioButtonUnchecked className='take-snap-radio' onClick={takeSnap} fontSize='large'></RadioButtonUnchecked>
        </div>
    )
}
