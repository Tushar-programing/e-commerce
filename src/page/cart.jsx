import React, { useEffect, useState } from 'react'
import { Cartpost } from '../component'
import authService from '../appwrite/config'
import { Cartcalc } from '../component';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

function Cart() {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    // (post)? console.log("post", post.title) : null
    
    const userData = useSelector((state) => state.auth.userData);
    // const isAuthor = (userData && post.userid) ? 

    useEffect(() => {
        authService.getCarts([]).then((post) => {
            if (post) {
                setPost(post.documents); 
                setLoading(false);
            }
        })
    },  []);

    return (
        <div className='w-full max-w-7xl mx-auto px-4'>
            <div className=''>
                {loading ? (
                    <div>Loading...</div>
                ) : ((userData && post.length > 0) ? (
                        post.map((post) => (
                            // Check if the current item belongs to the current user
                            (userData.$id === post.userid) ? (
                                <div key={post.$id} className='p-2'>
                                    <Cartpost {...post} />
                                </div>
                            ) : null
                        ))
                    ) : (
                        <div>There is nothing in your cart</div>
                    )    
                )}
            </div>
            {(userData && post.length > 0)? <Cartcalc /> : null}
        </div>
       
    ); 
    
}

export default Cart
