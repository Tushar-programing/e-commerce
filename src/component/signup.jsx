import React, {useEffect, useState, useCallback} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux'
import { login } from '../store/authslice';
import { Input, Button } from './index';
import './signup.css'

function signup() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const  dispatch = useDispatch()

  const create = async(data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if(userData) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    }
  }
  
  return (
    <div>
      <div className=''>
        <h1 className='text-2xl text-gray-800 font-semibold mt-5 ml-24 '>Register Account</h1>
        <div className='w-48 ml-24 bg-gray-600 mt-2 h-0.5'></div>
      </div>
      
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit(create)} id='form' >
         
          <div className='mb-8 flex font-semibold text-xl justify-center'>
            Your Personal Detail
          </div>
          <div>{error && <p className='text-red-600 mt-8 text-center'>{error}</p>}</div>
          <Input 
            label="Full Name: "
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Enter your Full Name'
            {...register("name", {     //here name is keyword
                required: true,
            })}
          />
          <Input 
            label="Enter your E-mail :"
            type="email"
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Enter your E-mail'
            {...register("email", {     //here name is keyword
            required: true,
            validate: {
              matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Email address must be a valid address",
            }
            })}
          />
          <div className='mb-5 flex font-semibold text-xl justify-center'>
            Your Password
          </div>
          <Input 
            label="Enter Password: "
            type="password"
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Enter your password'
            {...register("password", {     //here name is keyword
                required: true,
            })}
          />
          <Input 
            label="Confirm Password: "
            type="password"
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Confirm password'
          />
          <div className='flex justify-center mt-2 mb-7'><p className='text-xl font-normal'>Already have an Account? <Link className='font-semibold' to="/login">Sign in</Link></p></div>
          <Button className='w-full mt-4 mb-16 text-xl hover:bg-blue-600' type="submit">Create Account</Button>
          
        </form>
      </div>
      
    </div>
  )
}

export default signup;
