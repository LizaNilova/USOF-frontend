import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CategoryItem = ({category}) => {

    const [count_posts, setCountPosts] = useState(0)
    const {posts} = useSelector(state => state.post)

    const dispatch = useDispatch()


    return <div className="rounded-md w-1/5 min-w-[250px] h-[160px] border-2 border-black bg-slate-200 flex">
        <div className="flex flex-col justify-between p-2 space-y-4">
                <Link
                    to={`/categories/${category._id}`}
                    className="rounded-md bg-emerald-500 mt-1 w-fit text-xs p-1"
                >{category.title}
                </Link>

                <div className="text-xs ">{category.description}</div>
                <div className="flex justify-between basis-1/5">
                    <div className="text-xs basis-1/3">{count_posts} posts</div>
                    <div className="text-xs basis-1/2">how many today, this month</div>
                </div>
        </div>
    </div>
}