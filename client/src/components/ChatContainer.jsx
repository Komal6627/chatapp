import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from  'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({currentChat, currentUser, socket}) => { 
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage ] =  useState(null);
  const scrollRef = useRef()
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
    });
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });

    const msgs =[...messages];

    msgs.push({fromSelf: true, message: msg});
    console.log();
    
    setMessages(msgs);
  }

  useEffect(() =>{
    if(socket.current){
      socket.current.on("msg-receive", (msg) => {
          setArrivalMessage({fromSelf: false, message: msg});
      })
    }
  }, [])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage])

  useEffect(() =>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  },[messages]);
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
                <div ref={scrollRef} key={uuidv4()}>
                    <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                {console.log(message.message)}
                  
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
  // &::-webkit-scrollbar {
  //     width: 0.2rem;
  //     &-thumb {
  //       background-color: #ffffff39;
  //       width: 0.1rem;
  //       border-radius: 1rem;
  //     }
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
     border-radius: 1rem;
     background-color: #9900ff20;
    //  background-color:#6A42C2;
  }
  }
  .recieved {
  .content {
     border-radius: 1rem;
     background-color: #6A42C2;
  }
  }
}
 
}
`;

export default ChatContainer
