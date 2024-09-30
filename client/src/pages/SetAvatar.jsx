import React, { useState } from 'react'
import styled from 'styled-components'
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from 'axios'
import loader from "../assets/loader.webp"
import { useNavigate } from 'react-router-dom'
const SetAvatar = () => {
  const api = `https://api.multiavatar.com/739237`;
  const navigate = useNavigate();
  const [avatars, SetAvatar] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(true)
  return (
    <>
        <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className='avatars'>
                {
                    
                }
            </div>
        </Container>
        <ToastContainer/>
    </>
  )
}


const Container = styled.div``;

export default SetAvatar
