import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService from '../appwrite/config';
// import '../component/signup.css';

function Orders() {
  const [payment, setPayment] = useState(true);
    const [post, setPost] = useState();
    const [check, setcheck] = useState(false);
    const [adress, setAdress] = useState([]);
    const [option, setOption] = useState("50");
    const { slug } = useParams();
    const  navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const checkhandle = () => {
      setcheck(!check);
    }

      useEffect(() => {
        authService.getList(slug).then((data) => {
          if (data) {
            setPost(data);
          }
        })
      })
        

      useEffect(() => {
        authService.getadress([]).then((data) => {
          if (data) {
            setAdress(data.documents);
          }
        })
      })
        

    // console.log(adress)

  return (
    <>
        <div className='flex justify-evenly mx-auto max-w-7xl mt-10'>
          <div className=' w-1/2 mx p-5'>
            <p className='text-lg text-gray-500 font-semibold'>Account</p>
            { userData && <p className='text-lg font-semibold'>{userData.email}</p>}
            <div className='border my-10'></div>
            <p className='text-lg text-gray-500 font-semibold'>Ship to</p>
            <select className='px-3 mb-10 mt-4 py-2 rounded-lg bg-white text-black outline-none
           focus:bg-gray-50 duration-200 border border-gray-200 w-full'>
            {userData  && adress.filter((ad) => userData.$id === ad.userid)
            .map((ad) => (
                <option key={ad.$id} value={ad.$id} className='p-2 my-5'>
                    <div className='mb-10'>{ad.name},{ad.company},{ad.adress1},{ad.adress2},{ad.city},{ad.zip},{ad.state},{ad.country},{ad.phone}</div>
                </option>
            ))}
            </select>
            <div className='border my-5'></div>
            <p className='text-lg text-gray-500 font-semibold mb-3'>Shiping Methood</p>
            { userData && <div>
              <div className='my-5'>
              <label className='w-96'>
                Delivery/Courier Charges  (Online Payment&Prepaid)· ₹50.00
                <input
                  type="radio"
                  value="50"
                  checked={option === "50"}
                  onChange={() => setOption("50")}
                  className='ml-40 border-blue-500'
                />
              </label >
              </div>
              <div className='my-5'>
              <label className='w-96'> 
                India Post (Highly Recommended for Village & Remote Area) . ₹85.00
                <input
                  type="radio"
                  value="80"
                  checked={option === "80"}
                  onChange={() => setOption("80")}
                  className='ml-24 '
                />
              </label>
              </div >
              <div className='my-5'>
              <label className='mr'>
              Cash on Delivery Charges (upto 500gms)&nbsp;&nbsp;&nbsp; . ₹90.00
                <input
                  type="radio"
                  value="100"
                  checked={option === "100"}
                  onChange={() => setOption("100")}
                  className='ml-56 '
                />
              </label>
              </div>
            </div>
            }
            
            <div className='border my-10'></div>
            
            <div className='my-5'>
              <label className=''>   
                <input type="checkbox" checked={check} onChange={checkhandle} id="myCheckbox" name="myCheckbox" className='mr-4'/>
                Get order updates via WhatsApp and/or SMS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
            </div>

            <div className='border my-10'></div>

            <p className='text-2xl text-gray-700 font-semibold mb-2'>Payment</p>
            <p className='text-base text-gray-500 font-semibold mb-5'>All transactions are secure and encrypted</p>
            {(option === "50" || option === "80") && (<div className='border h-24'>
              <div className='my-8 mx-2'>
                <label className='mr'>
                  <input
                    type="radio"
                    value="100"
                    checked={payment === true}
                    onChange={() => setPayment(true)}
                    className='mr-3'
                  />
                  Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                </label>
              </div>
            </div>)}
            {option === "100" && (
              <div>
                <div className='border h-14 mb-1 rounded-xl font-semibold align-middle text-gray-700 text-xl pt-3 pl-3'>Cash on Delivery (C.O.D)</div>
                <p className='border h-36 p-5 rounded-xl bg-gray-1
                00'>You will receive IVR Call and Whatsapp for COD Verification, please do< br/> respond immediately.< br/>
                Usually, COD dispatch in 2-3 days and delivers in 5-10 days.< br/>
                The order may not be canceled once dispatched.</p>
              </div>
            )}
            <button className='w-full bg-blue-500 rounded-xl p-2 text-white font-semibold text-2xl mt-10'>Complete Orders</button>
          </div>
          <div className=' w-2/5 mt-5 '>
              <Link to={`/post/${slug}`}>{post && (<div className='border p-2 bg-gray-100 flex justify-center'>
                  <div className='mt-1 w-1/3 mr-10' ><img className='h-20 outlin' src={authService.getFilePreview(post.image[0])} alt="" /></div>
                  <div className='mr-6 w-1/3 mt-3 text-gray-700 font-semibold text-lg'>
                    <div>{post.title}</div>
                    <div className='text-gray-600 font-semibold text-lg'>Brand : {post.brand}</div>
                  </div>
                  <div className='mt-7 w-1/4 text-gray-800 font-semibold text-xl'> ₹ {post.price}</div>
                  
                </div>
              )}</Link>
              {post && (<div className=''>
                <div className='flex justify-between mx-5 my-5'>
                  <div className=''>Subtotal : </div>
                  <div className=''> ₹ {post.price}</div>
                </div>
                <div className='flex justify-between mx-5 my-5'>
                  <div className=''>Shiping : </div>
                  <div className=''> ₹ {option}</div>
                </div>
                <div className='flex justify-between mx-5 text-2xl font-semibold text-gray-800 my-5'>
                  <div className=''>Total : (Includes of all taxes)</div>
                  <div className=''><span className='text-lg font-semibold text-gray-600'>INR</span> ₹ {Number(option) + Number(post.price)}</div>
                </div>
              </div>
              )}
          </div>
        </div>
        <div></div>
    </>
  )
}

export default Orders
