import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from 'axios'
import loader from "../assets/loader.webp"
import { useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'
const SetAvatar = () => {
  const api = `https://api.multiavatar.com/739237`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)
  const toastOptions = {
    position:"bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  const setProfilePicture = async () => {};

  const getImg = async () => {
    const data = [];
    try {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error("You have reached the rate limit. Please try again later.", toastOptions);
      } else {
        toast.error("An error occurred while fetching avatars.", toastOptions);
      }
    }
  }

  useEffect( () => {
    getImg()
  }, [])

  return (
    <>
        <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className='avatars'>
                {
                    avatars.map((avatar, index) =>{
                      return(
                        <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : "" }`}>
                            <img src={`data:image/svg+xml; base64, ${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)}/>
                        </div>
                      )
                    })
                }
            </div>
        </Container>
        <ToastContainer/>
    </>
  )
}


const Container = styled.div``;

export default SetAvatar
