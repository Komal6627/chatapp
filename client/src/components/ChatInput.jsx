import React from 'react'
import {IoMdSend} from "react-icons/io"
import { BsEmojiSmileFill} from "react-icons/bs"
import styled from 'styled-components'

const ChatInput = () => {
  return (
   <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill/>
            </div>
        </div>
        <form className='imput-container'>
            <input type="text" placeholder='Type your msg hear'/>
            <button className='submit'>
                <IoMdSend />
            </button>
        </form>
   </Container>
  )
}

const Container =  styled.div``

export default ChatInput
