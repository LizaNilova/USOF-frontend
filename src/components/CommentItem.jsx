import React from 'react'

import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { removeComment, updateComment } from '../redux/features/comment/commentSlice';
import { toast } from 'react-toastify'
import { useState } from 'react';



import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const CommentItem = ({ comment, res, me }) => {

    const [open, setOpen] = useState(false)
    const [content, setContent] = useState(comment.content)
    const dispatch = useDispatch()

    const removeCommentHandler = () => {
        try {
            dispatch(removeComment(comment._id))
            toast('Comment was deleted.')
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickCancelEdit = () => {
        setOpen(false);
    };

    const handleClickEdit = () => {
        dispatch(updateComment({
            content: content,
            commentId: comment._id
        }))
        setContent('')
        setOpen(false);
    };

    return <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-200 text-sm'>
            {
                <img
                    src={res.image}
                    alt='user images'
                    className="object-cover w-full"
                />
            }
        </div>
        <div className='flex flex-col text-gray-300 text-[10px]'>
            <div>
                {
                    res.userExists ? (
                        comment.author_name
                    ) : (
                        `${comment.author_name} (deleted user)`
                    )
                }
            </div>
            <div>
                {comment.content}
            </div>
        </div>
        <div className='flex flex-row'>
            {
                res.userID === me?._id &&
                <>
                    <button
                        onClick={handleClickOpen}
                        className="flex items-center justify-center gap-2 text-xs text-white opacity-50"><EditIcon /></button>
                    <Dialog open={open} onClose={handleClickCancelEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit comment</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label=""
                                type="text"
                                fullWidth
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickCancelEdit} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClickEdit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
            {
                (res.userID === me?._id || me?.role === 'admin') &&
                <button
                    onClick={removeCommentHandler}
                    className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <DeleteIcon />
                </button>
            }



        </div>

    </div>
}