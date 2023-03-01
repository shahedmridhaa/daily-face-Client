import React, { useContext, useState} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Authcontext } from '../../../Authprovider/Authprovide'
import { BeatLoader } from 'react-spinners';


const PostModal = ({time, refetch}) => {
  const { user } = useContext(Authcontext)
  const [postLoding, setPostLoding] = useState(false)
  
    const {register, handleSubmit, reset,} = useForm()
    const imghostKey = "4dd0f7d5470145ffaf1ef77741470a90"
    
  

    
 
  const handlePost = (data) =>{
  setPostLoding(true)
   const image = data.image[0]
   const formData = new FormData()
   formData.append("image", image)
   const url = `https://api.imgbb.com/1/upload?key=${imghostKey}`
   fetch(url,{
    method:"POST",
    body:formData
   })
   .then(res => res.json())
    .then(imgdata => {
        if(imgdata.success){
          const postInfo ={
            postImage : imgdata.data.url,
            textarea : data.textarea,
            userImg : user?.photoURL ,
            userName: user?.displayName,
            userEmail : user?.email,
            postTime : time,
            postLike :10,
            }

            fetch('http://localhost:5000/userPost',{
              method: "POST",
              headers: {
               'content-type': "application/json"
              },
              body: JSON.stringify(postInfo) 
              })
              .then(res => res.json())
              .then(data =>{
                console.log(data);
           if(data.acknowledged){
             toast.success('Successfully create your post')
             setPostLoding(false)
             reset()
             refetch()
             
           }
         })
           
        }
    })

    

    }


  return (
    <div>
      <input type="checkbox" id="postmodal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="postmodal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold pb-6">
            Create Post
          </h3>
          <form onSubmit={handleSubmit(handlePost)}>
          <textarea name="textfield" className="textarea textarea-bordered w-full" placeholder='Write here...'
          {...register("textarea")}/>
         
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

            <button type="submit" className='btn btn-success w-full mt-6 text-white'>
           
               {
                postLoding ?
        
                <BeatLoader color="#ffffff" />
                :
               "post"
                
               }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostModal
