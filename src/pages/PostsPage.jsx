import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CategoriesBlock } from "../components/CategoriesBlock"
import { PostItem } from "../components/PostItem"
import { getAllCategories } from "../redux/features/categories/categorySlice"
import { getAllPosts } from "../redux/features/post/postSlice"

import { NavLink } from 'react-router-dom'
import { ChipSet, Chip } from '@material/react-chips';
import "@material/react-chips/dist/chips.css"
import { getPostsWithFilters } from '../redux/features/post/postSlice';

export const PostsPage = () => {

    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    const { categories } = useSelector(state => state.category)
    const [selectedChips, setSelectedChips] = useState({
        selectedChipIds: [],
    })

    const submitHandler = () => {
        dispatch(getPostsWithFilters(selectedChips.selectedChipIds))
    }

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllCategories())
    }, [dispatch])


    if (!posts) {
        return (<div>
            <div className="text-white">FILTERS</div>
                <div>
                    <br />
                    <div className='text-white'>CATEGORIES</div>
                    <ChipSet
                        className="max-h-[200px] mb-5 overflow-y-scroll border-2 rounded-lg scroll-auto"
                        filter
                        selectedChipIds={selectedChips.selectedChipIds}
                        handleSelect={(selectedChipIds) => setSelectedChips({ selectedChipIds })}
                    >
                        {categories?.map((title, index) => {
                            return (
                                <Chip key={index}
                                    id={title._id}
                                    label={title.title}
                                />
                            )
                        })}

                    </ChipSet>

                    <button
                        onClick={submitHandler}
                        className="flex justify-center items-center mb-10 bg-gray-600 text-md text-white rounded-sm py-2 px-4">
                        Search with filters
                    </button>
                </div>
            There is no posts for now. But you can create the first one.
            
        </div>)
    }


    return <div className="max-w-[900px] mx-auto py-10">
        <div className="flex justify-between gap-8">
            <div>
                <div className="text-white">FILTERS</div>
                <div>
                    <br />
                    <div className='text-white'>CATEGORIES</div>
                    <ChipSet
                        className="max-h-[200px] mb-5 overflow-y-scroll border-2 rounded-lg scroll-auto"
                        filter
                        selectedChipIds={selectedChips.selectedChipIds}
                        handleSelect={(selectedChipIds) => setSelectedChips({ selectedChipIds })}
                    >
                        {categories?.map((title, index) => {
                            // console.log(title)
                            return (
                                <Chip key={index}
                                    id={title._id}
                                    label={title.title}
                                />
                            )
                        })}

                    </ChipSet>

                    <button
                        onClick={submitHandler}
                        className="flex justify-center items-center mb-10 bg-gray-600 text-md text-white rounded-sm py-2 px-4">
                        Search with filters
                    </button>
                </div>

                <div className="flex flex-col gap-5 basis-4/5">
                    {
                        posts?.map((post, index) => (
                            <PostItem
                                key={index}
                                post={post}
                                categories={categories}
                            />
                        ))
                    }

                </div>
            </div>

            <div className="basis-1/5">
                <div className="text-xs uppercase text-white">CATEGORIES</div>
                {
                    categories?.map((category, index) => (
                        <CategoriesBlock
                            key={index}
                            category={category} />
                    ))
                }
                <br />
                <div className="bg-gray-600 my-1">
                    <NavLink
                        to={'/categories'}
                        href="/"
                        className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                        See other categories...</NavLink>
                </div>
            </div>
        </div>
    </div>
}