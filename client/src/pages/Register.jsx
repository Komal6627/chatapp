import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
import Logo from "../assets/logo.webp"


const FormContainer = styled.div`
  height : 100vh;
  width: 100vw;
  display: flex;
  justify-content:center;
  gap: 1 rem;
  align-items: center;
  background-color: #131324;

  .brand{
    display: flex;
    justify-content:center;
    gap: 1 rem;
    align-items: center;

    img{
    height : 4rem;
    border-radius: 20%
  }

  h1{
  color: white;
  text-trasform: uppercase;
  }
  }

  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color : #00000076;
    border-radius: 2rem;
   padding: 3rem 5rem;
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus{
        border : 0.1rem solid #997af0;
      }
    }

    button{
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff
      }
    }
      span {
        color: white;
        text-transform: uppercase;
        a {
          color:#4e0eff ;
          text-decoration: none;
          font-weight: bold
        }
      }
  }
`;

const Register = () => {
  const handleSubmit = (event) =>{
      event.preventDefault();
      alert("form")
  }

  const handleChange = (event) =>{
    
}

  return (
   <>
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
              <img src={Logo} alt='logo'/>
              <h1>Saffie</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={e => handleChange(e)}/>
          <input type="email" placeholder='Email' name='email' onChange={e => handleChange(e)}/>
          <input type="password" placeholder='Password' name='password' onChange={e => handleChange(e)}/>
          <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={e => handleChange(e)}/>
          <button type="submit">Create User</button>
          <span>already have an account? <Link to="/login">Login</Link></span>
      </form>
    </FormContainer>
   </>
  )
}





export default Register
