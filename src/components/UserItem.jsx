import React from "react";
import { Link } from 'react-router-dom'
// import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Moment from 'react-moment'


export const UserItem = ({ user }) => {
    return (
        <Link to={`/users/${user._id}`}>
            <div className="flex border-gray-800 border-2 flex-row basis-1/4 flex-grow space-x-10 bg-slate-200 rounded-xl px-6 py-4">
                <div className="flex flex-col justify-center basis-1/12">
                <img
                        src={`http://localhost:3001/${user.profile_picture}`}
                        alt='user avatar'
                        className="object-cover w-full"
                    />
                </div>
                <div className="flex flex-col basis-4/5">
                    <div className="flex justify-between items-center pt-2">

                    </div>
                    <div className="text-black text-xl">{user.login}</div>
                    <p className="text-black text-md pt-4">{user.full_name || ''}</p>

                    <br />

                    <div className="flex justify-items-end space-x-7 flex-row w-full">
                        <div className="text-xs text-black opacity-50 basis-1/12">{user.rating}</div>
                        <div className="text-xs text-black ">
                            <Moment date={user.createdAt} format='D MMM YYYY' /></div>
                    </div>
                </div>
            </div>
        </Link >)
}