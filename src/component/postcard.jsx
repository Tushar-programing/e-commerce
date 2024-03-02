import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../appwrite/config'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import './signup.css'

function postcard({ $id, title, image, price, brand, description }) {
  const userData = useSelector(state  => state.auth.userData);
  const  navigate = useNavigate();
  const [images, setImages] = useState(image[0])

  const onclick = async() => {
    try {
      const cart = await authService.createCart({title: title, brand: brand, userid: userData.$id, price: price, image: image, quantity: 1, description: description});
      if (cart) {
        navigate('/cart');
      } else {
        const quan = await authService.getCart({title: title, userid: userData.$id})
        const quant = quan.quantity;
        const update = await authService.updateCart({title: title, userid: userData.$id, quantity: quant + 1})
        if (update) {
          navigate('/cart');
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleMouseover = () => {
    if (image.length > 1) {
      setTimeout(() => {
        setImages(image[1])
      }, 200)
    }
  }
  const handleMouseout = () => {
    setTimeout(() => {
      setImages(image[0])
    }, 200)
  }

  return (
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <Link to={`/post/${$id}`}>
        <div id='postcard' className='w-full justify-center mb-4'>
          <img style={{ width: '260px' }} onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()} height="400" width="270" src={authService.getFilePreview(images)} alt={title} className='rounded-lg'></img>
        </div>
        <h2 className='text-xl text-gray-600 mb-2 font-semibold'>{title}</h2>
        <h2 className='text-xl font-bold'>₹ {price}</h2>
        </Link>
        <button onClick={() => onclick()} className='bg-blue-500 hover:bg-blue-400 px-6 py-1 mr-1 rounded-xl mt-4'>add to cart</button>
        <Link to={`/order/${$id}`} ><button className='bg-yellow-500 hover:bg-yellow-400 ml-1 px-8 py-1 rounded-xl mt-4'>Buy now</button></Link>
      </div>
  )
}

export default postcard
