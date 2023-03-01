import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Authcontext } from '../../Authprovider/Authprovide'
import '../../Pages/SharedPages/DefaultCss/DefaulCss.css'
import FriendRequest from './FriendRequest.js/FriendRequest'
import ShowAdd from './ShowAdd/ShowAdd'
import UseractiveCard from './UseractiveCard'

const Rightsidebar = () => {
  const {user} = useContext(Authcontext)
  const [getFriend, setGetFriend] = useState([])

  const { data: currentUser, isLoading, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await fetch('https://dailyface-server.vercel.app/alluser')
      const data = res.json()
      return data
    },
  })

  useEffect(()=>{
     fetch(`http://localhost:5000/allrequest?email=${user?.email}`)
     .then(res => res.json())
     .then(data => setGetFriend(data))
  },[user?.email])

  

  return (
    <div className="px-4 rightSidebar mt-3">
      {/* ===advertise=== */}
      <div className="font-semibold text-base-400 text-md ">Sponsored</div>
      <div>
        <ShowAdd />
      </div>
      <hr />

      {/* ===friend request==== */}
     {
      getFriend.length > 0 ?
      <>
       <div className="mb-4">
        <div className="flex justify-between">
          <h3 className="font-semibold text-base-400 text-lg ">
            Friend request
          </h3>
          <p>See all</p>
        </div>
        <div>
         {
          getFriend.map(request => <FriendRequest
          key = {request._id}
          request={request}
          ></FriendRequest>)
         }
        </div>
      </div>
      </>
      :
      <>
      </>
     }
      <hr />

      {/* ===Contact==== */}
      <div>
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-base-400 text-lg ">Contact</h3>
          <p className="text-lg pt-3">
            <AiOutlineSearch />
          </p>
        </div>
      </div>

      {/* ====user==== */}
      <div>
        {currentUser?.map((user) => (
          <UseractiveCard key={user._id} alluser={user}></UseractiveCard>
        ))}
      </div>
    </div>
  )
}

export default Rightsidebar
