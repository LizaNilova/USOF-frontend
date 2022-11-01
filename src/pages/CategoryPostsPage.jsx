import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getAllPostsWithCurCategory, getCategoryById } from "../redux/features/categories/categorySlice";
import { PostItem } from "../components/PostItem"

import { useParams } from "react-router-dom";

export const CategoryPostsPage = () => {
    const { category } = useSelector(state => state.category)
    const { categories } = useSelector(state => state.category)
    const { postsWithCurCategory } = useSelector(state => state.category)

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getCategoryById(params.id_category))
        dispatch(getAllCategories())
        dispatch(getAllPostsWithCurCategory(params.id_category))
    }, [dispatch, params.id_category])

    if (!category) {
        return <div>Something went wrong</div>
    }

    return <div className="flex flex-col max-w-[900px] mx-auto justify-center">
        <div className="flex flex-col gap-5">
            <h1 className="text-3xl text-white">Post tagged [{category.title}]</h1>
            <p className="text-xs text-white">{category.description}</p>
            <div className="text-xl text-white ml-2">{postsWithCurCategory.length} posts with this category</div>
            <div>FILTERS</div>
        </div>
        <div className="flex flex-col gap-5 ">
            {
                postsWithCurCategory?.map((post, index) => (
                    <PostItem key={index} post={post} categories={categories} />
                ))
            }

        </div>
    </div>
}