import React, { useState } from "react";
import { Link } from 'react-router-dom'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Moment from 'react-moment'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "../redux/features/user/userSlice";


export const PostItem = ({ post, categories }) => {
    const dispatch = useDispatch()

    const postCategories = []
    for (let i = 0; i < post.categories.length; i++) {
        for (let j = 0; j < categories.length; j++) {
            if (post.categories[i] === categories[j]._id) {
                postCategories.push(categories[j])
            }
        }
    }

    useEffect(() => {
        dispatch(getUserById(post.author))
    }, [dispatch, post.author])


    return (
        <Link to={`/${post._id}`}>
            <div className="flex border-gray-800 border-2 flex-row basis-1/4 flex-grow space-x-10 bg-slate-200 rounded-xl px-6 py-4">
                <div className="flex flex-col justify-center basis-1/12">
                    <button className="flex items-center justify-center gap-2 text-xs text-black">
                        <EyeIcon /> <span>{post.views}</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 text-xs text-black">
                        <CommentIcon /> <span>{post.comments?.length}</span>
                    </button>
                </div>
                <div className="flex flex-col basis-4/5">
                    <div className="flex justify-between items-center pt-2">

                    </div>
                    <div className="text-black text-xl">{post.title}</div>
                    <p className="text-black text-xs break-all pt-4">{post.content}</p>

                    <br />

                    <div className="flex justify-items-end space-x-7 flex-row w-full">

                        <div className="flex-wrap justify-between space-x-2 basis-2/4 justify">
                            {
                                postCategories?.map((category, index) => (

                                    <Link to={`/categories/${category._id}`} className=" bg-emerald-500 rounded-md text-xs p-1" key={index}>#{category.title}</Link>
                                ))
                            }
                        </div>

                        <Link to={`/users/${post.author}`} className="text-xs text-black mb-0 basis-1/12">{post.authors_name}</Link>
                        {/* <div className="text-xs text-black basis-1/12">{user.rating}</div> */}
                        <div className="text-xs text-black">
                            <Moment date={post.createdAt} format='D MMM YYYY' /></div>

                    </div>


                </div>
            </div>
        </Link >)
}