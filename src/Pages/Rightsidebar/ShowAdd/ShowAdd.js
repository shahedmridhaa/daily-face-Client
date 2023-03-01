import React, { useRef, useState } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/scrollbar'
import './showadd.css'
import { Scrollbar } from 'swiper'
import { useQuery } from '@tanstack/react-query'

const ShowAdd = () => {
  const { data: allAdds, isLoading, refetch } = useQuery({
    queryKey: ['allAdds'],
    queryFn: async () => {
      const res = await fetch('https://dailyface-server.vercel.app/alladd')
      const data = res.json()
      return data
    },
  })

  return (
    <div className="shadow-sm rounded-md p-4">
      <>
        <Swiper
          spaceBetween={60}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar, Autoplay]}
          className="mySwiper"
        >
          {allAdds?.map((add) => (
            <SwiperSlide>
              <div className=" w-full h-32 bg-base-100  image-full">
                <figure>
                  <img src={add?.addImg} alt="images" />
                </figure>
                <div className="card-body">
                  <h2 className="text-md">{add?.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  )
}

export default ShowAdd
