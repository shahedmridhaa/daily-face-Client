import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loding from '../../Loding/Loding';
import PeopleCard from './PeopleCard';

const People = () => {
  
    const { data: alluser, isLoading, refetch } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
          const res = await fetch('http://localhost:5000/alluser')
          const data = res.json()
          return data
        },
      })

      if(isLoading){
        return <Loding/>
      }

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4'>
           {
            alluser?.map(user => <PeopleCard
            key={user._id}
            users={user}
            ></PeopleCard>)
           }
        </div>
    );
};

export default People;