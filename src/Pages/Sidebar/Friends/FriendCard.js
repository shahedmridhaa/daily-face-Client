import React from 'react';
import { Link } from 'react-router-dom';

const FriendCard = ({friend}) => {
    console.log(friend);
    const {friend_img, friend_name} = friend
    return (
        <div className="">
        <div className=" bg-white border shadow-sm rounded-xl hover:shadow-xl transition ">
          <div className="text-center pt-2">
            <img
              className="w-28 rounded-full inline-block"
              src={friend_img}
              alt="..."
            />
          </div>
          <div className="p-4 md:p-5 text-center">
            <h3 className="text-lg font-bold">{friend_name}</h3>
  
            <div className=" py-3">
              <button  className="btn btn-sm border-none bg-gradient-to-r from-cyan-500 to-blue-500 mb-2"> See Profile</button>
              <Link>
              <button className="btn btn-sm border-none">Delete</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FriendCard;