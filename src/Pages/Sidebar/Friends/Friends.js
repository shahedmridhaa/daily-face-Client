import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Authcontext } from '../../../Authprovider/Authprovide';
import Loding from '../../Loding/Loding';
import FriendCard from './FriendCard';

const Friends = () => {
  const {user} = useContext(Authcontext)
  
    const { data: myFriend, isLoading, refetch } = useQuery({
        queryKey: ['myFriend'],
        queryFn: async () => {
          const res = await fetch(`http://localhost:5000/allFriend?email=${user?.email}`)
          const data = res.json()
          return data
        },
      })

      if(isLoading){
        return <Loding></Loding>
      }


    return (
        <div  className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4'>
            {myFriend?.map(friend =>
                <FriendCard
                key={friend._id}
                friend={friend}
                ></FriendCard>
                )}
        </div>
    );
};

export default Friends;