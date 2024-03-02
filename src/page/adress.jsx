import React, {useEffect, useState} from 'react'
import { Adress } from '../component'
import '../component/signup.css'
import { Link } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form'
import authService from '../appwrite/config';
import { Input, } from '../component';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'


function adress() {
  // const userData = useSelector(state  => state.auth.userData);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  
  const userData = useSelector(state =>  state.auth.userData);
  const  { register, handleSubmit, formState: { errors }  } = useForm();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // name, company, adress1,phone, adress2, city, zip, country, state, userid
  const create = (data) => {
    const creste = authService.createadress({...data, userid: userData.$id})
    if (creste) {
      window.location.reload();
    }
  }

  useEffect(() => {
    authService.getadress([]).then((data) => {
      if (data) {
        setPosts(data.documents);
      }
    })
  })
  // console.log("post", posts);


  return (
    <div id='width' className='mx-auto'>
        <div className=' flex justify-center'>
            <button onClick={openDialog} className='w-96 text-2xl font-semibold bg-green-500 pb-2 pt-2 rounded-md my-8 text-white'>+ Add new  address</button>
        </div>
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>Enter Here your  Address</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form className='w-96 ' onSubmit={handleSubmit(create)}>
                <Input label="Full Name" type="text" 
                {...register("name", {
                  required: true,
                })}
                />
                <Input label="Company" type="text" 
                {...register("company", {
                  required: true,
                })}
                />
                <Input 
                label="Phone"
                type="number"
                {...register("phone", {
                  required: true,
                  validate: {
                    matchPattern: (value) => /^[0-9]{10}$/.test(value) ||
                    "Phone number must be a valid : ",
                  }
                })}
                />
                <Input label="Adress1" type="text" 
                {...register("adress1", {
                  required: true,
                })}
                />
                <Input label="adress2" type="text" 
                {...register("adress2", {
                  required: true,
                })}
                />
                <div className='flex justify-evenly'><Input className1="" className2="mr-2" label="City" type="text" 
                {...register("city", {
                  required: true,
                })}
                />
                <Input className1="" className2="ml-2" label="Zip code" type="number" 
                {...register("zip", {
                  required: true,
                })}
                />
                </div>
                <Input label="Country" type="text" 
                {...register("country", {
                  required: true,
                })}
                />
                <Input label="state" type="text" 
                {...register("state", {
                  required: true,
                })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                {errors.company && <p>{errors.company.message}</p>}
                {errors.phone && <p>{errors.phone.message}</p>}
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>cancel</Button>
            <Button onClick={handleSubmit(create)}>save</Button>
          </DialogActions>
        </Dialog>
      <div className='flex flex-wrap '>
        {userData && posts.filter((post) => userData.$id === post.userid)
        .map((post) => (
          <div key={post.$id} className='p-2 w-1/4'>
            <Adress  {...post}/>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default adress
