import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, passwordForgot } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const ResetPasswordPage = () => {
    const [email, setEmail] = useState('')

    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/recover')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            console.log(email)
            dispatch(passwordForgot({ email }))
            setEmail('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40'
        >
            <h1 className='text-lg text-white text-center'>Recover password</h1>
            <label className='text-xs text-gray-400'>
                Email:
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-3 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <Link
                    type='submit'
                    onClick={handleSubmit}
                    to='/'
                    className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
                >
                    Submit
                </Link>
                <Link
                    to='/'
                    className='flex justify-center items-center text-xs text-white'
                >
                    Return
                </Link>
            </div>
           
        </form>
    )
}
