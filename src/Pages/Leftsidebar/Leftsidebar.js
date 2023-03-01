import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import friend from "../../assest/friend.png"
import mostrecent from "../../assest/most recent.png"
import gruph from "../../assest/gruph.png"
import marketplace from "../../assest/marketPlace.png"
import watch from"../../assest/Watch.png"
import add from "../../assest/addvertise.png"
import addmanager from "../../assest/advertisemenager.png"
import blood from "../../assest/blood.png"
import covid from "../../assest/tree (4).png"
import crisis from "../../assest/crisis.png"
import treePlan from "../../assest/treeplan.png"
import { Authcontext } from '../../Authprovider/Authprovide';


const Leftsidebar = () => {
    const {user} = useContext(Authcontext)
    return (
        <div >
      

   <Link to="/profile">
   <div className="bg-white py-2 px-4  mb-4 rounded-lg my-2">
           <div className='flex items-center space-x-3'>
           <div className="avatar">
              <div className="rounded-full w-12 h-12">
                <img  src={user?.photoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">{user?.displayName}</div>
            </div>
           </div>
          </div>
   </Link>



           <ul className=''>
            <Link to="/friend">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className='' src={friend} alt="" /></div> Friends
                </li>
            </Link>
            <Link to="/people">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={mostrecent} alt="" /></div>People
                </li>
            </Link>
            <Link to="/addcenter">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={add} alt="" /></div> Add Center
                </li>
            </Link>
            <Link to="#">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={addmanager} alt="" /></div> AddManager
                </li>
            </Link>
            <Link to="#">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={gruph} alt="" /></div> Gruph
                </li>
            </Link>
            <Link to="#">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={marketplace} alt="" /></div> MarketPlace
                </li>
            </Link>
            <Link to="#">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={watch} alt="" /></div> Watch
                </li>
            </Link>
            <Link to="#">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={blood} alt="" /></div> Blood Donation
                </li>
            </Link>
            <Link to="#">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={treePlan} alt="" /></div> Climate Science
                </li>
            </Link>
            <Link to="#">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={crisis} alt="" /></div> Crisis Response
                </li>
            </Link>
            <Link to="#">
                <li className='flex items-center px-4 text-lg text-base-500 pb-6 font-medium'>
                    <div className='w-16'><img className=''  src={covid} alt="" /></div> Covid-19 Information Center
                </li>
            </Link>
           
           </ul>
        </div>
    );
};

export default Leftsidebar;