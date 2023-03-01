import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Authcontext } from '../../../Authprovider/Authprovide'
import Loding from '../../Loding/Loding'
import PostCardDetils from './PostCardDetils'
import PostModal from './PostModal'
import { AiFillVideoCamera, AiFillFileImage } from "react-icons/ai";
import { BiHappy } from "react-icons/bi";


const Postbar = () => {
  const { user } = useContext(Authcontext)
  let time = new Date().toLocaleTimeString()

  const { data: post, isLoading, refetch } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const res = await fetch('https://dailyface-server.vercel.app/postData')
      const data = res.json()
      return data
    },
  })

  if (isLoading) {
    return <Loding/>
  }

  return (
    <div>
      <div className="bg-white p-4 mt-3 shadow-sm rounded-md">
        <div className="flex items-center">
          <div className="w-24">
            <img className="w-14 rounded-full" src={user?.photoURL} alt="" />
          </div>
          <div className="w-full bg-[#f3f4f4] rounded-xl py-2 pl-4">
            <label className="w-full text-gray-500 text-lg" htmlFor="postmodal">
              What's on your mind {user?.displayName} ?
            </label>
          </div>
        </div>
     
        <div className='grid sm:grid-cols-1 md:grid-cols-3 text-center pt-5'>
            <div className='py-3 text-lg text-gray-600 flex justify-center'><span className='text-2xl pr-2 text-red-700 '><AiFillVideoCamera/></span> <span >Live Video</span></div>
            <div className='py-3 text-lg text-gray-600 flex justify-center'><span className='text-2xl pr-2 text-green-700 '><AiFillFileImage/></span> <span >Photo/Video</span></div>
            <div className='py-3 text-lg text-gray-600 flex justify-center'><span className='text-2xl pr-2 text-yellow-400 '><BiHappy/></span> <span >Felling/activity</span></div>
        </div>
      </div>
      

      <div>
        {post?.map((allpost) => (
          <PostCardDetils
            key={allpost._id}
            post={allpost}
            refetch={refetch}
          ></PostCardDetils>
        ))}
      </div>

      <PostModal time={time} refetch={refetch} />
    </div>
  )
}

export default Postbar
