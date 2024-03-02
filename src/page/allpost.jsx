import React, {useState, useEffect} from 'react'
import authService from '../appwrite/config'
import { Postcard } from '../component'


function allpost() {
    const  [posts, setPosts] = useState([])
    useEffect(() => {
      authService.getLists([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    }, [])
    

  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      <div className='flex flex-wrap'>
                {posts.filter((post) => post.status === "active")
                .map((post) => (                     
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>                    
                ))}
            </div>
    </div>
  )
}

export default allpost
