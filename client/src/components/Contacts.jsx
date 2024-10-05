import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import styled from "styled-components";

const Contacts = ({ contacts, currentUser }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      console.log(contacts);
      
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {};

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Saffie</h3>
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml; base64, ${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>

          <div className="contacts">
            {contacts && contacts.map((contact, index) => {
              return (
                <div
                  className={`contact${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml; base64, ${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
         
        </Container>
      )}
    </>
  );
};

const Container = styled.div` 
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img{
      height: 2rem;
    }
    h3{
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts{
    display:flex;
    flex-direction: column;
    align-item: center;
    overflow: auto;
    gap: 0.8rem;
    .contact{
       background-color: #ffffff34;
       min-height: 5 rem;
       width: 90%
       .avatar{
        height: 3rem
       }
    }
  }
`;

export default Contacts;
