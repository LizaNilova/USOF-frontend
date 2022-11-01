import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    users: [],
    user: null,
    updatedUser: null,
    loading: false,
    status: null
}

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    try {
        const { data } = await axios.get('/users')
        return ({ users: data })
    } catch (error) {
        console.log(error)
    }
})

export const getUserById = createAsyncThunk('user/getUserById', async (userId) => {
    try {
        const { data } = await axios.get(`/users/${userId}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateUserData = createAsyncThunk('user/updateUserData', async (req) => {
    try {
        const {data} = await axios.patch(`/users/${req.get('id')}`, req)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createUser = createAsyncThunk('user/createUser', async(req) => {
    try {
        const {data} = await axios.post('/users', req)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async(userID) => {
    try {
        const {data} = await axios.delete(`/users/${userID}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        // Get all users
        [getAllUsers.pending]: (state) => {
            state.loading = true
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload.users
        },
        [getAllUsers.rejected]: (state) => {
            state.loading = false
        },

        // Get user by id
        [getUserById.pending]: (state) => {
            state.loading = true
        },
        [getUserById.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        [getUserById.rejected]: (state) => {
            state.loading = false
        },

        // Update user data
        [updateUserData.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updateUserData.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.users.findIndex((user) => user._id === action.payload._id) 
            state.users[index] = action.payload.updatedUser
            state.updatedUser = action.payload.updatedUser
            state.status = action.payload.message
        },
        [updateUserData.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
            console.log(action.payload.message)
        },

        // Create user
        [createUser.pending] : (state) => {
            state.loading = true
        },
        [createUser.fulfilled] : (state, action) => {
            state.loading = false
            state.users.push(action.payload)
        },
        [createUser.rejected] : (state) => {
            state.loading = false
        },

        // Remove post
        [deleteUser.pending] : (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled] : (state, action) => {
            state.loading = false
            state.users = state.users.filter((user) => user._id !== action.payload.user._id) 
        },
        [deleteUser.rejected] : (state) => {
            state.loading = false
        },
    }
})

export default userSlice.reducer