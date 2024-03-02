import React, { useState } from 'react'
import image from '../images/main.png';
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import  {Logoutbtn}  from '../index';
import '../signup.css';

function header() {
    const [value, setValue] = useState()
    const [main, setMain] = useState([])

    const addtodo = () => {
        if(value=== ""){
            alert("first add somthing");
        }else {
            setMain([...main, value]);
            setValue("");
        }
    }

    const active = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData);
    

    const navigate = useNavigate()
    const navitem= [
        {
            name:" cart",
            url: "/cart",
            status: true
        },
        {
            name:" wishlist",
            url: "/wishlist",
            status: true
        },
        {
            name:" login",
            url: "/login",
            status: !active
        },
        {
            name:" signup",
            url: "/signup",
            status: !active
        },
    ]
  return (
    <>
        <div className='w-full py-4 pl-4 bg-gray-400 flex'>
            <img src={image} width="90" height="80" alt="logo" />

            <input id='rem' type='text' value={value} onChange={(e) => setValue(e.target.value)} className='ml-20 pl-5 mt-3 w-100 h-9 flex-auto outline-none rounded-tl-lg rounded-bl-lg' />
            <button onClick={addtodo} className='inline-block duration-200 w-20 h-9 mt-3 bg-gray-200 rounded-tr-lg rounded-br-lg'>Search</button>

            <ul className='flex ml-auto'>
            {navitem.map((item) =>
                item.status ? (
                    <li key={item.name}>
                        <button id={item.name} onClick={() => navigate(item.url)}
                        className='inline-block mx-5 px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                        >
                            {item.name}
                        </button>
                    </li>
                ) : null
            )}
            {active && (
              <div className=' mr-14 text-base ml-3'> 
                {userData && (<p className='text-blue-600 font-semibold text-lg'>Hey {userData.name}</p>)}
                <div class="dropdown">
                  <button class="dropbtn">My account&nbsp;&#717;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                  <div class="dropdown-content">
                    <Link to="">My orders</Link>
                    <Link to="/address">My address</Link>
                    <a ><Logoutbtn /></a>
                  </div>
                </div>
              </div>
            )}
            </ul>

        </div>
        {/* <ul className=''>
            {main.map((val) => (
                <li key={val}>{val}</li>
            )
            )}
        </ul> */}
    </>
    
  )
}

export default header
