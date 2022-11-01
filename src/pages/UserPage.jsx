import React from "react";
import Moment from "react-moment"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from "../components/PostItem"
import { getAllCategories } from "../redux/features/categories/categorySlice"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { deleteUser, getUserById } from "../redux/features/user/userSlice";
import { getPostsByUserId } from "../redux/features/post/postSlice";


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const UserPage = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { myPosts } = useSelector(state => state.post)
    const { categories } = useSelector(state => state.category)
    const { user } = useSelector(state => state.user)
    const { me } = useSelector(state => state.auth)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickCancelDelete = () => {
        setOpen(false);
    };

    const handleClickDeleteUser = () => {
        dispatch(deleteUser(user._id))
        setOpen(false);
        navigate('/users')
    };

    useEffect(() => {
        dispatch(getUserById(params.id_user))
        dispatch(getPostsByUserId(params.id_user))
        dispatch(getAllCategories())
    }, [dispatch, params.id_user])

    if (!user) {
        return <div>Loading</div>
    }

    return <div className="flex flex-col max-w-[900px] mx-auto">
        <div className="flex flex-row">
            <div className='flex rounded-sm max-h-[100px] max-w-[100px]'>
                {
                    <img
                        src={`http://localhost:3001/${user.profile_picture}`}
                        alt='post images'
                        className="object-cover w-full"
                    />
                }

            </div>
            <div className="flex flex-col">
                <div className="text-2xl text-white">{user.login}</div>
                <div className="text-md text-white">{user.full_name}</div>
                <div className="text-xs text-white">
                    <Moment date={user.createdAt} format='D MMM YYYY' /></div>
            </div>
            <div className="flex basis-1/5 justify-between">
                {
                    ((me?.role === 'admin' && user._id !== me._id) || (user._id === me?._id)) &&
                    <>
                        <Link to={`/users/${params.id_user}/edit`} className='text-md rounded-sm'>Edit info</Link>
                        <div>
                            <button className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4" onClick={handleClickOpen}>
                                Delete user
                            </button>
                            <Dialog
                                open={open}
                                onClose={handleClickCancelDelete}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Deleting user"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Do you really want to delete this user? You can`t turn his/her data back after 
                                        confirmation deleting.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClickCancelDelete} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleClickDeleteUser} color="primary" autoFocus>
                                        Delete user
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </>

                }

            </div>
        </div>
        <div className="flex flex-col">
            <div className="text-xl text-white">{user.login} posts</div>
            <div className="flex flex-col gap-5">
                {
                    myPosts?.map((post, index) => (
                        <PostItem key={index} post={post} categories={categories} />
                    ))
                }

            </div>
        </div>
    </div>
}