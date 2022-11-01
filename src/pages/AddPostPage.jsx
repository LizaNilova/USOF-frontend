import React, { useEffect } from "react"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createPost } from "../redux/features/post/postSlice"
import { createNewCategory, getAllCategories } from "../redux/features/categories/categorySlice.js"
import { Link } from "react-router-dom"

import { ChipSet, Chip } from '@material/react-chips';
import "@material/react-chips/dist/chips.css"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getMe } from "../redux/features/auth/authSlice"

export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const { categories } = useSelector((state) => state.category)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('')
    const { me } = useSelector(state => state.auth)

    const [selectedChips, setSelectedChips] = useState({
        selectedChipIds: [],
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('content', content)
            data.append('image', image)

            for (let i = 0; i < selectedChips.selectedChipIds.length; i++) {
                data.append('categories', selectedChips.selectedChipIds[i])
            }

            dispatch(createPost(data))
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
            <label
                className="text-gray-300 py-2 bg-gray-600 text-md mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
                Add image
                <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
            </label>
            <div className="flex object-cover py-2">
                {image &&
                    <img src={URL.createObjectURL(image)} alt='image_of_post' />
                }
            </div>

            <label className="text-md text-white opacity-70">
                Title of post
                <input type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="mt-1 mb-5 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700" />
            </label>

            <label className="text-md text-white opacity-70">
                Content of post
                <textarea
                    placeholder="Content of post"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-60 placeholder:text-gray-700" />
            </label>

            <div className="text-white mt-10 mb-5">Check categories or create a new one</div>
            <ChipSet
                className="max-h-[200px] mb-5 overflow-y-scroll border-2 rounded-lg scroll-auto"
                filter
                selectedChipIds={selectedChips.selectedChipIds}
                handleSelect={(selectedChipIds) => setSelectedChips({ selectedChipIds })}
            >
                {categories?.map((title, index) => {
                    console.log(title)
                    return (
                        <Chip key={index}
                            id={title._id}
                            label={title.title}
                        />
                    )
                })}

            </ChipSet>


            {me?.role === 'admin' && <div>
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
                    className="flex justify-center items-center bg-gray-600 text-md text-white rounded-sm py-2 px-4">
                    Create post
                </button>
                <button
                    onClick={cancelHandler}
                    className="flex justify-center items-center bg-red-500 text-md text-white rounded-sm py-2 px-4">
                    Cancel
                </button>
            </div>
        </form>
    )
}