import React from "react"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createUser } from "../redux/features/user/userSlice"

import "@material/react-chips/dist/chips.css"
import { toast } from "react-toastify"

export const CreateUserPage = () => {
    const { status } = useSelector(state => state.user)
    const { user } = useSelector(state => state.user)

    const [login, setLogin] = useState('')
    const [fullname, setFullname] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('user')
    const [emailColorBg, setEmailColorBg] = useState('gray-400')
    const [loginColorBg, setLoginColorBg] = useState('gray-400')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const submitHandler = () => {
        try {
            if (login === '' || email === '' || newPassword === '' || confirmPassword === '') {
                toast("Fill all required fields")
                return
            }

            if (!email.includes('@')) {
                setEmailColorBg('red-500')
                toast("Uncorrect email")
                return
            }

            let data = new FormData()
            data.append('login', login)
            data.append('fullname', fullname)
            data.append('role', role)
            data.append('email', email)
            if (newPassword !== '') {
                data.append('password', newPassword)
                if (confirmPassword === '') {
                    toast("Please, repeat new password for confirmation")
                    return
                }
                data.append('passwordConfirmation', confirmPassword)
            } else {
                toast("Please, create a password and confirm it")
                return
            }

            // for(var pair of data.entries()){
            //     console.log("", pair[0]+', '+pair[1])
            // }

            dispatch(createUser(data))
            if (status && !user) {
                toast(status)
                return
            }
            navigate(`/users`)

        } catch (error) {
            console.log(error)
        }
    }

    const cancelHandler = () => {
        navigate(`/users`)
    }

    return (
        <form
            className="w-1/3 mx-auto py-10"
            onSubmit={(e) => e.preventDefault()}
        >
            <label className="text-md text-white opacity-70">
                Username (login) <span className="text-2xl text-red-500"> *</span>
                <input type="text"
                    placeholder="Login"
                    value={login}
                    onChange={e => {
                        setLogin(e.target.value)
                        if (e.target.value === '') {
                            setLoginColorBg('red-500')
                        } else {
                            setLoginColorBg('gray-400')
                        }
                    }
                    }
                    className={`mt-1 text-black w-full rounded-lg bg-${loginColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
            </label>

            <label className="text-md text-white opacity-70">
                Email <span className="text-red-500 text-2xl"> *</span>
                <input type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value)
                        if (e.target.value === '') {
                            setEmailColorBg('red-500')
                        } else {
                            setEmailColorBg('gray-400')
                        }
                    }
                    }
                    className={`mt-1 text-black w-full rounded-lg bg-${emailColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
            </label>

            <label className="text-md text-white opacity-70">
                Fullname
                <input type="text"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
            </label>

            <div>Role of user <select value={role} onChange={e => setRole(e.target.value)}>
                <option value='user'>user</option>
                <option value='admin'>admin</option>
            </select></div>


            <label className="text-md text-white opacity-70">
                New password <span className="text-2xl text-red-700"> *</span>
                <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="new password"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>
            <label className="text-md text-white opacity-70">
                Confirm password <span className="text-2xl text-red-700"> *</span>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="repeat new password"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>

            <div className="flex gap-8 items-center justify-center mt-4">
                <button
                    onClick={submitHandler}
                    className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                    Create user
                </button>
                <button
                    onClick={cancelHandler}
                    className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                    Cancel
                </button>
            </div>
        </form>
    )
}