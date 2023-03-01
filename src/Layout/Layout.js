import React from 'react'
import { Outlet } from 'react-router-dom'
import Leftsidebar from '../Pages/Leftsidebar/Leftsidebar'
import Rightsidebar from '../Pages/Rightsidebar/Rightsidebar'
import Footer from '../Pages/SharedPages/Footer/Footer'
import Header from '../Pages/SharedPages/Header/Header'

const Layout = () => {
  return (
    // <div>
    //     <Header></Header>
    // <div className='container mx-auto'>
    //     <div className='grid grid-cols-1 lg:grid-cols-4 gap-32 mt-8'>
    //         <div className='hidden lg:flex'>
    //         <Leftsidebar></Leftsidebar>
    //         </div>

    //         <div className='col-span-2'>
    //         <Outlet ></Outlet>
    //         </div>

    //         <div className='hidden lg:flex '>
    //         <Rightsidebar></Rightsidebar>
    //         </div>
    //     </div>

    //     <Footer></Footer>
    // </div>
    // </div>

    <div>
      <div>
        <Header></Header>
        <div className="container mx-auto">
          <div className="flex">
            <div className="hidden lg:flex w-2/4">
              <Leftsidebar></Leftsidebar>
            </div>

        <div className="w-full lg:mx-10 lg:w-2/4">
              <Outlet></Outlet>
            </div>

            <div className="hidden lg:flex w-1/4">
              <Rightsidebar></Rightsidebar>
            </div>
          </div>

          <Footer></Footer>
        </div>
      </div>
    </div>
  )
}

export default Layout
