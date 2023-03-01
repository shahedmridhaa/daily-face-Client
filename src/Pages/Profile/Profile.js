import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../../Authprovider/Authprovide'
import '../SharedPages/DefaultCss/DefaulCss.css'
import {AiFillEdit } from 'react-icons/ai'
import UserInfoEdit from '../Sidebar/Modal/UserInfoEdit'
import Loding from '../Loding/Loding'
import Header from '../SharedPages/Header/Header'
import { AiOutlineMail,AiFillEnvironment,AiTwotoneBook } from "react-icons/ai";
import PostModal from '../Home/Postbar/PostModal'

import ProfileCard from './ProfileCard'




const Profile = () => {
  const {user} = useContext(Authcontext)
  const [getPost, setGetpost] = useState([])

  const {data:userProfile, isLoading, refetch } = useQuery({
    queryKey: ['userProifle'],
    queryFn: async () => {
      const res = await fetch(
        // ` https://dailyface-server.vercel.app/user?email=${user?.email}`,
                 `http://localhost:5000/singleuser?email=${user?.email}`,

      )
      const data = res.json()
      return data
    }
  })
  
  
   useEffect(()=>{
         fetch( ` http://localhost:5000/userPost?email=${user?.email}`)
         .then(res => res.json())
         .then(data => setGetpost(data))
   },[user?.email])



  if (isLoading) {
    return <Loding></Loding>
  }

  return (
    <div>
      <Header />
      <div className='container mx-auto'>
      <section >
        <div
          className=" h-56"
          style={{
            backgroundImage: `url("https://placeimg.com/1000/800/arch")`,
          }}
        >
          <div className="flex justify-end ">
            <button className="btn btn-active btn-ghost text-white">
              Edit cover Photo
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-base-100">
          <div className=" userimage w-full flex justify-center">
            <img
              className="rounded-full w-48 userProfile"
              src={user?.photoURL}
              alt="profile"
            />
          </div>
          <div className="text-center py-5">
            <h3 className="text-3xl font-bold">{user?.displayName}</h3>
            <h3 className='text-xl text-gray-700 font-semibold pt-3'>213 friends</h3>
            {/* avtar */}
            <div className="avatar-group -space-x-6 flex justify-center py-3">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" alt="..." />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" alt="..." />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" alt="..." />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-12 bg-neutral-focus text-neutral-content">
                  <span>+99</span>
                </div>
              </div>
            </div>

         
          </div>
        </div>
      </section>
      <UserInfoEdit userOldInfo={userProfile} refetch={refetch}></UserInfoEdit>





      {/* Pofile postbar & others */}
      <div className='sm:flex-wrap lg:flex'>

        {/* profile left side */}
       <div className='sm:w-full lg:w-1/3'>
        <div className='bg-white mr-4 p-4 mt-4 rounded-md'>
          <h2 className='text-xl font-semibold pb-3'>Intro</h2>
          <label
              htmlFor="updetUserInfo"
              className="btn btn-active btn-ghost my-4 text-green-700 w-full"
            >
              <AiFillEdit />
              <span className="pl-2">Edit Profile</span>
            </label>
            <div className='text-lg text-gray-700 font-medium py-3 flex items-center'>
         <span className='text-2xl'><AiTwotoneBook/></span> <h3 className='w-28 pl-2'>Education:</h3>
          <p>{userProfile?.education}</p>
          </div>
          <div className='text-lg text-gray-700 font-medium py-3 flex items-center pt-5'>
          <span className='text-red-800 text-2xl '><AiOutlineMail/></span><h3 className='w-24 pl-2'>Email:</h3>
          <p>{user?.email}</p>
          </div>
          <div className='text-lg text-gray-700 font-medium py-3 flex items-center pb-5'>
         <span className='text-green-800 text-2xl'><AiFillEnvironment/></span> <h3 className='w-24 pl-2'>City:</h3>
          <p>{userProfile?.city}</p>
          </div>
          
        </div>
       </div>



       {/* ==profile right side */}
       <div className='sm:w-full lg:w-2/3'>
        {/* ==post bar=== */}
       {/* <div className="bg-white w-full p-4 mt-3 shadow-sm rounded-md">
          <div className="flex items-center">
            <div className="w-24">
              <img className="w-14 rounded-full" src={user?.photoURL} alt="" />
            </div>
            <div className="w-full bg-[#f3f4f4] rounded-xl py-2 pl-4">
              <label
                className="w-full text-gray-500 text-lg"
                htmlFor="postmodal"
              >
                What's on your mind {user?.displayName} ?
              </label>
            </div>
          </div>
        </div> */}

        {/* ===post show card */}
    {
      getPost.length > 0 ?
      <>
          <div>
      {
        getPost?.map(userPost => <ProfileCard 
        key={userPost._id}
        userPost={userPost}
        refetch={refetch}
        ></ProfileCard>)
      }
        </div>
      </>
      :
      <>
      <h2 className='text-center bg-white p-6 mt-4 text-xl font-semibold'>You don't have any Post</h2>
      </>
    }
       </div>
      </div>
      </div>
      {/* <PostModal/> */}
    </div>
  )
}

export default Profile
