import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.webp'
import styled from 'styled-components';

const Contacts = ({contacts, currentUser}) => {
  const [currentUserName, setCurrentUserName ] = useState(undefined);
  const [currentUserImage, setCurrentUserImage ] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
      if (currentUser) {
        setCurrentUserImage(currentUser.avatarImage)
        setCurrentUserName(currentUser.username);
      }
  },[currentUser])

  const changeCurrentChat = (index, contact) =>{

  }

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              <img src={logo} alt=""  />
              <h3>Saffie</h3>
            </div>
            <div className="contacts"></div>
          </Container>
        )
      }
    </>
  )
}


const Container = styled.div``

export default Contacts
