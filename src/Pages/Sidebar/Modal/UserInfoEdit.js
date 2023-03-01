import React from 'react'
import { toast } from 'react-hot-toast'

const UserInfoEdit = ({ userOldInfo, refetch }) => {
  const handleform = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const city = form.city.value
    const education = form.education.value
    const id = userOldInfo?._id
    const updetInformation = {
      name: name,
      email: email,
      city: city,
      education: education,
    }
    //    ===user updet data===
    fetch(`https://dailyface-server.vercel.app/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updetInformation),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success('successFully Updet user')
          refetch()
          form.reset()
        }
      })
  }

  return (
    <div>
      <input type="checkbox" id="updetUserInfo" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="updetUserInfo"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            If need updet to your information!
          </h3>
          <form onSubmit={handleform}>
            <div className="pt-10">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Name
              </lable>
              <input
                type="text"
                name="name"
                defaultValue={userOldInfo?.name}
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>

            <div className="mt-6 w-full">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Email
              </lable>
              <input
                type="email"
                name="email"
                defaultValue={userOldInfo?.email}
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div className="mt-6 w-full">
              <lable className="text-sm font-medium leading-none text-gray-800">
                City
              </lable>
              <input
                type="text"
                name="city"
                defaultValue={userOldInfo?.city}
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div className="mt-6 w-full">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Education
              </lable>
              <input
                type="text"
                name="education"
                defaultValue={userOldInfo?.education}
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
              >
                Updet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserInfoEdit
