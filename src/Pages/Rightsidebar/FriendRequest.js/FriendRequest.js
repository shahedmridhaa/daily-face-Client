import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Authcontext } from '../../../Authprovider/Authprovide';

const FriendRequest = ({request}) => {
    const [ confirmBtn, setConfirmBtn] = useState(true)
    const {user} = useContext(Authcontext)
    const {send_User_img, send_User_Name, send_User_email, get_user_id, _id} = request
   

  const handleConfirm = id =>{
     const friend_name = send_User_Name
     const friend_email = send_User_email
     const friend_img = send_User_img
     const friend_id = id
     const accept_email = user?.email
     const accept_name = user?.displayNam
     const friendInfo = {
         friend_name,
         friend_email,
         friend_img,
         friend_id,
         accept_email,
         accept_name
     }
     fetch('http://localhost:5000/accepted',{
         method:"POST",
         headers:{
             "content-type" : "application/json"
         },
         body: JSON.stringify(friendInfo)
     })
     .then(res => res.json())
     .then(data => {
         if(data.acknowledged){
             setConfirmBtn(false)
             toast.success(`Now ${friend_name} is Your Frined`)
         }
     })
    
  }


    return (
        <div className="card card-side">
                <div className="mt-8 ">
             <div className="rounded-full ring ring-primary ring-offset-base-100 w-12 ring-offset-2">
              <img
                className="rounded-full"
                src={send_User_img}
                alt=""
              />
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title">{send_User_Name}</h2>
            <p className="flex">
              <div className="avatar-group -space-x-6">
                <div className="avatar">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
              </div>
              Menual friend
            </p>
            <div className="card-actions">
            {
                confirmBtn?
                <>
                  <button onClick={() => handleConfirm(_id)}  className="btn bg-cyan-600 border-none btn-sm text-white">
                Confirm
              </button>
                </>:
                <>
                  <button  className="btn bg-cyan-800 border-none btn-sm text-white">
                Accepted
              </button>
                </>
            }
              <button className="btn btn-active btn-ghost btn-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
    );
};

export default FriendRequest;