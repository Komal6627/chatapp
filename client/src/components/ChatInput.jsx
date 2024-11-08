import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled, { createGlobalStyle } from 'styled-components';
import Picker from "emoji-picker-react";

// Global styles to override the emoji picker styles
const GlobalStyles = createGlobalStyle`
  .custom-emoji-picker .emoji-picker-react {
    background-color: #080420 !important; /* Enforce background color */
    color: white !important;
    box-shadow: 0 5px 10px rgba(154, 134, 243, 0.2) !important;
    border-color: #9a86f3 !important;
  }

  .custom-emoji-picker .emoji-scroll-wrapper {
    background-color: #080420 !important;
  }

  .custom-emoji-picker .emoji-scroll-wrapper::-webkit-scrollbar {
    background-color: #080420 !important;
    width: 5px;
  }

  .custom-emoji-picker .emoji-scroll-wrapper::-webkit-scrollbar-thumb {
    background-color: #9a86f3 !important;
  }

  .custom-emoji-picker .emoji-categories button {
    filter: contrast(0) !important;
  }

  .custom-emoji-picker .emoji-search {
    background-color: transparent !important;
    border-color: #9a86f3 !important;
    color: white !important;
  }

  .custom-emoji-picker .emoji-group:before {
    background-color: #080420 !important;
    color: white;
  }
`;

const ChatInput = ({handleSendMsg}) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) =>{
    event.preventDefault();
    if(msg.length > 0){
      handleSendMsg(msg);
      setMsg('')
    }
  }

  return (
    <Container>
      <GlobalStyles />
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="custom-emoji-picker">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #080420;
  padding: 1rem 2rem;
  gap: 1rem;
  position: relative;

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    position: relative;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .custom-emoji-picker {
        position: absolute;
        bottom: 60px; /* Controls distance above input */
        left: 0;
        width: 250px;
        background-color: #080420 !important; /* Set directly */
        box-shadow: 0 5px 10px rgba(154, 134, 243, 0.2);
        border-radius: 8px;
        padding: 0.5rem;
        z-index: 100;
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 1rem;
    background-color: #ffffff34;
    border-radius: 2rem;
    padding: 0.5rem 1rem;

    input {
      flex: 1;
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      background-color: #9a86f3;
      border: none;
      border-radius: 50%;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
