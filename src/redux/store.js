import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import categorySlice from './features/categories/categorySlice'
import commentSlice from './features/comment/commentSlice'
import postSlice from './features/post/postSlice'
import userSlice from './features/user/userSlice'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        post: postSlice,
        category: categorySlice,
        comment: commentSlice,
        user: userSlice,
    },
})