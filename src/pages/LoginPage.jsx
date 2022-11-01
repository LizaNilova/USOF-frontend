import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from "../redux/features/auth/authSlice"
import { toast } from 'react-toastify'

export const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const { status } = useSelector((state) => state.auth)

    const isAuth = useSelector(checkIsAuth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        console.log(status)
        if (isAuth) {
            navigate('/')
        }
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({
                login,
                password,
            }))

        } catch (error) {
            console.log(error)
        }
    }

    return <form
        onSubmit={e => e.preventDefault()}
        className="w-1/3 h-60 mx-auto mt-40"
    >
        <h1 className="text-lg text-white text-center">Authorization</h1>
        <label className="text-xs text-gray-400">
            Username or email
            <input
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
                placeholder="username or email"
                className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
            />
        </label>
        <label className="text-xs text-gray-400">
            Password
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
            />
        </label>

        <div className="flex gap-8 justify-center mt-4">
            <button type="submit"
                onClick={handleSubmit}
                className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4">
                Sign in
            </button>

            <Link
                to='/auth/resetPassword'
                className="flex justify-center items-center text-xs text-white"
            >Forgot password?</Link>

        </div>
        <Link
            to='/register'
            className="flex justify-center items-center text-xs mt-10 text-white"
        >Registration</Link>


    </form>
}