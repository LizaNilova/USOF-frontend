import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts } from '../redux/features/post/postSlice'
import { PostItem } from "../components/PostItem"
import { getAllCategories } from "../redux/features/categories/categorySlice"


export const MyPostsPage = () => {
    const dispatch = useDispatch()
    const { myPosts } = useSelector(state => state.post)
    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(getMyPosts())
        dispatch(getAllCategories())
    }, [dispatch])

    if (!myPosts.length) {
        return (<div>
            There is no posts for now. But you can create the first one.
            <button>Create post</button>
        </div>)
    }


    return <div className="max-w-[900px] mx-auto py-10">
            <div className="flex flex-col gap-5">
                {
                    myPosts?.map((post, index) => (
                        <PostItem key={index} post={post} categories={categories} />
                    ))
                }

            </div>
    </div>
}