import React, { useEffect } from "react"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updatePost } from "../redux/features/post/postSlice"
import { createNewCategory, getAllCategories } from "../redux/features/categories/categorySlice.js"
import { getMe } from '../redux/features/auth/authSlice'
import axios from '../utils/axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ChipSet, Chip } from '@material/react-chips';
import "@material/react-chips/dist/chips.css"

export const EditPostPage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')
    const { categories } = useSelector((state) => state.category)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('')
    const [statusPost, setStatusPost] = useState('')
    const { me } = useSelector(state => state.auth)

    const params = useParams()

    const [selectedChips, setSelectedChips] = useState({
        selectedChipIds: [],
    })

    const fillOldPostData = (post) => {
        setTitle(post.title)
        setContent(post.content)
        setOldImage(post.imagesUrl)
        setSelectedChips({ selectedChipIds: post.categories })
        setStatusPost(post.status)
    }

    const [post, setPost] = useState(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
        fillOldPostData(data)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            let data = new FormData()
            data.append('id', params.id)
            data.append('title', title)
            data.append('content', content)
            data.append('image', newImage)
            data.append('status', statusPost)

            for (let i = 0; i < selectedChips.selectedChipIds.length; i++) {
                data.append('categories', selectedChips.selectedChipIds[i])
            }

            // console.log(data)
            // for(var pair of data.entries()){
            //     console.log("hello", pair[0]+', '+pair[1])
            // }


            dispatch(updatePost(data))
            navigate('/my_posts')

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickCancel = () => {
        setNewCategoryName('')
        setDescription('')
        setOpen(false);
    };
    const handleClickCreate = () => {
        dispatch(createNewCategory({
            title: newCategoryName,
            description: description
        }))
        setNewCategoryName('')
        setDescription('')

        setOpen(false);
    };

    const cancelHandler = () => {
        navigate('/')
    }

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getMe())
    }, [dispatch])

    return (
        <form
            className="w-2/3 mx-auto py-10"
            onSubmit={(e) => e.preventDefault()}
        >

            {
                me?.role === 'admin' && <div>Status of post<select value={statusPost} onChange={e => setStatusPost(e.target.value)}>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
            </select></div>
            }
            

            {
                me?._id === post.author && (
                    <label
                        className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
                        Add image
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                setNewImage(e.target.files[0])
                                setOldImage('')
                            }} />
                    </label>
                )
            }

            <div className="flex object-cover py-2">
                {oldImage &&
                    <img src={`http://localhost:3001/${oldImage}`} alt={oldImage.name} />
                }
                {newImage &&
                    <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
                }
            </div>

            {
                me?.role === 'admin' ? (
                    <>
                        <label className="text-xs text-white opacity-70">
                            Title of post
                            <input type="text"
                                placeholder="Title"
                                value={title}
                                // onChange={e => setTitle(e.target.value)}
                                className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700" />
                        </label>

                        <label className="text-xs text-white opacity-70">
                            Content of post
                            <textarea
                                placeholder="Content of post"
                                value={content}
                                // onChange={e => setContent(e.target.value)}
                                className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700" />
                        </label>
                    </>
                ) : (
                    <>
                        <label className="text-xs text-white opacity-70">
                            Title of post
                            <input type="text"
                                placeholder="Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700" />
                        </label>

                        <label className="text-xs text-white opacity-70">
                            Content of post
                            <textarea
                                placeholder="Content of post"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700" />
                        </label>
                    </>
                )
            }


            <ChipSet
                className="max-h-[200px] mb-5 overflow-y-scroll border-2 rounded-lg scroll-auto"
                filter
                selectedChipIds={selectedChips.selectedChipIds}
                handleSelect={(selectedChipIds) => setSelectedChips({ selectedChipIds })}
            >
                {categories?.map((title, index) => {
                    return (
                        <Chip key={index}
                            id={title._id}
                            label={title.title}
                        />
                    )
                })}
            </ChipSet>

            {
                me?.role === 'admin' && <div>
                    <button
                        onClick={handleClickOpen}
                        className="bg-slate-400 rounded-3xl ml-2 mt-5 mb-10 py-2 px-4">Create a new category</button>
                    <Dialog open={open} onClose={handleClickCancel} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create a new category</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please, enter name of a new category and some description
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name on a new Category"
                                type="text"
                                fullWidth
                                value={newCategoryName}
                                onChange={e => setNewCategoryName(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Description"
                                type="text"
                                fullWidth
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickCancel} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClickCreate} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }


            <div className="flex gap-8 items-center justify-center mt-4">
                <button
                    onClick={submitHandler}
                    className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                    Save changes
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