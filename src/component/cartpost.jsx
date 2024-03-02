import React from 'react'
import authService from '../appwrite/config'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"


function cartpost({title, brand, userid, price, image, quantity, description}) {

    const slug = title.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")

    const decrease = async() => {
      if (quantity  > 1) {

        try {
          const update = await authService.updateCart({userid, title, quantity: quantity -1})
          if (update) {
            window.location.reload();
          } 
        } catch (error) {
          console.log(error.message)
        }
      }  else {
        try {
          const update = await authService.deleteCart({userid, title})
          if (update) {
            window.location.reload();
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }

    const increase = async() => {
      if (quantity  < 20) {

        try {
          const update = await authService.updateCart({userid, title, quantity: quantity +1})
          if (update) {
            window.location.reload();
          } 
        } catch (error) {
          console.log(error.message)
        }
      }  else {
        alert("you can not add more quantity")
      }
    }

    const remove = async() => {
      try {
        const update = await authService.deleteCart({userid, title})
        if (update) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error.message)
      }
    }
      
  return (
    <div className='h-36 border'>
        <Link to={`/post/${slug}`}>
            <div className='float-left w-48 h-auto'>
              <img className='mt-5 ml-14' style={{ height: '100px', }} src={authService.getFilePreview(image[0])}></img>
            </div>
            <div className='float-left w-80 mt-3 ml-24'>
              <div className=' text-xl text-gray-900 font-semibold mb-1'>{title}</div>
              <div className=' text-lg text-gray-700 font-semibold mb-1'>Brand : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{brand}</div>
              <div className=' text-lg text-gray-500 font-semibold'>{description.slice(0, 50)}...</div>
            </div>
        </Link>
        <div className='w-96 float-left'>
            <p className='text-xl font-medium ml-60 mt-6'>Quantity</p>
            <div className='text-lg mt-2 ml-56'>
                <button onClick={() => decrease()} className='float-left px-3 mr-2 rounded-lg text-white bg-red-600'>-</button><input type="number" className='float-left w-20 outline-none border pl-3' value={quantity} readOnly/><button onClick={() => increase()} className='float-left px-2 ml-2 text-white rounded-lg bg-green-600'>+</button>
            </div>
            <button onClick={() => remove()} className='text-lg font-medium text-white px-3 rounded-lg mt-2 ml-60 bg-gray-600'>remove item</button>
        </div>
        <p className='text-xl float-left font-medium ml-24 mt-10'>₹ {price} *  {quantity}</p>
        <p className='text-xl float-left font-medium ml-20 mt-2'>Total ₹ {price * quantity}</p>
    </div> 
  )
}

export default cartpost
