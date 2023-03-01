import React, { useContext, useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineEllipsis } from 'react-icons/ai'
import { BiCommentDots, BiLike, BiShareAlt } from 'react-icons/bi'
import { BsFillBookmarksFill } from 'react-icons/bs'
import { Authcontext } from '../../Authprovider/Authprovide'

const ProfileCard = ({ userPost, refetch }) => {
  const [showComment, setShowComment] = useState([])
  const [loadComment, setLoadComment] = useState(true)
  const { user } = useContext(Authcontext)
  let time = new Date().toLocaleTimeString()

  const {
    userName,
    userImg,
    textarea,
    postTime,
    postLike,
    postImage,
    _id,
  } = userPost

  // ===handle Comment===
  const handleComment = (e) => {
    e.preventDefault()
    const comments = e.target.comment.value
    const commentInfo = {
      comments: comments,
      postId: _id,
      user: user?.displayName,
      userImg: user?.photoURL,
      commentTime: time,
    }
    fetch('https://dailyface-server.vercel.app/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch()
          e.target.reset()
          setLoadComment(false)
        }
      })
  }

  useEffect(() => {
    fetch(`http://localhost:5000/userPost/${_id}`)
      .then((res) => res.json())
      .then((data) => setShowComment(data))
  }, [_id, loadComment])

  
  return (
    <div>
      <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-md mt-4 bg-white">
        <div className="flex justify-between">
          <div>
            <div className="flex space-x-4 pb-4">
              <img
                alt=""
                src={userImg}
                className="object-cover w-12 rounded-full shadow dark:bg-gray-500"
              />
              <div className="flex flex-col space-y-1">
                <h3 className="text-sm font-semibold">{userName}</h3>
                <span className="text-xs dark:text-gray-400">{postTime}</span>
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-600">{textarea}</p>
            </div>
          </div>

          <div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="text-3xl">
                <AiOutlineEllipsis />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>
                    <BsFillBookmarksFill />
                    Save Post
                  </a>
                </li>
                <li>
                  <a>
                    <span className="text-green-800 text-lg">
                      <AiFillEdit />
                    </span>
                    Edit Post
                  </a>
                </li>
                <li>
                  <a>
                    <span className="text-red-800 text-lg">
                      <AiFillDelete />
                    </span>
                    Delete Post
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <img
            src={postImage}
            alt=""
            className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
          />
        </div>

        {/* ===button==== */}

        <div className="flex flex-wrap justify-between">
          <div className="flex space-x-2 text-sm dark:text-gray-400">
            <button
              type="button"
              className="flex items-center p-1 space-x-1.5 text-xl"
            >
              <span
                className="text-emerald-600"
                // onClick={() => handleLike(_id)}
              >
                <BiLike />
              </span>

              <span>{postLike}</span>
            </button>

            <button
              type="button"
              className="flex items-center p-1 space-x-1.5 text-xl"
            >
              <span className="text-emerald-600">
                <BiCommentDots />
              </span>
              <span>{showComment.length}</span>
            </button>
          </div>
          <div className="space-x-2">
            <button
              aria-label="Share this post"
              type="button"
              className="p-2 text-center text-xl"
            >
              <span className="text-emerald-600">
                <BiShareAlt />
              </span>
            </button>
          </div>
        </div>
        <hr />

        {/* ====comment field===== */}
        <div className=" ">
          <form
            onSubmit={handleComment}
            className="create-comment flex relative"
          >
            <input
              type="text"
              name="comment"
              className="focus:outline-none input input-bordered  px-5 py-2 text-base w-full"
              placeholder="Add a Comment..."
              id="create-post"
            />
            <input
              type="submit"
              value="Comment"
              className="btn bg-emerald-600 border-none absolute top-0 right-0 rounded-full"
            />
          </form>
        </div>

        {/* ==show comment=== */}
        <div>
          {showComment?.map((comment) => (
            <div>
              <div className=" bg-slate-50 inline-block py-2 px-6 rounded-lg my-2">
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="rounded-full w-12 h-12">
                      <img
                        src={comment?.userImg}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{comment?.user}</div>
                    <div className="text-sm opacity-50">
                      {comment?.comments}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
