import React, { useContext, useState } from 'react'
import { AiOutlineHome, AiOutlineUsergroupAdd,AiOutlineUser,AiOutlineLogin,AiOutlineLogout } from "react-icons/ai";
import { CiYoutube,CiCalendar,CiFloppyDisk } from "react-icons/ci";
import { BsBellFill, BsMessenger, BsFacebook } from "react-icons/bs";


import { Link } from 'react-router-dom';
import friend from "../../../assest/friend.png"
import mostrecent from "../../../assest/most recent.png"
import gruph from "../../../assest/gruph.png"
import marketplace from "../../../assest/marketPlace.png"
import add from "../../../assest/addvertise.png"
import addmanager from "../../../assest/advertisemenager.png"
import blood from "../../../assest/blood.png"
import covid from "../../../assest/tree (4).png"
import crisis from "../../../assest/crisis.png"
import treePlan from "../../../assest/treeplan.png"
import { Authcontext } from '../../../Authprovider/Authprovide';
import { useQuery } from '@tanstack/react-query';



const Header = () => {

  const {user, userlogout} = useContext(Authcontext)
  const [search, setSearch] = useState('')

  const handleLogout = () =>{
    userlogout()
  }


  // const { data: getUsers, isLoading, refetch } = useQuery({
  //   queryKey: ['getUsers'],
  //   queryFn: async () => {
  //     const res = await fetch( `http://localhost:5000/getuser?name=${search}`)
  //     const data = res.json()
  //     return data
  //   },
  // })



  const menu=(
    <>
    
    <li className=' px-7 text-3xl tooltip tooltip-bottom text-slate-500' data-tip="Home"><Link to="/"><AiOutlineHome/></Link></li>
    <li className=' px-7 text-3xl tooltip tooltip-bottom text-slate-500' data-tip="watch"><Link to="/watch"><CiYoutube/></Link></li>
    <li className=' px-7 text-3xl tooltip tooltip-bottom text-slate-500' data-tip="MarketPlace"><Link><CiCalendar/></Link></li>
    <li className=' px-7 text-3xl tooltip tooltip-bottom text-slate-500' data-tip="Gruphs"><Link><AiOutlineUsergroupAdd/></Link></li>
    <li className=' px-7 text-3xl tooltip tooltip-bottom text-slate-500' data-tip="Gaming"><Link><CiFloppyDisk/></Link></li>

    </>
  )


  const hambargermenu =(
    <>
   
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/"><img className='' src={friend} alt="" />Home</Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/friend"><img className='' src={friend} alt="" />Friends</Link></li>    
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/people"><img className='' src={mostrecent} alt="" />People</Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/addcenter"><img className='' src={add} alt="" />Add Center</Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/"><img className='' src={addmanager} alt="" />AddManager</Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/"><img className='' src={gruph} alt="" />Gruph</Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/"><img className='' src={marketplace} alt="" />MarketPlace</Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/"><img className='' src={blood} alt="" /> Blood Donation</Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/"><img className='' src={treePlan} alt="" />Climate Science </Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/"><img className='' src={crisis} alt="" />Crisis Response </Link></li>
   <li className=' px-7 text-3xl pb-4' data-tip="Home"><Link to="/"><img className='' src={covid} alt="" />Covid-19 Information Center</Link></li>

           
    </>
  )

  return (
    <div className='bg-white shadow-md'>

<div className="navbar container mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-80">
       {hambargermenu}
      </ul>
    </div>

    <Link to="/" className=" text-4xl text-cyan-600 flex items-center"><BsFacebook/></Link><span>
    <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search here" className="input input-bordered w-full max-w-xs ml-3 border-none bg-gray-100 focus:border-none" /></span>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {menu}
    </ul>
  </div>
  <div className="navbar-end">
  <div className='mx-2'>
        <button className='btn bg-gray-300 border-none btn-ghost text-lg'><BsMessenger/></button>
    </div>
    <div className='mx-2'>
        <button className='btn bg-gray-300 border-none btn-ghost text-lg'><BsBellFill/></button>
    </div>
   

    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
          <img src={user?.photoURL} alt='...' />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-80 ">
      <li><Link to="/profile" className='text-lg pb-3 font-semibold'><AiOutlineUser/>Profile</Link></li>
      <li><Link className='text-lg pb-3 font-semibold'><AiOutlineUser/>Display & accessibility</Link></li>
      <li><Link to="/login" className='text-lg pb-3 font-semibold'><AiOutlineLogin/>login</Link></li>
      <li onClick={handleLogout}><Link to="#" className='text-lg pb-3 font-semibold'><AiOutlineLogout/>Logout</Link></li>
      </ul> 
    </div>


  </div>
  </div>
</div>

    
  )
}

export default Header
