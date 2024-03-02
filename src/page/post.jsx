import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, } from '../component'
import {useSelector} from 'react-redux'
import authService from '../appwrite/config'
import '../component/signup.css'

function Post() {
  const userData = useSelector(state => state.auth.userData)
  // console.log(userData)


  const { slug } = useParams();
  console.log("ui", slug)
  const navigate = useNavigate();
  const [post, setPost] = useState()
  const [value, setValue] = useState(1);
  const [img, setImg] = useState(0);


  // title, brand, userid, price, image, quantity
  const onClick = async() => {
    try {
      const cart = await authService.createCart({title: post.title, description: post.description, brand: post.brand, userid: userData.$id, price: post.price, image: post.image, quantity: value});
      if (cart) {
        navigate('/cart');
      } else {
        const quan = await authService.getCart({title: post.title, userid: userData.$id})
        const quant = quan.quantity;
        const update = await authService.updateCart({title: post.title, userid: userData.$id, quantity: quant + value})
        if (update) {
          navigate('/cart');
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handledelete = () => {
    // alert('Are you sure to delete this item')
    const auth = authService.deleteList(slug);
    if (auth) {
      navigate('/')
    }
  }

  useEffect(() => {
    if (slug) {
      authService.getList(slug).then((post) => {
        if (post) setPost(post);
        // console.log(post.price)
        else navigate("/")
      });
    }else navigate("/")
  }, [slug, navigate]);
  
  if (!post) {
    // If post is still being fetched or is undefined, you can show a loading state
    return <p>Loading...</p>;
  } else {
    console.log('post', post)
  }
  
  const isAuthor = userData?.$id && post?.userid ? userData.$id === post.userid : false;

  return (
    <div id='post' className='w-full mt-5 h-screen mx-auto px-4 '>
        <div id='post1' className='w-1/2 h-full float-left'>
          <div id='post123' className='w-full'>
            <div className='float-left mx-8 my-5'>
              {post.image.map((post, index) => (
                <img key={index} onMouseOver={() => setImg(index)} id='post11' className='mb-5 shadow-2xl' style={{ width: '95px', height: '90px' }} src={authService.getFilePreview(post)} alt="Image" />
              ))}
            </div>
            <img height="900" className='float-left mx-6 mt-5 zoomable-image' style={{ width: '500px' }} src={authService.getFilePreview(post.image[img])} alt="Image" />
          </div>
          <div id='clear' className='my-8 h-48 clear-left'>
            <p className='text-xl font-semibold text-gray-600 mx-14 pt-7 w-auto float-left clear-left'>Brand : </p><span className='text-gray-700 mt-7 ml-40 float-left text-xl font-semibold'>{post.brand}</span>
            <p className='text-xl font-semibold text-gray-600 mx-14 pt-7 w-auto float-left clear-left'>Use of product : </p><span className='text-gray-700 mt-7 ml-20 float-left text-xl font-semibold'>{post.use}</span>
            <p className='text-xl font-semibold text-gray-600 mx-14 pt-7 w-auto float-left clear-left'>Material : &nbsp;</p><span className='text-gray-700 mt-7 ml-32 float-left text-xl font-semibold'>{post.material}</span>

          </div >
          <div id='clear' className='my-8 h-48 clear-left'>
            <p className='text-xl font-semibold text-gray-600 mx-14 pt-7 w-auto float-left clear-left'>Height : </p><span className='text-gray-700 mt-7 ml-20 float-left text-xl font-semibold'>{post.height}</span>
            <p className='text-xl font-semibold text-gray-600 mx-14 pt-7 w-auto float-left clear-left'>Width : &nbsp;</p><span className='text-gray-700 mt-7 ml-20 float-left text-xl font-semibold'>{post.width}</span>
            <p className='text-xl font-semibold text-gray-600 mx-14 pt-7 w-auto float-left clear-left'>Weight : </p><span className='text-gray-700 mt-7 ml-20 float-left text-xl font-semibold'>{post.weight}</span>

          </div>
        </div>

        
        <div id='post2' className='outline-dashed h-full  float-left'>
            <div className='flex justify-evenly'>
              <h1 className='mx-10 my-8 text-3xl font-semibold '>{post.title}</h1>
              {isAuthor && (
                <div>
                  <Link to={`/edit/${slug}`}><button className='h-8 mt-9 w-20 rounded-lg text-white bg-yellow-400 mr-2'>edit</button></Link>
                  <Link><button onClick={() => handledelete()} className='h-8 mt-9 w-20 rounded-lg text-white bg-blue-400 ml-2' >Delete</button></Link>
                </div>
              )}
            </div>
            <div className='w-full border'></div>
            <p className='mx-10 mt-8 text-xl text-gray-600 font-semibold'><span className='text-white pl-3 pb-1 bg-yellow-500'>Model : </span>&nbsp;&nbsp;&nbsp;{post.model}</p>
            <p className='mx-10 mt-8 text-red-500 text-3xl font-semibold'><span className='text-white text-2xl px-2 pl-3 bg-blue-500'>Price : </span><span className='text-gray-900'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>₹ {post.price}</p>
            <p className='text-xl mt-8 ml-10 font-semibold'>Quantity : </p> 
            <button onClick={() =>  (value > 1) ? setValue(value -1) : null} className='bg-red-600 text-white ml-10 px-4 rounded-lg pb-2 text-2xl font-bold'>-</button><input className='mx-2 mt-5 px-3 py-2 rounded-lg bg-white text-black outline-none
            focus:bg-gray-50 duration-200 border border-gray-200' value={value} type='number' placeholder='Quantity'></input><button onClick={() => (value < 20) ? setValue(value + 1) : null} className='bg-green-600 rounded-lg  text-white px-3 pb-2 text-2xl font-bold'>+</button>
            <div className='mx-10 mt-10 text-xl'><Button onClick={onClick} className='px-20 mr-1' children="Add To Cart" /><Button className='px-20 ml-2' children="&nbsp;&nbsp;Buy Now &nbsp;" /></div>
            <div className='mx-10 mt-10 text-2xl text-gray-700 font-semibold m-auto'><p>Description : </p></div>
            <div className='mx-10 mt-5 text-xl text-gray-700 font-semibold m-auto'>{post.description}</div>
        </div>
    </div>
  )
}

export default Post
