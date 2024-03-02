import React, { useEffect, useState } from 'react'
import { List } from '../component'
import { useParams } from 'react-router-dom'
import authService from '../appwrite/config';
import { useNavigate } from "react-router-dom";

function editpost() {
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const {slug} = useParams();
    useEffect(() => {
        if (slug) {
            authService.getList(slug).then((post) => {
                setPost(post);
            })
        }
        else {
            navigate("/")
        }
        // console.log(post)
    }, [slug, navigate])
    
  return post ? (
        <div>
          <List post={post}/>
        </div>
    ) : null

}

export default editpost
