import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { Authcontext } from '../../../Authprovider/Authprovide';

const Login = () => {
    const {loginUser} = useContext(Authcontext)
    const { register,handleSubmit,formState: { errors }} = useForm()

    const handleuserLogin = (data) => {
      loginUser(data.email, data.password)
        .then((result) => {
          const user = result.user
          toast.success('Successfully Login')
        })
        .catch((err) => {
          console.log(err)
          toast.error('Your are not a valid user')
        })
    }

    return (
        <div>
          <div className="flex items-center justify-center">
            <div className="bg-white shadow rounded md:w-3/4 w-full p-10">
              <p
                tabIndex={0}
                aria-label="Login to your account"
                className="text-2xl font-extrabold leading-6 text-gray-800"
              >
                Login Your Account
              </p>
              <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                Do you have an account
                <span
                  tabIndex={0}
                  role="link"
                  aria-label="Sign up here"
                  className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
                >
                  {' '}
                  <Link to="/regester" className="text-cyan-500">
                    Please Sign up here
                  </Link>
                </span>
              </p>
    
              <form onSubmit={handleSubmit(handleuserLogin)}>
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
    
                 
    
    
                <div className="mt-8">
                  <button
                    type="submit"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                  >
                    Login an account
                  </button>
                </div>
              </form>
    
             
            </div>
          </div>
        </div>
      )
};

export default Login;