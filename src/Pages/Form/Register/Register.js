import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Authcontext } from '../../../Authprovider/Authprovide'
import Loding from '../../Loding/Loding'
import { BeatLoader } from 'react-spinners'

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const { loading, userUpdet, signupUser } = useContext(Authcontext)
  const [registerLoading, setRegisterLoadin] = useState(false)
  const imghostKey = '4dd0f7d5470145ffaf1ef77741470a90'

  //  ===handleForm
  const handleForm = (data) => {
    setRegisterLoadin(true)
    const image = data.image[0]
    const formData = new FormData()
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?key=${imghostKey}`
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const userImg = imageData.data.url
          const name = data.name
          const email = data.email
          const password = data.password
          const city = data.city
          const education = data.education
          const userData = { userImg, name, email, password, city, education }

          signupUser(email, password)
            .then((result) => {
              const user = result.user
              userUpdet(name, userImg)
                .then(() => {
                  fetch('https://dailyface-server.vercel.app/user', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.acknowledged) {
                        toast.success('Successfully Create your account')
                        setRegisterLoadin(false)
                        reset()
                      }
                    })
                })
                .catch(() => {})
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
  }

  // if(registerLoading){
  //   return <Loding/>
  // }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow rounded md:w-3/4 w-full p-10">
          <p
            tabIndex={0}
            aria-label="Login to your account"
            className="text-2xl font-extrabold leading-6 text-gray-800"
          >
            Create Your Account
          </p>
          <p className="text-sm mt-4 font-medium leading-none text-gray-500 pb-4">
            Do you have already account
            <span
              tabIndex={0}
              role="link"
              aria-label="Sign up here"
              className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
            >
              {' '}
              <Link to="/login" className="text-cyan-500">
                Please sign in here
              </Link>
            </span>
          </p>

          <form onSubmit={handleSubmit(handleForm)}>
            <div className="pt-6">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Name
              </lable>
              <input
                type="text"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                {...register('name', {
                  required: true,
                })}
              />
            </div>

            <div className="mt-6 w-full">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Email
              </lable>
              <input
                type="email"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                {...register('email', {
                  required: true,
                })}
              />
              {errors.email && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>

            <div className="mt-6 w-full">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Password
              </lable>
              <input
                aria-label="enter Password"
                type="password"
                name="password"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 6,
                    message: 'Password must be 6 Charaters or longer',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="pt-6">
              <lable className="text-sm font-medium leading-none text-gray-800">
                City
              </lable>
              <input
                type="text"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                {...register('city', {
                  required: true,
                })}
              />
            </div>

            <div className="pt-6">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Education
              </lable>
              <input
                type="text"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                {...register('education', {
                  required: true,
                })}
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
                {...register('image', {
                  required: 'Image is required',
                })}
              />
              {errors.img && (
                <p className="text-red-800">{errors.img?.message}</p>
              )}
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
              >
                {registerLoading ? (
                  <>
                    <BeatLoader color="#ffffff" />
                  </>
                ) : (
                  <>Create an account</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
