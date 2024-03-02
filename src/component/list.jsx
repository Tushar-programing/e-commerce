import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/config';
import { Button, Input } from '.'
import './signup.css'


function Post({ post }) {
  console.log(post)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      price: post?.price || "",
      brand: post?.brand || "",
      model: post?.model || "",
      use: post?.use || "",
      material: post?.material || "",
      keyword: post?.keyword || "",
      status: post?.status ||"",
      weight: post?.weight ||"",
      height: post?.height || "",
      width: post?.width || "",
    },
  })

  const List = async (data) => {
    if (post) {
      const file = [];
      for (let i=0; i < data.image.length; i++){
        const fl = data.image ? await authService.uploadFile(data.image[i]) : null;
        if (fl) {
          file.push(fl.$id);
        }
      }
      if (file) {
        post.image.forEach(element => {
          authService.deleteFile(element);
        });
      }
      const updatePost = await authService.updateList(post.$id, {...data, image: file? file : null})
      if (updatePost) {
        navigate(`/post/${updatePost.$id}`);
      }
    } else {
      try {
        const file = [];
        for (let i = 0; i < data.image.length; i++) {
          const fl = await authService.uploadFile(data.image[i])
          if (fl) {
            file.push(fl.$id);
          }
        }
        if (file) {
          data.image = file
          const dblist = await authService.createList({ ...data,  userid: userData.$id })
          if (dblist) {
            navigate(`/post/${dblist.$id}`);
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    }
    

  // title#, keyword#, status#, brand$, model$, use$, material$, width@, height@, weight@, userid(), price, image
  return (
    <div className='w-full h-auto flex justify-center'>
      <form onSubmit={handleSubmit(List)} id='form3' >
        <div><h1 className='text-2xl text-center mb-10 mr-11 mt-5 font-semibold'>Add item</h1></div>
        <div id='rd' className='mr-20 float-left'>
          <Input
            label="Title : "
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Title...'
            {...register("title", {     //here name is keyword
              required: true,
            })}
          />
          <label className='inline-block mb-5 pl-1 '>Description : </label>
          <textarea rows={4} cols={100} className="px-3 py-2 rounded-lg bg-white text-black outline-none
           focus:bg-gray-50 duration-200 border border-gray-200 w-full" type="text" placeholder="Description.."
            {...register("description", {     //here name is keyword
              required: true,
            })}
          >
          </textarea>
          <Input
            label="Price : "
            type="number"
            className1=" mb-5 mt-5"
            className2=" mb-8"
            placeholder='Price...'
            {...register("price", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Brand : "
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Brand...'
            {...register("brand", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Model name: "
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Model name...'
            {...register("model", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Uses of : "
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Full Name...'
            {...register("use", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Material : "
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Material...'
            {...register("material", {     //here name is keyword
              required: true,
            })}
          />
        </div>

        <div id='rd' className='ml-20 float-left'>
          <label className='inline-block mb-5 pl-1 '>Enter keywords : </label>
          <textarea rows={3} cols={100} className="px-3 mb-8 py-2 rounded-lg bg-white text-black outline-none
           focus:bg-gray-50 duration-200 border border-gray-200 w-full" type="text" placeholder="keywords.."
            {...register("keyword", {     //here name is keyword
              required: true,
            })}
          >
          </textarea>

          <label className='mt-5' >Choose status :</label>
          <select className='px-3 mb-10 mt-4 py-2 rounded-lg bg-white text-black outline-none
           focus:bg-gray-50 duration-200 border border-gray-200 w-full' {...register("status", {     //here name is keyword
            required: true,
          })}>
            <option value="active">Active</option>
            <option value="inactive">inActive</option>
          </select>
          <Input
            label="Weight: "
            type="number"
            className1=" mb-5"
            className2=" mb-8"
            placeholder='weight...'
            {...register("weight", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Height: "
            type="number"
            className1=" mb-5"
            className2=" mb-8"
            placeholder='height...'
            {...register("height", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Width : "
            type="number"
            className1=" mb-5"
            className2=" mb-8"
            placeholder='width...'
            {...register("width", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Image : "
            type="file"
            multiple="multiple"
            className1=" mb-5"
            className2=" mb-8"
            placeholder='image...'
            {...register("image", {     //here name is keyword
              required: true,
            })}
          />
          {post && (
            <div className=' h-24 flex justify-evenly'>
              {post.image.map((img, index) => (
                <img
                width={128}
                key={index}
                src={authService.getFilePreview(post.image[index])}
                alt={post.title}
                className="rounded-lg border mx-1"
                />
              ))}
            </div>
          )}
          <Button className='w-full mt-4 mb-16 text-xl hover:bg-blue-600' type="submit">List Item</Button>
        </div>
      </form>
    </div>
  )
}

export default Post
