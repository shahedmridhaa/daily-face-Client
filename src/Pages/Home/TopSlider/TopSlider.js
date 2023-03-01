import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./topSlider.css";
import { Navigation } from "swiper";
import { Authcontext } from "../../../Authprovider/Authprovide";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BeatLoader } from 'react-spinners'
import { useQuery } from "@tanstack/react-query";



const TopSlider = () => {

  const { user } = useContext(Authcontext)
  const [upload, setUpload] = useState(false)
  const [load, setLoad] = useState(true)
  const imghostKey = "4dd0f7d5470145ffaf1ef77741470a90"
  const {register, handleSubmit,} = useForm()



// ====data fetch===
  const{data:allStory, isLoading, refetch} = useQuery({
    queryKey : ['userStory'],
    queryFn: async() =>{
      const res = await fetch ('http://localhost:5000/storyData')
      const data = res.json()
      return data
    }
  })

  

  // ====story Post===
  const handleStory = (data) =>{
    setUpload(true)
    const image = data.image[0]
    const formData= new FormData()
    formData.append("image", image)
    const url = `https://api.imgbb.com/1/upload?key=${imghostKey}`
    fetch(url,{
      method:"POST",
      body:formData
     })
     .then(res => res.json())
     .then(imgdata =>{
      if(imgdata.success){
        const storyInfo ={
          storyimg : imgdata.data.url,
          userName: user.displayName,
          userImg :user.photoURL,
          userEmail :user.email
        }
        fetch('http://localhost:5000/userStory',{
          method: "POST",
          headers: {
           'content-type': "application/json"
          },
          body: JSON.stringify(storyInfo) 
          })
          .then(res => res.json())
          .then(data => {
            if(data.acknowledged){
              toast.success('successfully upload')
              setUpload(false)
              refetch()
            }
          })
        

      }
     })    
  }







    return (
        <div className="grid grid-cols-5 bg-white shadow-sm rounded-md p-4 mt-3 " >

   {/* ==create story=== */}
 <div className="mr-3 flex justify-center items-center">
 <div className="w-36 h-52 rounded-xl overflow-hidden flex flex-col group cursor-pointer relative">
            <img className="w-full h-4/5 object-cover transition duration-300 ease-in-out transform group-hover:scale-105" src={user?.photoURL} alt="developer"/>
          <form onSubmit={handleSubmit(handleStory)}>
          <div className=" relative flex-1 flex flex-col">
          <input
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 flex"
                type="file"
                {...register('image')}
              /> 
            <button type="submit" className="className='btn bg-[#0891b2] w-full text-white">
              {
               upload ?
                <>
                
              <BeatLoader color="#ffffff" />
                </>
                : 
                <>Submit</>
             }
            </button>
            </div>
          </form>

            <div className="absolute bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
        </div>
       </div>




    {/*show story  */}
   <div className=' gird col-span-4'>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[ Navigation]}
        className="mySwiper"
      >
       {
        allStory?.map(story => 
          <SwiperSlide>
          <div className="w-36 h-52 rounded-xl overflow-hidden flex flex-col relative group cursor-pointer">
              <img className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-105" src={story.storyimg} alt="MD. Shibbir Ahmed"/>
  
              <div className="w-8 h-8 border-4 box-content border-blue-600 rounded-full overflow-hidden absolute left-2.5 top-3">
                  <img className="w-full h-full object-cover" src={story.userImg} alt="MD. Shibbir Ahmed"/>
              </div>
  
              <div className="absolute inset-x-3 bottom-1">
                  <p className="text-white">{story.userName}</p>
              </div>
  
              <div className="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
  
          </div>
          </SwiperSlide>
        )
       }
       
      </Swiper>
    </div>
    
        </div>
    );
};

export default TopSlider;