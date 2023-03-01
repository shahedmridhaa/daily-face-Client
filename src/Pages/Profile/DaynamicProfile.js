import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AiFillEnvironment, AiOutlineMail, AiTwotoneBook } from 'react-icons/ai';
import { useLoaderData } from 'react-router-dom';
import { Authcontext } from '../../Authprovider/Authprovide';
import Loding from '../Loding/Loding';
import Header from '../SharedPages/Header/Header';
import DaynamicCard from './DaynamicCard';
import ProfileCard from './ProfileCard';

const DaynamicProfile = () => {
    const data = useLoaderData()
  
    const {_id ,userImg,name,email,education,city} = data
    
    const {data:userProfileData, isLoading, refetch } = useQuery({
      queryKey: ['userProifle'],
      queryFn: async () => {
        const res = await fetch(
                   `http://localhost:5000/profileData?email=${email}`,
        )
        const data = res.json()
        return data
      }
    })
    console.log(userProfileData);


    if(isLoading){
      return <Loding/>
    }

    return (
       <div>
        <Header/>
         <div className='container mx-auto'>
        <section>
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
              src={userImg}
              alt="profile"
            />
          </div>
          <div className="text-center py-5">
            <h3 className="text-3xl font-bold">{name}</h3>
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

      {/* Pofile postbar & others */}
      <div className='sm:flex-wrap lg:flex'>

        {/* profile left side */}
       <div className='sm:w-full lg:w-1/3'>
        <div className='bg-white mr-4 p-4 mt-4 rounded-md'>
          <h2 className='text-xl font-semibold pb-3'>Intro</h2>
            <div className='text-lg text-gray-700 font-medium py-3 flex items-center'>
         <span className='text-2xl'><AiTwotoneBook/></span> <h3 className='w-28 pl-2'>Education:</h3>
          <p>{education}</p>
          </div>
          <div className='text-lg text-gray-700 font-medium py-3 flex items-center pt-5'>
          <span className='text-red-800 text-2xl '><AiOutlineMail/></span><h3 className='w-24 pl-2'>Email:</h3>
          <p>{email}</p>
          </div>
          <div className='text-lg text-gray-700 font-medium py-3 flex items-center pb-5'>
         <span className='text-green-800 text-2xl'><AiFillEnvironment/></span> <h3 className='w-24 pl-2'>City:</h3>
        <p>{city}</p>
          </div>
          
        </div>
       </div>



       {/* ==profile right side */}
       <div className='sm:w-full lg:w-2/3'>

          <div>
      {
        userProfileData?.map(userPosts => <DaynamicCard
        key={userPosts._id}
        userPosts={userPosts}
        refetch={refetch}
        ></DaynamicCard>)
      }
        </div>

       </div>
      </div>
    
     </div>
    </div>
    );
};

export default DaynamicProfile;