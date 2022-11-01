import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../utils/axios';

const initialState = {
    comments: [],
    loading: false
}

export const createComment = createAsyncThunk('comment/createComment',
    async ({ postId, comment }) => {
        try {
            // console.log(postId)
            const { data } = await axios.post(`/posts/${postId}/comment`,
                {
                    postId,
                    comment
                })
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const getAllPostComments = createAsyncThunk('comment/getAllPostComments',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/${postId}/comment`)
            return data
        } catch (error) {
            console.log(error)
        }

    })

export const removeComment = createAsyncThunk('comment/removeComment',
async(commentId) => {
    try {
        const {comment} = await axios.delete(`/comments/${commentId}`)
        return comment
    } catch (error) {
        console.log(error)
    }
})

export const updateComment = createAsyncThunk('comment/updateComment',
async({content, commentId}) => {
    try {
        console.log(await axios.patch(`/comments/${commentId}`, {content}))
        const {data} = await axios.get(`/comments/${commentId}`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        // Create comment
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },

        // Get all comments for post
        [getAllPostComments.pending]: (state) => {
            state.loading = true
        },
        [getAllPostComments.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
        },
        [getAllPostComments.rejected]: (state) => {
            state.loading = false
        },

        // Update comment data
        [updateComment.pending]: (state) => {
            state.loading = true
        },
        [updateComment.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.comments.findIndex((comment) => comment._id === action.payload?._id)
            state.comments[index] = action.payload
        },
        [updateComment.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default commentSlice.reducer