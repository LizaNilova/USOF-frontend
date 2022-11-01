import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { checkIsAuth, getMe, logout } from "../redux/features/auth/authSlice.js"
import { toast } from 'react-toastify'
import { useEffect } from "react"

export const Navbar = () => {

    const isAuth = useSelector(checkIsAuth)
    const { me } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const activeStyles = {
        color: 'white',
    }

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast("You loged out")
    }

    return <div className='flex py-4 justify-between items-center'>
        <span className='flex-none justify-center items-center ml-10 bg-gray-600 py-2 px-4 text-white rounded-sm'>
            <button onClick={() => { navigate('/') }}>USOF-YNILOVA</button>
        </span>

        {isAuth ? (
            <>
                <ul className="flex gap-8">
                    {/* <li>
                        <NavLink
                            to={'/my_posts'}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) => isActive ? activeStyles : undefined}>My posts</NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to={'/users'}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) => isActive ? activeStyles : undefined}>Users</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/categories'}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) => isActive ? activeStyles : undefined}>Categories</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) => isActive ? activeStyles : undefined}>Create post</NavLink>
                    </li>

                </ul>

                <div className='flex py-4 justify-between items-center mr-10 space-x-4'>
                    {
                        me &&
                        <div className='flex justify-between gap-5 text-xs text-white rounded-sm px-4 py-2'>
                            <div className="m-2">| ROLE: {me.role} |</div>
                            <Link className="flex flex-row justify-between bg-gray-600 gap-3 items-canter" to={`users/${me._id}`}>
                                <img
                                    src={`http://localhost:3001/${me.profile_picture}`}
                                    alt='user avatar'
                                    className="flex w-[30px] m-2 h-[30px]"
                                /> <span className="flex text-md m-2">{me.login}</span>
                                </Link>
                        </div>
                    }
                    <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-4'>
                        <Link to={'/'} onClick={logoutHandler}>Sign out</Link>
                    </div>
                </div>
            </>
        ) : (
            <>
                <ul className="flex gap-8">
                    <li>
                        <NavLink
                            to={'/'}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) => isActive ? activeStyles : undefined}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/users'}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) => isActive ? activeStyles : undefined}>Users</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/categories'}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) => isActive ? activeStyles : undefined}>Categories</NavLink>
                    </li>
                </ul>
                <div className="flex py-4 justify-between items-center mr-10 space-x-4">
                    <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
                        <Link to={'/login'}>Sign in</Link>
                    </div>
                    <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
                        <Link to={'/register'}>Register</Link>
                    </div>
                </div>

            </>
        )

        }

    </div>
}