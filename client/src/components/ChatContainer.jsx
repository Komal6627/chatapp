import React from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';

const ChatContainer = ({currentChat}) => {  
  const handleSendMsg =async(msg) => {}
  return (
<>
{ 
    currentChat && (
       <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml; base64, ${currentChat.avatarImage}`}
                alt="avatar"
              />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout/>
      </div>
      <div className="chat-messages"></div>
     <ChatInput handleSendMsg = {handleSendMsg}/>
    </Container>
  )
  }
</>
  )
}

const Container = styled.div`
padding-top : 1rem;
.chat-header {
  display: flex;
  justify-content:space-between;;
  align-item: center;
  padding: 0 2rem;
  gap: 1rem;
  .avatar{
    img{
      height: 3rem;
    }
  }
  .username{
    h3{
      color: white;
    }
  }
}
`;

export default ChatContainer
