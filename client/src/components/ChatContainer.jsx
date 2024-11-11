import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from  'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

const ChatContainer = ({currentChat, currentUser}) => { 
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser?._id && currentChat?._id) {
        try {
          const { data } = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(data);
          console.log("data", data);
        } catch (error) {
          console.error("Failed to fetch messages:", error.response?.data || error.message);
        }
      }
    };
  
    fetchMessages();
  }, [currentChat, currentUser, getAllMessagesRoute]);
  


  const handleSendMsg =async(msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    })
  }
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
     <div className="chat-messages">
          {
            messages.map((message) =>{
              return(
                <div>
                    <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                {  console.log(message.message)}
                  
                </div>
              </div>
                </div>
              )
            })
          }
     </div>
     <ChatInput handleSendMsg = {handleSendMsg}/>
    </Container>
  )
  }
</>
  )
}

const Container = styled.div`
padding-top : 1rem;
display: grid;
grid-template-row: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-auto-rows: 15% 70% 15%;
    }

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
.chat-messages{
  padding: 1rem 2rem;
  display: flex;
  flex-direction:column;
  gap: 1rem;
  overflow: auto;
  .message {
    display: flex;
    align-item: center;
    .content{
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      color: #d1d1d1;
    }
  }
  .sended {
  justify-content: flex-end;
  .content {
    background-color: #9900ff20;
  }
  }
}
`;

export default ChatContainer
