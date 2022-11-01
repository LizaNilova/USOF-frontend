import React, { useState } from "react"
import Moment from "react-moment"
import { useDispatch, useSelector } from "react-redux";

import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify'

import axios from "../utils/axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostCategories, getPostDislikes, getPostLikes, removePost } from "../redux/features/post/postSlice";
import { createComment, getAllPostComments } from "../redux/features/comment/commentSlice";
import { useEffect } from "react";
import { CommentItem } from "../components/CommentItem";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { getMe } from "../redux/features/auth/authSlice";

import { createLikeUnderPost } from "../redux/features/post/postSlice";
import { getAllUsers } from "../redux/features/user/userSlice";

export const PostPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

   
    const [post, setPost] = useState(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    })
    const [comment, setComment] = useState('')
    const { comments } = useSelector(state => state.comment)
    const { postCategories } = useSelector(state => state.post)

    const [countCmts, setCountCmts] = useState(0)

    const searchForCommentAuthor = (comment) => {
        for (let i = 0; i < users?.length; i++){
            if(users[i]?._id === comment.author){
                return {
                    userID: users[i]._id,
                    userRole: users[i].role,
                    image: `http://localhost:3001/${users[i].profile_picture}`,
                    userExists: true
                }
            }
        }
        return {
            userID: null,
            userRole: 'user',
            image: 'http://localhost:3001/userAvatar.png',
            userExists: false
        }
    }

    const searchForPostAuthor = (post) => {
        for (let i = 0; i < users?.length; i++){
            if(users[i]?._id === post.author){
                return true
            }
        }
        return false
    }

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Post was deleted.')
            if(me?.role === 'admin' && post.author !== me?._id){
                navigate('/')
            } else {
                navigate('/my_posts')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({ postId, comment }))
            setComment('')
            setCountCmts(countCmts + 1)
        } catch (error) {
            console.log(error)
        }
    }

    const [ratingPost, setRatingPost] = useState(0)
    const { likes } = useSelector(state => state.post)
    const { dislikes } = useSelector(state => state.post)


    const postID = params.id
    const { me } = useSelector(state => state.auth)
    const { users } = useSelector(state => state.user)

    const [isClickedLike, setIsClickedLike] = useState(
        async() => {
            const {data} = await axios.get(`/posts/${postID}/like`)
            if(data.length != 0){
                if(data[0].type === 'like' && data[0].author === me?._id){
                    setIsClickedLike(true)
                } else {
                    setIsClickedLike(false)
                }
            } else {
                setIsClickedLike(false)
            }
        }
    )


    const [isClickedDislike, setIsClickedDislike] = useState(
        async() => {
            const {data} = await axios.get(`/posts/${postID}/like`)
            if(data.length != 0){
                if(data && data[0].type === 'dislike' && data[0].author === me._id){
                    setIsClickedDislike(true)
                } else {
                    setIsClickedDislike(false)
                }
            } else {
                setIsClickedDislike(false)
            }
            
        }
    )

    const onClickDislikeHandler = () => {
        if (isClickedDislike) {
            setIsClickedDislike(false)
            setRatingPost(ratingPost + 1)
        } else {
            setIsClickedDislike(true)
            if(isClickedLike){
                setRatingPost(ratingPost - 2)
            } else {
                setRatingPost(ratingPost - 1)
            }
            setIsClickedLike(false)
        }

        if (!me) {
            console.log("You are not authorized.")
            return
        } else {
            dispatch(createLikeUnderPost({ type: 'dislike', postId: postID }))
        }
    }

    const onClickLikeHandler = () => {
        if (isClickedLike) {
            setIsClickedLike(false)
            setRatingPost(ratingPost - 1)
            
        } else {
            setIsClickedLike(true)
            if(isClickedDislike){
                setRatingPost(ratingPost + 2)
            } else {
                setRatingPost(ratingPost + 1)
            }

            setIsClickedDislike(false)
        }

        // console.log(isClickedLike)

        if (!me) {
            console.log("You are not authorized.")
            return
        } else {
            // console.log('hellos')
            dispatch(createLikeUnderPost({ type: 'like', postId: postID }))
        }
    }

    useEffect(() => {
        dispatch(getMe())
        dispatch(getAllUsers())
        dispatch(getAllPostComments(params.id))
        setCountCmts(comments?.length)
        dispatch(getPostCategories(params.id))
        dispatch(getPostLikes(params.id))
        dispatch(getPostDislikes(params.id))
        setRatingPost(likes.length - dislikes.length)
    }, [params.id, likes.length, dislikes.length, dispatch, comments?.length])


    if (!post) {
        return (<div>Loading...</div>)
    }

    return (<div className="mx-auto py-10 max-w-[900px]">
        <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
            Back
        </button>

        <div className="flex flex-col py-8">
            <div className="text-md text-white opacity-50">
                {
                searchForPostAuthor(post) ? (
                    post.authors_name
                ) : (
                    `${post.authors_name} (deleted user)`
                )
                }
            </div>
            <div className="flex flex-row items-center gap-10">
                <div className="flex flex-col mt-10 gap-3 items-center">

                    <div onClick={onClickLikeHandler}>
                        {
                            isClickedLike ? (<ThumbUpIcon />) : (<ThumbUpOutlinedIcon />)
                        }
                    </div>

                    <span className="text-white text-xl">{ratingPost}</span>

                    <div onClick={onClickDislikeHandler}>
                        {
                            isClickedDislike ? (<ThumbDownAltIcon />) : (<ThumbDownAltOutlinedIcon />)
                        }
                    </div>
                </div>
                <div className="flex mt-10 flex-col">
                    <div className="text-white text-xl">
                        {post.title}
                    </div>
                    <div className="flex justify-left gap-10 items-center pt-2 ">
                        <div className="text-xs text-white opacity-50">
                            Posted <Moment date={post.createdAt} format='D MMM YYYY' />
                        </div>
                        <div className="text-xs text-white opacity-50">
                            Modified <Moment date={post.modified_date} format='D MMM YYYY' />
                        </div>
                    </div>

                    <div className="flex w-full mt-5 space-x-4">
                        {
                            postCategories?.map((category, index) => (
                                <Link 
                                    to={`/categories/${category._id}`} 
                                    className=" bg-blue-400 rounded-md text-xs p-1 " 
                                    key={index}
                                    >#{category.title}</Link>
                            ))
                        }
                    </div>
                </div>
            </div>


            <br />

            <div >
                <div className="flex flex-col basis-1/4 flex-grow">
                    <p className="text-white break-all opacity-60 text-md pt-4">
                        {post.content}
                    </p>

                    <br />
                    <div className='flex rounded-sm'>
                        {post?.imagesUrl && (
                            <img
                                src={`http://localhost:3001/${post.imagesUrl}`}
                                alt='post images'
                                className="object-cover w-full"
                            />
                        )}
                    </div>

                    <br /><br />

                    <div className="flex gap-3 items-center mt-2 justify-between">
                        <div className="flex gap-3 mt-4">
                            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                <EyeIcon /> <span>{post?.views}</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                <CommentIcon />
                                <span>{countCmts}</span>
                            </button>
                        </div>
                        {(me?._id === post.author || me?.role === 'admin') &&
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => { 
                                        navigate(`/${post._id}/edit`) 
                                    }}
                                    className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                    <EditIcon />

                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                    <DeleteIcon />
                                </button>
                            </div>}
                    </div>
                </div>
            </div>

            <br />

            <div className="p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
                <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                    <input type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Comment"
                        className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700">

                    </input>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className="felx justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                    >Send comment</button>
                </form>
                {
                    comments?.map((comment) => (
                        <CommentItem 
                            key={comment._id} 
                            comment={comment} 
                            res={searchForCommentAuthor(comment)}
                            me={me}/>
                    ))
                }
            </div>
        </div>
    </div>
    )
}