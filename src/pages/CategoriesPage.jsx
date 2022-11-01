import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CategoryItem } from "../components/CategoryItem"

import { getAllCategories } from "../redux/features/categories/categorySlice"

export const CategoriesPage = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    if (!categories.length) {
        return (<div >
            loading....
        </div>)
    }


    return <div className="max-w-[1200px] mx-auto p-10 justify-center">
        <div className="flex flex-wrap gap-8 justify-start">
                {
                    categories?.map((category, index) => (
                        <CategoryItem key={index} category={category} />
                    ))
                }
        </div>
    </div>
}