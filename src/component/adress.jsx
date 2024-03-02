import React from 'react'
import authService from '../appwrite/config'
import { useNavigate } from 'react-router-dom'

function adress({$id, name, company, adress1, adress2, phone, city, zip, country, state, userid}) {
  const navigate = useNavigate();

  const handledelete = async() => {
    const reload = await authService.deleteadress($id)
      if (reload) {
        window.location.reload();
      }
  }


  return (
    <div className=' bg-gray-100 border p-4'>
      <div>{name}</div>
      <div>{company}</div>
      <div>{adress1}</div>
      <div>{adress2}</div>
      <div>{phone}</div>
      <div>{city}</div>
      <div>{zip}</div>
      <div>{country}</div>
      <div>{state}</div>
      <div>{userid}</div>
      <div className='flex justify-end mt-10'>
        <button onClick={handledelete} className='text-red-600 px-3 text-base rounded-lg hover:text-white hover:bg-red-600'>Delete</button>
      </div>
    </div>
  )
}

export default adress
