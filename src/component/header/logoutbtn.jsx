import React from 'react'
import { Button } from '..'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authslice';
import { useNavigate } from 'react-router-dom'

function logoutbtn() {
    const  dispatch = useDispatch();
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout()
        dispatch(logout())
        navigate("/")
    }

  return (
    <>
        <button 
        onClick={logoutHandler}>
            Logout
        </button>
    </>
    
  )
}

export default logoutbtn
