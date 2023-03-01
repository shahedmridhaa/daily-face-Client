import React, { useContext } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Authcontext } from '../../../Authprovider/Authprovide';

const PeopleCard = ({ users }) => {
  
 const { name, userImg, _id, email } = users
 const {user} = useContext(Authcontext)
 

 const handleAdd = (email, id) =>{
   const send_User_Name = user?.displayName
   const send_User_email = user?.email
   const send_User_img = user?.photoURL
   const get_user_email = email
   const get_user_id = id

   const requestInfo = {
    send_User_Name,
    send_User_email,
    send_User_img,
    get_user_email,
    get_user_id
   }   
    
    fetch('http://localhost:5000/sendRequest',{
      method:"POST",
      headers:{
        'content-type': "application/json"
      },
      body:JSON.stringify(requestInfo)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.acknowledged){
        toast.success(`send friend request from ${name}`)
      }
    })
  }


  return (
    <div className="">
      <div className=" bg-white border shadow-sm rounded-xl hover:shadow-xl transition ">
        <div className="text-center pt-2">
          <img
            className="w-28 rounded-full inline-block"
            src={userImg}
            alt="..."
          />
        </div>
        <div className="p-4 md:p-5 text-center">
          <h3 className="text-lg font-bold">{name}</h3>

          <div className=" py-3">
            <button onClick={() => handleAdd(email, _id)} className="btn btn-sm border-none bg-gradient-to-r from-cyan-500 to-blue-500 mb-2">Add friend</button>
            <Link to={`/user/${_id}`}>
            <button className="btn btn-sm border-none">See Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeopleCard
