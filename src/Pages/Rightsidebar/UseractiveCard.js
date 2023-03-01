import React from 'react';

const UseractiveCard = ({alluser}) => {
    const {userImg,name} = alluser
    return (
        <div>
            <div className="flex items-center pb-3">
        <div>
          <div className="avatar online placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <img src={userImg} alt="..."/>
            </div>
          </div>
        </div>
        <h3 className="text-base-500 text-lg pl-9 pb-4">
         {name}
        </h3>
      </div>
        </div>
    );
};

export default UseractiveCard;