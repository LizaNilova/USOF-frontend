import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UserItem } from "../components/UserItem"
import { getMe } from "../redux/features/auth/authSlice"
import { getAllUsers } from "../redux/features/user/userSlice"
import { Link } from "react-router-dom"


export const UsersPage = () => {

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)
    const { me } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getMe())
    }, [dispatch])

    if (!users.length) {
        return (<div>
            loading....
        </div>)
    }


    return <div className="max-w-[900px] mx-auto py-10">
        <div className="flex flex-col justify-between gap-8">
            {
                me?.role === 'admin' &&
                <Link to={`/users/create`}>
                    <div className="flex border-gray-800 justify-center border-2 flex-row flex-grow space-x-10 bg-slate-400 rounded-xl px-6 py-4">
                        Create new user
                    </div>
                </Link >
            }
            <div className="flex flex-col gap-5 basis-4/5">
                {
                    users?.map((user, index) => (
                        <UserItem key={index} user={user} />
                    ))
                }
            </div>
        </div>
    </div>
}