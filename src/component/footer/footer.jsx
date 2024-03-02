import React from 'react'
import { Link } from 'react-router-dom'

function footer() {
  return (
    <div className=' bg-gray-400 w-auto h-96'>
      <div className='w-1/4 h-96 float-left text-center'>
        <a><h1 className='mt-16 text-xl font-semibold '>About us</h1></a>
        <div className='mt-8'><h1>falcon eye.in best online store to buy STEM Kits, Electronics, Robotics, Aeromodelling Drone Parts, IoT, Prototyping and Arts & Crafts Materials at low price.</h1></div>
      </div>
      <div className='w-1/4 float-left text-center'>
        <a><h1 className='mt-6 text-xl font-semibold '>Customer Services</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Contact Us</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Brands</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Site Map</h1></a>

      </div>
      <div className='w-1/4 float-left text-center'>
        <a><h1 className='mt-6 text-xl font-semibold '>My Account</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>My Account</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Order History</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Wish List</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Newsletter</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Privacy Policy</h1></a>
        <Link to="/list"><h1 className='mt-4 text-lg font-semibold text-gray-700'>List-item</h1></Link>

      </div>
      <div className='w-1/4 float-left text-center'>
        <a><h1 className='mt-6 text-xl font-semibold '>Connect With Us</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>FaceBook</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Instagram</h1></a>
        <a><h1 className='mt-4 text-lg font-semibold text-gray-700'>Whatsapp</h1></a>
      </div>

    </div>
  )
}

export default footer
