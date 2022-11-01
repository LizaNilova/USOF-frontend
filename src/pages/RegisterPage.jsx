import React, { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../redux/features/auth/authSlice"
import { toast } from 'react-toastify'

export const RegisterPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPassCofirm] = useState('')
    const [email, setEmail] = useState('')
    const {status} = useSelector((state) => state.auth)
    // const isAuth = useSelector(checkIsAuth)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(status) {
            if (status === 'Successfully registrated.'){
                navigate('/login')
            }
            toast('Please, check your email for confirmation.')
        }
    }, [status, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({
                login, 
                password,
                passwordConfirmation,
                email,
            }))
        } catch (error) {
            console.log(error)
        }
    }

    return <form
    onSubmit={e => e.preventDefault()}
    className="w-1/4 h-60 mx-auto mt-40"
>
    <h1 className="text-lg text-white text-center">Create account</h1>
    
    <label className="text-xs text-gray-400">
        Username
        <input type="text"
            placeholder="username"
            value={login}
            onChange={e => setLogin(e.target.value)}
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
    </label>
    <label className="text-xs text-gray-400">
        Email
        <input type="email"
            placeholder="email@gmail.com etc."
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
    </label>
    <label className="text-xs text-gray-400">
        Password
        <input type="password"
            value={password}
            onChange = {e => setPassword(e.target.value)}
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
    </label>
    <label className="text-xs text-gray-400">
        Confirm password
        <input type="password"
        value = {passwordConfirmation}
        onChange = {(e) => setPassCofirm(e.target.value)}
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
    </label>

    <div className="flex gap-8 justify-center mt-4">
        <button type="submit"
            onClick={handleSubmit}
            className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4">
            Create account
        </button>
        <Link
            to='/login'
            className="flex justify-center items-center text-xs text-white"
        >Already have an account?</Link>
    </div>
</form>
}