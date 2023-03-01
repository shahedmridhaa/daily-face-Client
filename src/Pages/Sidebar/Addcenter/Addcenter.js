import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'

const Addcenter = () => {
  const { register, handleSubmit, reset } = useForm()
  const [add, setAdd] = useState(false)
  const [addShow, setAddShow] = useState(true)
  const imghostKey = '4dd0f7d5470145ffaf1ef77741470a90'

  const handleAdd = (data) => {
    setAdd(true)
    const image = data.image[0]
    const formData = new FormData()
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?key=${imghostKey}`
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imgdata) => {
        if (imgdata.success) {
          const addImage = imgdata.data.url
          const addText = data.message
          const title = data.title
          const addInfo = {
            addImg: addImage,
            addcontent: addText,
            title: title,
          }
          fetch('https://dailyface-server.vercel.app/add', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(addInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success('Successfully Create Your Post')
                setAdd(false)
                setAddShow(false)
                reset()
              }
            })
        }
      })
  }

  return (
    <div>
      <div className="flex items-center justify-center my-4">
        <div className="bg-white shadow rounded md:w-3/4 w-full p-10">
          <p
            tabIndex={0}
            aria-label="Login to your account"
            className="text-2xl font-extrabold leading-6 text-gray-800"
          >
           Create Your Add
          </p>

          <form onSubmit={handleSubmit(handleAdd)}>
            <div className="pt-6">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Title
              </lable>
              <input
                type="title"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                {...register('title')}
              />
            </div>

            <div className="pt-6">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Message
              </lable>
              <textarea
                type="text"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                {...register('message')}
              />
            </div>

            <div className="mt-6 w-full">
              <label className="text-sm font-medium leading-none text-gray-800">
                Image
              </label>
              <input
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                type="file"
                placeholder="Upload here"
                {...register('image')}
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
              >
                {
                add ? (
              <>
                <BeatLoader color="#ffffff" />
              </>
            ) : (
              <>Create Add</>
            )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addcenter
